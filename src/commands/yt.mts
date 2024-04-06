import { SlashCommandBuilder, codeBlock, type CommandInteraction } from 'discord.js'
import { generateYoutubeUrl, parseYoutubeUrl } from '~/src/utils/youtube-url.mts'

export const commandName = 'yt'

export const data = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('YouTube 網址格式小幫手')
  .addStringOption((option) => option.setName('網址').setDescription('YouTube 網址').setRequired(true))
  .addStringOption((option) =>
    option
      .setName('開始於')
      .setDescription('從幾小時幾分幾秒開始播放 (e.g. 1.23.45 表示從 1 小時 23 分 45 秒處開始播放)'),
  )

export async function execute(interaction: CommandInteraction) {
  const originalUrl = String(interaction.options.get('網址')?.value ?? '')

  if (!originalUrl) {
    await interaction.reply({
      content: '請輸入 YouTube 網址',
      ephemeral: true,
    })

    return
  }

  const { videoId, timestamp } = parseYoutubeUrl(originalUrl)

  if (!videoId) {
    await interaction.reply({
      content: ['無法解析此 YouTube 網址', codeBlock(originalUrl)].join('\n'),
      ephemeral: true,
    })

    return
  }

  const inputTimestamp = interaction.options.get('開始於')?.value?.toString()

  const result = generateYoutubeUrl({ videoId, timestamp }, inputTimestamp)

  if (!result) {
    await interaction.reply({
      content: ['無法格式化此 YouTube 網址', codeBlock(originalUrl)].join('\n'),
      ephemeral: true,
    })

    return
  }

  await interaction.reply({
    content: ['原始網址', codeBlock(originalUrl), '整理後網址', codeBlock(result.toString()), result].join('\n'),
    ephemeral: true,
  })
}
