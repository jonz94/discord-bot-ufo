import { expect, test } from 'bun:test'
import { EMPTY_PARSED_TWITTER_URL_DATA, parseTwitterUrl } from './parse-twitter-url'

test('parse twitter url correctly', () => {
  expect(parseTwitterUrl('https://twitter.com/abc/status/123')).toEqual({ userId: 'abc', statusId: '123' })
  expect(parseTwitterUrl('https://x.com/abc/status/123')).toEqual({ userId: 'abc', statusId: '123' })
  expect(parseTwitterUrl('https://x.com/abc')).toEqual({ userId: 'abc', statusId: null })
})

test('handle invalid twitter url correctly', () => {
  expect(parseTwitterUrl('https://twitter.com/')).toEqual(EMPTY_PARSED_TWITTER_URL_DATA)
  expect(parseTwitterUrl('https://x.com/')).toEqual(EMPTY_PARSED_TWITTER_URL_DATA)
  expect(parseTwitterUrl('a')).toEqual(EMPTY_PARSED_TWITTER_URL_DATA)
})
