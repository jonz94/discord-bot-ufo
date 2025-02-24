export interface ParsedTwitterUrlData {
  userId: string | null
  statusId: string | null
}

export const EMPTY_PARSED_TWITTER_URL_DATA: ParsedTwitterUrlData = { userId: null, statusId: null }

export function parseTwitterUrl(originalUrl: string): ParsedTwitterUrlData {
  const parsedUrl = (function parseUrl() {
    try {
      return new URL(originalUrl)
    } catch (error) {
      return null
    }
  })()

  if (!parsedUrl) {
    return EMPTY_PARSED_TWITTER_URL_DATA
  }

  if (parsedUrl.pathname === '/') {
    return EMPTY_PARSED_TWITTER_URL_DATA
  }

  const userId = parsedUrl.pathname.split('/').at(1) ?? null
  const statusId = parsedUrl.pathname.split('/').at(3) ?? null

  return { userId, statusId }
}
