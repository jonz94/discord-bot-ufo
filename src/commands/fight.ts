import { ChannelType, MessageFlags, SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js'
import { and, eq, isNull, or } from 'drizzle-orm'
import { db } from '~/db/db'
import { attempts, games, guilds } from '~/db/schema'
import { client } from '~/src/client'
import { emojis } from '~/src/emoji-list'
import { calculateScore, rollDice } from '~/src/utils/roll-dice'

export const commandName = '輸贏'

export const data = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('找人輸贏')
  .addUserOption((option) => option.setName('對手').setDescription('找誰輸贏').setRequired(true))

export async function execute(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId
  const channel = interaction.channel

  if (!guildId || !channel) {
    await interaction.reply({
      content: '發生異常，無法取得 Discord 伺服器的相關資訊',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  const guild = await db.query.guilds.findFirst({
    where: eq(guilds.id, guildId),
  })

  if (!guild) {
    await interaction.reply({
      content: `此 Discord 伺服器不在 ${client.user} 的白名單內，因此無法使用指令`,
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  if (channel.type === ChannelType.GuildVoice) {
    await interaction.reply({
      content: '無法在語音頻道與人輸贏，請轉移陣地到一般的文字頻道，拍謝QQ',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  if (!channel.isSendable()) {
    await interaction.reply({
      content: '此頻道無法傳送文字訊息，請轉移陣地到一般的文字頻道，拍謝QQ',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  const opponent = interaction.options.getUser('對手')

  if (!opponent) {
    await interaction.reply({
      content: '請選擇要輸贏的對手',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  if (opponent.bot) {
    await interaction.reply({
      content: '抱歉，無法跟機器人輸贏',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  const author = interaction.user

  if (author.id === opponent.id) {
    await interaction.reply({
      content: '你是要跟自己輸贏嗎？笑死',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  const game = await db.query.games.findFirst({
    where: and(
      eq(games.guildId, guild.id),
      or(
        and(eq(games.authorId, author.id), eq(games.opponentId, opponent.id)),
        and(eq(games.authorId, opponent.id), eq(games.opponentId, author.id)),
      ),
      or(isNull(games.authorScore), isNull(games.opponentScore)),
    ),
  })

  if (game) {
    const author = await interaction.client.users.fetch(game.authorId)
    const opponent = await interaction.client.users.fetch(game.opponentId)
    const link = `https://discord.com/channels/${game.guildId}/${game.channelId}/${game.id}`

    // 30 seconds
    const timeout = 30 * 1000

    await interaction.reply({
      content: [
        `【${author.displayName} vs ${opponent.displayName}】戰場座標 ${link} ${emojis.貓咪拿槍}`,
        ` 上次的輸贏還沒結束欸，${timeout / 1000} 秒後將會自動判定 ${opponent} 投降認輸 ${emojis.白眼海豚笑}`,
      ].join('\n'),
    })

    setTimeout(async () => {
      const gameMaybeUnfinished = await db.query.games.findFirst({
        where: and(
          eq(games.guildId, guild.id),
          or(
            and(eq(games.authorId, author.id), eq(games.opponentId, opponent.id)),
            and(eq(games.authorId, opponent.id), eq(games.opponentId, author.id)),
          ),
          or(isNull(games.authorScore), isNull(games.opponentScore)),
        ),
      })

      if (!gameMaybeUnfinished) {
        // 已經分出勝負，不做任何事
        console.log({ gameId: game.id }, '已經分出勝負，不做任何事')

        return
      }

      if (gameMaybeUnfinished.authorScore === null && gameMaybeUnfinished.opponentScore === null) {
        // TODO: 因為現在發起輸贏後，系統會自動幫 author 擲骰，因此應該是不會遇到這個情況，理論上應該是可以刪除掉這一段邏輯
        // 雙方都沒有骰
        await db
          .update(games)
          .set({
            authorScore: -1,
            opponentScore: -1,
          })
          .where(eq(games.id, gameMaybeUnfinished.id))

        await channel.send({
          content: [
            `【${author.displayName} vs ${opponent.displayName}】 ${author} 沒有擲骰，自動判定為投降認輸 ${emojis.白眼海豚笑}`,
            `【${author.displayName} vs ${opponent.displayName}】 ${opponent} 也沒有擲骰，自動判定為投降認輸 ${emojis.白眼海豚笑}`,
            `【雙方平手】`,
          ].join('\n'),
        })

        console.log({ gameId: game.id }, '雙方都沒有骰')

        return
      }

      if (gameMaybeUnfinished.authorScore === null && gameMaybeUnfinished.opponentScore !== null) {
        // TODO: 因為現在發起輸贏後，系統會自動幫 author 擲骰，因此應該是不會遇到這個情況，理論上應該是可以刪除掉這一段邏輯
        // author 沒有骰
        await db
          .update(games)
          .set({
            authorScore: -1,
          })
          .where(eq(games.id, gameMaybeUnfinished.id))

        await channel.send({
          content: [
            `【${author.displayName} vs ${opponent.displayName}】 ${author} 沒有擲骰，自動判定為投降認輸 ${emojis.白眼海豚笑}`,
            `【${opponent} 獲勝】`,
          ].join('\n'),
        })

        console.log({ gameId: game.id }, 'author 沒有骰')

        return
      }

      if (gameMaybeUnfinished.authorScore !== null && gameMaybeUnfinished.opponentScore === null) {
        // opponent 沒有骰
        await db
          .update(games)
          .set({
            opponentScore: -1,
          })
          .where(eq(games.id, gameMaybeUnfinished.id))

        await channel.send({
          content: [
            `【${author.displayName} vs ${opponent.displayName}】 ${opponent} 沒有擲骰，自動判定為投降認輸 ${emojis.白眼海豚笑}`,
            `【${author} 獲勝】`,
          ].join('\n'),
        })

        console.log({ gameId: game.id }, 'opponent 沒有骰')

        return
      }
    }, timeout)

    return
  }

  // 發送戰帖訊息
  const message = await (async function sendMessage() {
    try {
      return await channel.send({
        content: [
          author,
          '向',
          opponent,
          '下了戰帖',
          emojis.白眼海豚笑,
          '【點擊訊息的',
          emojis.貓咪拿槍,
          '表情符號，即可開始對戰】',
        ].join(' '),
      })
    } catch (error) {
      console.log(error)

      return null
    }
  })()

  if (!message) {
    await interaction.reply({
      content: '發送戰帖失敗QQ',
      flags: MessageFlags.Ephemeral,
    })

    return
  }

  try {
    await db.insert(games).values({
      id: message.id,
      guildId: guild.id,
      channelId: message.channelId,
      authorId: author.id,
      opponentId: opponent.id,
    })
  } catch (error) {
    console.log({ messageId: message.id }, '資料庫新增 game 時發生錯誤')
    console.log(error)
  }

  await interaction.reply({
    content: ['已經向', opponent, '發出戰帖'].join(' '),
    flags: MessageFlags.Ephemeral,
  })

  // 對戰帖訊息按反應
  await message.react(emojis.貓咪拿槍)

  // 沒點數則重骰，最多骰三次
  let score = 0
  let round = 0
  do {
    const attempt = [rollDice(), rollDice(), rollDice(), rollDice()] as const

    await channel.send(`【${author.displayName} vs ${opponent.displayName}】 ${author} 骰出了 ${attempt.join(', ')}`)
    score = calculateScore(attempt)

    await db.insert(attempts).values({
      userId: author.id,
      gameId: message.id,
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
    await channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${author} 得分是 ${score}，憋十 ${emojis.白眼海豚笑}`,
    )
  } else if (score === 3) {
    await channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${author} 得分是 ${score}，逼機 ${emojis.白眼海豚笑}`,
    )
  } else if (score >= 100) {
    await channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${author} 得分是 ${score}，豹子 ${emojis.貓咪挖屋}`,
    )
  } else {
    await channel.send(`【${author.displayName} vs ${opponent.displayName}】 ${author} 得分是 ${score}`)
  }

  const updatedGames = await (async function updateGame() {
    try {
      return await db.update(games).set({ authorScore: score }).where(eq(games.id, message.id)).returning()
    } catch (error) {
      console.log({ gameId: message.id }, '資料庫更新 game 資料時發生錯誤')
      console.log(error)
      return null
    }
  })()

  // 其中一人尚未擲骰
  if (
    updatedGames === null ||
    updatedGames.filter((game) => game.authorScore === null || game.opponentScore === null).length >= 1
  ) {
    console.log('updatedGames is null')
    console.log({ gameId: message.id }, '其中一人尚未擲骰')
    return
  }

  const finalGame = updatedGames.at(0)

  if (!finalGame || finalGame.authorScore === null || finalGame.opponentScore === null) {
    console.log('finalGame or score is null')
    console.log({ gameId: message.id }, '其中一人尚未擲骰')
    return
  }

  const { authorScore, opponentScore } = finalGame

  const finalMessage = (function getFinalMessage() {
    let message = ''

    if (authorScore === opponentScore) {
      message = '【雙方平手】'
    } else if (authorScore > opponentScore) {
      message = `【${author} 獲勝】`
    } else {
      message = `【${opponent} 獲勝】`
    }

    message = `${message}${author} 骰出了 ${authorScore}，${opponent} 骰出了 ${opponentScore}`

    return message
  })()

  await channel.send(finalMessage)
}
