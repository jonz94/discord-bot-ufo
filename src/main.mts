import { Client, Events, GatewayIntentBits } from 'discord.js'
import { commands } from './commands/index.mjs'
import { config } from './config.mjs'
import { deployCommands } from './deploy-commands.mjs'
import { emojis } from './emoji-list.mjs'
import { servers } from './server-list.mjs'
import { Attempt, Fight } from './types.mjs'
import { calculateScore, getSortedKey, isDev, rollDice } from './utils.mjs'

declare global {
  var fights: Map<string, Fight>
  var fightersKey: Set<any>
}

globalThis.fights = new Map()
globalThis.fightersKey = new Set()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // for reading message and its content, these two need to be setup
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,

    // for reactions
    GatewayIntentBits.GuildMessageReactions,
  ],
})

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)

  // 開發環境下，只在「幽浮小屋」伺服器進行測試
  if (isDev) {
    await deployCommands({ guildId: servers.幽浮小屋 })

    return
  }

  Object.values(servers).forEach(async (guildId) => {
    await deployCommands({ guildId })
  })
})

client.on(Events.MessageCreate, (message) => {
  if (message.content === 'ping' || message.content === 'Ping') {
    message.channel.send({ content: 'Pong' })
  }
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName } = interaction

  if (commands[commandName as keyof typeof commands]) {
    try {
      await commands[commandName as keyof typeof commands].execute(interaction)
    } catch (error) {
      console.log(`error occurs when execute ${commandName} command`)
      console.log(error)
    }
  }
})

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  const targetMessageId = reaction.message.id

  if (!globalThis.fights.has(targetMessageId)) {
    return
  }

  if (!emojis.貓咪拿槍.includes(reaction.emoji.identifier)) {
    return
  }

  const fight = globalThis.fights.get(targetMessageId)!
  if (!fight.fighters.has(user.id)) {
    return
  }

  const key = (function getFighterKey() {
    if (fight.author.user.id === user.id) {
      return 'author' as const
    }
    return 'opponent' as const
  })()

  if (fight[key].finalScore) {
    // 已經骰出分數了，不做任何事
    return
  }

  // 沒點數則重骰，最多骰三次
  let score = 0
  do {
    const attempt = [rollDice(), rollDice(), rollDice(), rollDice()] satisfies Attempt

    await reaction.message.channel.send(`${user} 骰出了 ${attempt.join(', ')}`)
    score = calculateScore(attempt)

    fight[key].attempts.push(attempt)
  } while (score <= 0 && fight[key].attempts.length <= 2)

  if (score === 0) {
    await reaction.message.channel.send(`${user} 得分是 ${score}，憋十 ${emojis.白眼海豚笑}`)
  } else if (score === 3) {
    await reaction.message.channel.send(`${user} 得分是 ${score}，逼機 ${emojis.白眼海豚笑}`)
  } else if (score >= 100) {
    await reaction.message.channel.send(`${user} 得分是 ${score}，豹子 ${emojis.貓咪挖屋}`)
  } else {
    await reaction.message.channel.send(`${user} 得分是 ${score}`)
  }

  fight[key].finalScore = score

  // 其中一人尚未擲骰
  if (fight.author.finalScore === undefined || fight.opponent.finalScore === undefined) {
    globalThis.fights.set(targetMessageId, fight)

    return
  }

  await reaction.message.channel.send(
    `分出勝負，${fight.author.user} 骰出了 ${fight.author.finalScore}，${fight.opponent.user} 骰出了 ${fight.opponent.finalScore}`,
  )

  if (fight.author.finalScore === fight.opponent.finalScore) {
    await reaction.message.channel.send('雙方平手')
  } else if (fight.author.finalScore > fight.opponent.finalScore) {
    await reaction.message.channel.send(`${fight.author.user} 獲勝`)
  } else {
    await reaction.message.channel.send(`${fight.opponent.user} 獲勝`)
  }

  globalThis.fights.delete(targetMessageId)

  const sortedFightersKey = getSortedKey([fight.author.user.id, fight.opponent.user.id])

  globalThis.fightersKey.delete(sortedFightersKey)
})

client.login(config.DISCORD_TOKEN)
