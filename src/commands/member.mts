import { SlashCommandBuilder, type ChatInputCommandInteraction, type User } from 'discord.js'

export const commandName = 'member'

export const data = new SlashCommandBuilder().setName(commandName).setDescription('查看伺服器擁有者，以及成員列表')

export async function execute(interaction: ChatInputCommandInteraction) {
  const owner = await interaction.guild?.fetchOwner()

  const memberNames: User[] = []

  ;((await interaction.guild?.members.fetch()) ?? []).forEach((member) => memberNames.push(member.user))

  await interaction.reply({
    content: [`目前伺服器的擁有者為 ${owner ?? null}`, '', `目前伺服器的成員有：`, ...memberNames].join('\n'),
    ephemeral: true,
  })
}
