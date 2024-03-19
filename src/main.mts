import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'
import { eq } from 'drizzle-orm'
import { db } from '../db/db.mjs'
import { attempts, games, guilds } from '../db/schema.mjs'
import { commands } from './commands/index.mjs'
import { config } from './config.mjs'
import { deployCommands } from './deploy-commands.mjs'
import { emojis } from './emoji-list.mjs'
import { calculateScore, isDev, rollDice } from './utils.mjs'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // for reading message and its content, these two need to be setup
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,

    // for reactions
    GatewayIntentBits.GuildMessageReactions,
  ],

  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
})

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)

  // 開發環境下，允許 allowDev 為 true 的伺服器進行測試
  const targetGuilds = await db.query.guilds.findMany({
    where: isDev ? eq(guilds.allowDev, true) : undefined,
  })

  targetGuilds.forEach(async (guild) => await deployCommands(guild))
})

client.on(Events.MessageCreate, async (message) => {
  if (message.content === '場子不乾淨') {
    await message.channel.send({ content: `怪我囉 ${emojis.白眼海豚笑}` })
  }
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName } = interaction

  if (commands[commandName]) {
    try {
      await commands[commandName].execute(interaction)
    } catch (error) {
      console.log(`error occurs when execute ${commandName} command`)
      console.log(error)
    }
  }
})

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (error) {
      console.error('點擊表情符號後、觸發 reaction.fetch() 時發生錯誤')
      console.error(error)

      return
    }
  }

  const targetMessageId = reaction.message.id

  const game = await db.query.games.findFirst({ where: eq(games.id, targetMessageId) })

  if (!game) {
    return
  }

  if (!emojis.貓咪拿槍.includes(reaction.emoji.identifier)) {
    return
  }

  if (![game.authorId, game.opponentId].includes(user.id)) {
    return
  }

  const key = (function getGameKey() {
    if (game.authorId === user.id) {
      return 'authorScore' as const
    }
    return 'opponentScore' as const
  })()

  // 已經骰出分數了，不做任何事
  if (game[key] !== null) {
    console.log({ gameId: game.id }, '已經骰出分數了，不做任何事')
    return
  }

  const author = await client.users.fetch(game.authorId)
  const opponent = await client.users.fetch(game.opponentId)

  // 沒點數則重骰，最多骰三次
  let score = 0
  let round = 0
  do {
    const attempt = [rollDice(), rollDice(), rollDice(), rollDice()] as const

    await reaction.message.channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${user} 骰出了 ${attempt.join(', ')}`,
    )
    score = calculateScore(attempt)

    await db.insert(attempts).values({
      userId: user.id,
      gameId: game.id,
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
    await reaction.message.channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${user} 得分是 ${score}，憋十 ${emojis.白眼海豚笑}`,
    )
  } else if (score === 3) {
    await reaction.message.channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${user} 得分是 ${score}，逼機 ${emojis.白眼海豚笑}`,
    )
  } else if (score >= 100) {
    await reaction.message.channel.send(
      `【${author.displayName} vs ${opponent.displayName}】 ${user} 得分是 ${score}，豹子 ${emojis.貓咪挖屋}`,
    )
  } else {
    await reaction.message.channel.send(`【${author.displayName} vs ${opponent.displayName}】 ${user} 得分是 ${score}`)
  }

  const updatedGames = await (async function updateGame() {
    try {
      return await db
        .update(games)
        .set({ [key]: score })
        .where(eq(games.id, targetMessageId))
        .returning()
    } catch (error) {
      console.log({ gameId: game.id }, '資料庫更新 game 資料時發生錯誤')
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
    console.log({ gameId: game.id }, '其中一人尚未擲骰')
    return
  }

  const finalGame = updatedGames.at(0)

  if (!finalGame || finalGame.authorScore === null || finalGame.opponentScore === null) {
    console.log('finalGame or score is null')
    console.log({ gameId: game.id }, '其中一人尚未擲骰')
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

    message = message + `${author} 骰出了 ${authorScore}，${opponent} 骰出了 ${opponentScore}`

    return message
  })()

  await reaction.message.channel.send(finalMessage)
})

client.login(config.DISCORD_TOKEN)
