import { SlashCommandBuilder, inlineCode, type CommandInteraction } from 'discord.js'
import { timestamp, version } from '~/src/version.mts'

export const commandName = 'version'

export const data = new SlashCommandBuilder().setName(commandName).setDescription('顯示當前機器人的版本資訊')

export async function execute(interaction: CommandInteraction) {
  await interaction.reply({
    content: `當前版本為 ${inlineCode(version)}，最近一次更新於 <t:${timestamp}> (<t:${timestamp}:R>)`,
    ephemeral: true,
  })
}
