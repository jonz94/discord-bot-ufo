import { Events } from 'discord.js'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '~/db/db.mts'
import { guilds } from '~/db/schema.mts'
import { startSchedule } from '~/src/utils/compare-images.mjs'
import { startScheduleToKeepTursoAlive } from '~/src/utils/keep-turso-alive.mts'
import { client } from './client.mts'
import { commands } from './commands/index.mts'
import { config } from './config.mts'
import { deployCommands } from './deploy-commands.mts'
import { emojis } from './emoji-list.mts'
import { handleBrawlRollDiceReaction, handleJoinBrawlReaction } from './handlers/handle-brawl-reaction.mts'
import { handleFightReaction } from './handlers/handle-fight-reaction.mts'
import { isDev } from './utils/is-dev.mts'

startScheduleToKeepTursoAlive()

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)

  // 開發環境下，允許 allowDev 為 true 的伺服器進行測試
  const targetGuilds = await db.query.guilds.findMany({
    where: isDev ? eq(guilds.allowDev, true) : undefined,
  })

  targetGuilds.forEach((guild) => deployCommands(guild))

  startSchedule()
})

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) {
    return
  }

  if (!message.inGuild()) {
    return
  }

  if (!message.member) {
    return
  }

  if (message.content === '場子不乾淨') {
    await message.channel.send({ content: `怪我囉 ${emojis.白眼海豚笑}` })
  }

  // when a user replies to a message that mentions the bot,
  // it will attempts to extract and send the URLs of any custom emojis or stickers present in the replied message

  const theBotId = client.user?.id

  if (!theBotId) {
    return
  }

  if (!message.reference?.messageId) {
    return
  }

  try {
    if (!message.mentions.users.some((user) => user.id === theBotId)) {
      return
    }

    const repliedMessage = await message.channel.messages.fetch(message.reference.messageId)

    const discordCustomEmojiRegex = /<a?:\w+:(\d+)>/g
    let match
    while ((match = discordCustomEmojiRegex.exec(repliedMessage.content)) !== null) {
      const emojiId = match[1]
      const isAnimated = match[0].startsWith('<a:')
      const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? 'gif' : 'png'}`
      await message.channel.send({ content: `此表情符號網址為 ${emojiUrl}` })
    }

    repliedMessage.stickers.forEach(async (sticker) => {
      await message.channel.send({ content: `此貼圖網址為 ${sticker.url}` })
    })
  } catch (error) {
    console.error('Error fetching the replied message:', error)

    await message.channel.send({ content: '讀取聊天室訊息時發生錯誤QQ' })
  }
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
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

  handleFightReaction(reaction, user, targetMessageId)

  handleJoinBrawlReaction(reaction, user, targetMessageId)
  handleBrawlRollDiceReaction(reaction, user, targetMessageId)
})

client.login(config.DISCORD_TOKEN)

const app = new Hono()

app.get('/', (c) => {
  console.log('path / hitted!')

  return c.text(`Hello from ${client.user?.displayName}!`)
})

app.get('/healthz', (c) => {
  return c.text('OK')
})

export default {
  port: config.APP_PORT,
  fetch: app.fetch,
}
