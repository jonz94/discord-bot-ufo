import { ChannelType, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { db } from '../../db/db.mjs'
import { brawlParticipants, brawls } from '../../db/schema.mjs'
import { emojis } from '../emoji-list.mjs'

export const commandName = '大亂鬥'

export const data = new SlashCommandBuilder().setName(commandName).setDescription('眾人輸贏')

export async function execute(interaction: CommandInteraction) {
  const guildId = interaction.guildId
  if (!guildId) {
    await interaction.reply({
      content: '發生異常，無法取得 Discord 伺服器的相關資訊',
      ephemeral: true,
    })

    return
  }

  if (interaction.channel?.type === ChannelType.GuildVoice) {
    await interaction.reply({
      content: '無法在語音頻道與人輸贏，請轉移陣地到一般的文字頻道，拍謝QQ',
      ephemeral: true,
    })

    return
  }

  const unstartedBrawl = await db.query.brawls.findFirst({
    where: isNull(brawls.startedAt),
  })

  if (unstartedBrawl) {
    const link = `https://discord.com/channels/${unstartedBrawl.guildId}/${unstartedBrawl.channelId}/${unstartedBrawl.id}`

    await interaction.reply({
      content: [
        `【大亂鬥】報名座標 ${link} ${emojis.貓咪拿槍}`,
        `大亂鬥還沒開始欸，趕緊加入 ${emojis.白眼海豚笑}`,
      ].join('\n'),
      ephemeral: true,
    })

    return
  }

  const unfinishedBrawl = await db.query.brawls.findFirst({
    where: isNull(brawls.endedAt),
  })

  if (unfinishedBrawl) {
    const link = `https://discord.com/channels/${unfinishedBrawl.guildId}/${unfinishedBrawl.channelId}/${unfinishedBrawl.messageId}`

    await interaction.reply({
      content: [`【大亂鬥】戰場座標 ${link} ${emojis.貓咪拿槍}`, `上次的大亂鬥還沒結束欸 ${emojis.白眼海豚笑}`].join(
        '\n',
      ),
    })

    return
  }

  const author = interaction.user

  // 30 seconds
  const timeout = 30 * 1000
  const brawlTimeout = 30 * 1000

  // 發送戰帖訊息
  const joinBrawlMessage = await (async function sendMessage() {
    try {
      return await interaction.channel?.send({
        content: [
          author,
          '向所有人下了戰帖',
          emojis.白眼海豚笑,
          '\n【點擊訊息的',
          emojis.貓咪拿一堆槍,
          '表情符號即可參與】',
          `\n【${timeout / 1000} 秒後將開始對戰，記得點 ${emojis.貓咪拿槍} 擲骰，不然會被系統判定為自動認輸投降 ${emojis.白眼海豚笑}】`,
        ].join(' '),
      })
    } catch (error) {
      console.log(error)

      return null
    }
  })()

  if (!joinBrawlMessage) {
    await interaction.reply({
      content: '發送戰帖失敗QQ',
      ephemeral: true,
    })

    return
  }

  await db
    .insert(brawls)
    .values({
      id: joinBrawlMessage.id,
      guildId,
      channelId: interaction.channelId,
    })
    .returning()

  await interaction.reply({
    content: '已經向眾人們發出戰帖',
    ephemeral: true,
  })

  // 對戰帖訊息按反應
  await joinBrawlMessage.react(emojis.貓咪拿一堆槍)

  try {
    await db.insert(brawlParticipants).values({ brawlId: joinBrawlMessage.id, userId: author.id }).returning()
  } catch (error) {
    console.log({ brawlId: joinBrawlMessage.id, userId: author.id, name: author.displayName })
    console.log('error in await db.insert(brawlParticipants)')
    console.log(error)
  }

  setTimeout(async () => {
    const participants = await db.query.brawlParticipants.findMany({
      where: eq(brawlParticipants.brawlId, joinBrawlMessage.id),
    })

    const users = await Promise.all(
      participants.map((user) => user.userId).map((userId) => interaction.client.users.fetch(userId)),
    )

    // 發送戰帖訊息
    const startBrawlMessage = await (async function sendMessage() {
      try {
        return await interaction.channel?.send({
          content: [
            ['【大亂鬥】', ...users].join(' '),
            `【大亂鬥】對戰開始，${brawlTimeout / 1000} 秒後沒有擲骰將會自動判定為投降認輸 ${emojis.白眼海豚笑}`,
            `【點擊訊息的 ${emojis.貓咪拿槍} 表情符號，即可開始對戰】`,
          ].join('\n'),
        })
      } catch (error) {
        console.log(error)

        return null
      }
    })()

    if (!startBrawlMessage) {
      await interaction.channel?.send({ content: '發送戰帖失敗QQ' })

      return
    }

    await db
      .update(brawls)
      .set({
        messageId: startBrawlMessage.id,
        startedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(brawls.id, joinBrawlMessage.id))

    await startBrawlMessage.react(emojis.貓咪拿槍)

    setTimeout(async () => {
      // 時間到沒擲骰，將分數設為 -1
      const noScoreUsersData = await db
        .update(brawlParticipants)
        .set({ score: -1 })
        .where(and(eq(brawlParticipants.brawlId, joinBrawlMessage.id), isNull(brawlParticipants.score)))
        .returning()

      if (noScoreUsersData.length > 0) {
        const noScoreUsers = await Promise.all(
          noScoreUsersData.map((user) => user.userId).map((userId) => interaction.client.users.fetch(userId)),
        )

        await interaction.channel?.send({
          content: noScoreUsers.map((user) => `【大亂鬥】懦夫 ${user} 選擇了認輸 ${emojis.白眼海豚笑}`).join('\n'),
        })
      }

      await db
        .update(brawls)
        .set({ endedAt: sql`CURRENT_TIMESTAMP` })
        .where(eq(brawls.id, joinBrawlMessage.id))

      const usersData = await db.query.brawlParticipants.findMany({
        where: eq(brawlParticipants.brawlId, joinBrawlMessage.id),
      })

      const maxScore = Math.max(...usersData.map((userData) => userData.score!))

      const winnersData = usersData.filter((userData) => userData.score === maxScore)

      const winners = await Promise.all(
        winnersData.map((winnerData) => winnerData.userId).map((userId) => interaction.client.users.fetch(userId)),
      )

      if (maxScore < 0) {
        await interaction.channel?.send({ content: '【大亂鬥】無人勝出' })

        return
      }

      await interaction.channel?.send({
        content: [`【大亂鬥】${emojis.皇冠} 勝者為`, ...winners, `得分為 ${maxScore}`].join(' '),
      })
    }, brawlTimeout)
  }, timeout)
}
