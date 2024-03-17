import { REST, Routes } from 'discord.js'
import { SelectServer } from '../db/schema.mjs'
import { commands } from './commands/index.mjs'
import { config } from './config.mjs'

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN)

export async function deployCommands({ name, guildId }: SelectServer) {
  try {
    console.log(`Started refreshing application (/) commands for server: ${name} (${guildId})`)

    await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId), {
      body: commandsData,
    })

    console.log(`Successfully reloaded application (/) commands for server: ${name} (${guildId})`)
  } catch (error) {
    console.error(error)
  }
}
