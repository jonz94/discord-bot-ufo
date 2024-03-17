import { REST, Routes } from 'discord.js'
import { SelectGuild } from '../db/schema.mjs'
import { commands } from './commands/index.mjs'
import { config } from './config.mjs'

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN)

export async function deployCommands({ name, id }: SelectGuild) {
  try {
    console.log(`Started refreshing application (/) commands for guild: ${name} (${id})`)

    await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, id), {
      body: commandsData,
    })

    console.log(`Successfully reloaded application (/) commands for guild: ${name} (${id})`)
  } catch (error) {
    console.error(error)
  }
}
