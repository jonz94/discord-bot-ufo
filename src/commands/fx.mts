import { SlashCommandBuilder, codeBlock, type CommandInteraction } from 'discord.js'
import { parseTwitterUrl } from '~/src/utils/parse-twitter-url.mts'

export const commandName = 'fx'

export const data = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('Twitter/X 網址格式小幫手')
  .addStringOption((option) => option.setName('網址').setDescription('Twitter/X 網址').setRequired(true))

export async function execute(interaction: CommandInteraction) {
  const originalUrl = interaction.options.get('網址')?.value?.toString() ?? ''

  if (!originalUrl) {
    await interaction.reply({
      content: '請輸入 Twitter/X 網址',
      ephemeral: true,
    })

    return
  }

  const { userId, statusId } = parseTwitterUrl(originalUrl)

  if (!userId || !statusId) {
    await interaction.reply({
      content: ['無法解析此 Twitter/X 網址', codeBlock(originalUrl)].join('\n'),
      ephemeral: true,
    })

    return
  }

  const twitterUrl = new URL(`/${userId}/status/${statusId}`, 'https://twitter.com')
  const fxTwitterUrl = new URL(`/${userId}/status/${statusId}`, 'https://fxtwitter.com')

  await interaction.reply({
    content: [
      '原始網址',
      codeBlock(originalUrl),
      '整理後 Twitter 網址',
      codeBlock(twitterUrl.toString()),
      twitterUrl,
      '',
      '整理後 FxTwitter 網址',
      codeBlock(fxTwitterUrl.toString()),
      fxTwitterUrl,
    ].join('\n'),
    ephemeral: true,
  })
}
