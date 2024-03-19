import { MessageReaction, PartialMessageReaction, PartialUser, User } from 'discord.js'
import { and, eq, isNotNull } from 'drizzle-orm'
import { db } from '../../db/db.mjs'
import { brawlAttempts, brawlParticipants, brawls } from '../../db/schema.mjs'
import { emojis } from '../emoji-list.mjs'
import { calculateScore, rollDice } from '../utils.mjs'

export async function handleJoinBrawlReaction(
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  targetMessageId: string,
) {
  const brawl = await db.query.brawls.findFirst({ where: eq(brawls.id, targetMessageId) })

  if (!brawl) {
    return
  }

  if (!emojis.貓咪拿一堆槍.includes(reaction.emoji.identifier)) {
    return
  }

  if (user.bot) {
    return
  }

  const alreadyStarted = await db.query.brawls.findFirst({
    where: and(eq(brawls.id, targetMessageId), isNotNull(brawls.startedAt)),
  })

  if (alreadyStarted) {
    return
  }

  const alreadyParicipant = await db.query.brawlParticipants.findFirst({
    where: and(eq(brawlParticipants.brawlId, targetMessageId), eq(brawlParticipants.userId, user.id)),
  })

  if (alreadyParicipant) {
    return
  }

  try {
    const brawlParticipant = await db
      .insert(brawlParticipants)
      .values({
        brawlId: targetMessageId,
        userId: user.id,
      })
      .returning()

    console.log({ brawlParticipant })
  } catch (error) {
    console.log({
      brawlId: targetMessageId,
      userId: user.id,
      name: user.displayName,
    })
    console.log('error in reaction')
  }
}

export async function handleBrawlRollDiceReaction(
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  targetMessageId: string,
) {
  const brawl = await db.query.brawls.findFirst({ where: eq(brawls.messageId, targetMessageId) })

  if (!brawl) {
    return
  }

  if (!emojis.貓咪拿槍.includes(reaction.emoji.identifier)) {
    return
  }

  const participant = await db.query.brawlParticipants.findFirst({
    where: and(eq(brawlParticipants.brawlId, brawl.id), eq(brawlParticipants.userId, user.id)),
  })

  if (!(participant?.userId === user.id)) {
    // 非參與者，不做任何事

    return
  }

  console.log(participant)

  if (participant.score !== null) {
    // 已經骰出分數了，不做任何事
    return
  }

  // 沒點數則重骰，最多骰三次
  let score = 0
  let round = 0
  do {
    const attempt = [rollDice(), rollDice(), rollDice(), rollDice()] as const

    await reaction.message.channel.send(`【大亂鬥】 ${user} 骰出了 ${attempt.join(', ')}`)
    score = calculateScore(attempt)

    await db.insert(brawlAttempts).values({
      brawlId: brawl.id,
      userId: user.id,
      dice1: attempt[0],
      dice2: attempt[1],
      dice3: attempt[2],
      dice4: attempt[3],
      round,
      score,
    })

    round = round + 1
  } while (score <= 0 && round <= 2)

  if (score === 0) {
    await reaction.message.channel.send(`【大亂鬥】 ${user} 得分是 ${score}，憋十 ${emojis.白眼海豚笑}`)
  } else if (score === 3) {
    await reaction.message.channel.send(`【大亂鬥】 ${user} 得分是 ${score}，逼機 ${emojis.白眼海豚笑}`)
  } else if (score >= 100) {
    await reaction.message.channel.send(`【大亂鬥】 ${user} 得分是 ${score}，豹子 ${emojis.貓咪挖屋}`)
  } else {
    await reaction.message.channel.send(`【大亂鬥】 ${user} 得分是 ${score}`)
  }

  try {
    await db
      .update(brawlParticipants)
      .set({ score })
      .where(and(eq(brawlParticipants.brawlId, brawl.id), eq(brawlParticipants.userId, user.id)))
  } catch (error) {
    console.log({ brawlParticipantsId: brawlParticipants.id }, '資料庫更新 brawl_participants 資料時發生錯誤')
    console.log(error)
    return
  }
}
