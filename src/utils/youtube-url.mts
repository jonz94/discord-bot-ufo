export interface ParsedYoutubeUrlData {
  videoId: string | null
  timestamp: string | null
}

export const EMPTY_PARSED_YOUTUBE_URL_DATA: ParsedYoutubeUrlData = { videoId: null, timestamp: null }

export function parseYoutubeUrl(originalUrl: string): ParsedYoutubeUrlData {
  const parsedUrl = (function parseUrl() {
    try {
      return new URL(originalUrl)
    } catch (error) {
      return null
    }
  })()

  if (!parsedUrl) {
    return EMPTY_PARSED_YOUTUBE_URL_DATA
  }

  if (parsedUrl.pathname === '/') {
    return EMPTY_PARSED_YOUTUBE_URL_DATA
  }

  const videoId = (function getVideoId() {
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.substring(1)
    }

    if (parsedUrl.pathname.startsWith('/watch')) {
      return parsedUrl.searchParams.get('v') ?? null
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
    return EMPTY_PARSED_YOUTUBE_URL_DATA
  }

  const timestamp = parsedUrl.searchParams.get('t')?.replace('s', '') ?? null

  return { videoId, timestamp }
}

export function generateYoutubeUrl({ videoId, timestamp }: ParsedYoutubeUrlData, inputTimestamp?: string) {
  if (!videoId) {
    return null
  }

  const url = new URL('https://www.youtube.com')
  url.pathname = '/watch'
  url.searchParams.append('v', videoId)

  if (timestamp && !inputTimestamp) {
    url.searchParams.append('t', `${timestamp}s`)
  } else if (inputTimestamp) {
    const seconds = parseInputTimestampIntoSeconds(inputTimestamp)

    if ((seconds ?? -1) >= 0) {
      url.searchParams.append('t', `${seconds}s`)
    }
  }

  return url.toString()
}

export function parseInputTimestampIntoSeconds(inputTimestamp: string) {
  if (!inputTimestamp) {
    return null
  }

  return inputTimestamp
    .split(/[:;：,.]/)
    .map((value) => Number(value.trim()))
    .reduce((previousValue, currentValue) => previousValue * 60 + currentValue, 0)
}
