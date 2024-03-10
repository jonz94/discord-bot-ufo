import { ChannelType, CommandInteraction, SlashCommandBuilder, codeBlock } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('yt')
  .setDescription('YouTube 網址格式小幫手')
  .addStringOption((option) => option.setName('網址').setDescription('YouTube 網址').setRequired(true))
  .addStringOption((option) =>
    option
      .setName('開始於')
      .setDescription('從幾小時幾分幾秒開始播放 (e.g. 1:23:45 表示從 1 小時 23 分 45 秒處開始播放)'),
  )

export async function execute(interaction: CommandInteraction) {
  if (interaction.channel?.type === ChannelType.GuildVoice) {
    await interaction.reply({
      content: '無法在語音頻道運作，請轉移陣地到一般的文字頻道，拍謝QQ',
      ephemeral: true,
    })

    return
  }

  const originalUrl = ((interaction.options as any)?.getString('網址') ?? '') as string

  if (!originalUrl) {
    await interaction.reply({
      content: '請輸入 YouTube 網址',
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
      content: ['無法解析此 YouTube 網址', codeBlock(originalUrl)].join('\n'),
      ephemeral: true,
    })

    return
  }

  const videoId = (function getVideoId() {
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.substring(1)
    }

    if (parsedUrl.pathname.startsWith('/watch')) {
      return parsedUrl.searchParams.get('v') ?? ''
    }

    if (parsedUrl.pathname.startsWith('/live/')) {
      return parsedUrl.pathname.substring('/live/'.length)
    }

    if (parsedUrl.pathname.startsWith('/shorts/')) {
      return parsedUrl.pathname.substring('/shorts/'.length)
    }

    return null
  })()

  if (!videoId) {
    await interaction.reply({
      content: `無法解析此 YouTube 網址 (${originalUrl})`,
      ephemeral: true,
    })

    return
  }

  const result = (function generateUrl() {
    const url = new URL('https://www.youtube.com')
    url.pathname = '/watch'
    url.searchParams.append('v', videoId)

    const timestampInOriginalUrl = parsedUrl.searchParams.get('t') ?? ''
    const inputTimestamp = ((interaction.options as any)?.getString('開始於') ?? '') as string

    if (timestampInOriginalUrl && !inputTimestamp) {
      url.searchParams.append('t', timestampInOriginalUrl)
    } else if (inputTimestamp) {
      const seconds = inputTimestamp
        .split(/[:;：]/)
        .map((value) => Number(value))
        .reduce((previousValue, currentValue) => previousValue * 60 + currentValue, 0)

      url.searchParams.append('t', String(seconds))
    }

    return url
  })()

  await interaction.reply({
    content: ['原始網址', codeBlock(originalUrl), '整理後網址', codeBlock(result.toString()), result].join('\n'),
    ephemeral: true,
  })
}
