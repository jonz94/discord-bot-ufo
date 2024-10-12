import { Events } from 'discord.js'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '~/db/db.mts'
import { guilds } from '~/db/schema.mts'
import { client } from './client.mts'
import { commands } from './commands/index.mts'
import { config } from './config.mts'
import { deployCommands } from './deploy-commands.mts'
import { emojis } from './emoji-list.mts'
import { handleBrawlRollDiceReaction, handleJoinBrawlReaction } from './handlers/handle-brawl-reaction.mts'
import { handleFightReaction } from './handlers/handle-fight-reaction.mts'
import { isDev } from './utils/is-dev.mts'

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)

  // 開發環境下，允許 allowDev 為 true 的伺服器進行測試
  const targetGuilds = await db.query.guilds.findMany({
    where: isDev ? eq(guilds.allowDev, true) : undefined,
  })

  targetGuilds.forEach((guild) => deployCommands(guild))
})

client.on(Events.MessageCreate, async (message) => {
  if (!message.inGuild()) {
    return
  }

  if (!message.member) {
    return
  }

  if (message.content === '場子不乾淨') {
    await message.channel.send({ content: `怪我囉 ${emojis.白眼海豚笑}` })
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
