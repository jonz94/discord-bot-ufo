import { CommandInteraction, SlashCommandBuilder, codeBlock } from 'discord.js'

export const commandName = 'fx'

export const data = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('Twitter/X 網址格式小幫手')
  .addStringOption((option) => option.setName('網址').setDescription('Twitter/X 網址').setRequired(true))

export async function execute(interaction: CommandInteraction) {
  const originalUrl = String(interaction.options.get('網址')?.value ?? '')

  if (!originalUrl) {
    await interaction.reply({
      content: '請輸入 Twitter/X 網址',
      ephemeral: true,
    })

    return
  }

  const parsedUrl = (function parseUrl() {
    try {
      return new URL(originalUrl)
    } catch (error) {
      return null
    }
  })()

  if (!parsedUrl) {
    await interaction.reply({
      content: ['無法解析此 Twitter/X 網址', codeBlock(originalUrl)].join('\n'),
      ephemeral: true,
    })

    return
  }

  const statusId = parsedUrl.pathname.split('/').at(3) ?? null

  if (!statusId) {
    await interaction.reply({
      content: ['無法解析此 Twitter/X 網址', codeBlock(originalUrl)].join('\n'),
      ephemeral: true,
    })

    return
  }

  const twitterUrl = new URL(`/status/${statusId}`, 'https://twitter.com')
  const fxTwitterUrl = new URL(`/status/${statusId}`, 'https://fxtwitter.com')

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
