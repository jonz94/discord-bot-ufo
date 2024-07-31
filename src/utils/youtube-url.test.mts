import { expect, test } from 'bun:test'
import {
  EMPTY_PARSED_YOUTUBE_URL_DATA,
  generateYoutubeUrl,
  parseInputTimestampIntoSeconds,
  parseYoutubeUrl,
} from './youtube-url.mts'

test('parse YouTube url correctly', () => {
  expect(parseYoutubeUrl('https://www.youtube.com/watch?v=abc')).toEqual({ type: 'video', id: 'abc', timestamp: null })
  expect(parseYoutubeUrl('https://m.youtube.com/watch?v=abc')).toEqual({ type: 'video', id: 'abc', timestamp: null })
  expect(parseYoutubeUrl('https://youtube.com/watch?v=abc')).toEqual({ type: 'video', id: 'abc', timestamp: null })
  expect(parseYoutubeUrl('https://youtu.be/abc')).toEqual({ type: 'video', id: 'abc', timestamp: null })

  expect(parseYoutubeUrl('https://www.youtube.com/watch?v=abc&t=123')).toEqual({
    type: 'video',
    id: 'abc',
    timestamp: '123',
  })
  expect(parseYoutubeUrl('https://www.youtube.com/watch?v=abc&t=123s')).toEqual({
    type: 'video',
    id: 'abc',
    timestamp: '123',
  })
  expect(parseYoutubeUrl('https://www.youtube.com/live/abc?si=def')).toEqual({
    type: 'video',
    id: 'abc',
    timestamp: null,
  })
  expect(parseYoutubeUrl('https://youtu.be/abc?si=def&t=123')).toEqual({ type: 'video', id: 'abc', timestamp: '123' })
  expect(parseYoutubeUrl('https://www.youtube.com/watch?v=abc&list=ghi&start_radio=1')).toEqual({
    type: 'video',
    id: 'abc',
    timestamp: null,
  })
})

test('parse YouTube clip url correctly', () => {
  expect(parseYoutubeUrl('https://youtube.com/clip/abc')).toEqual({ type: 'clip', id: 'abc', timestamp: null })
  expect(parseYoutubeUrl('https://youtube.com/clip/abc?si=def')).toEqual({ type: 'clip', id: 'abc', timestamp: null })
})

test('handle invalid youtube url correctly', () => {
  expect(parseYoutubeUrl('https://youtube.com/')).toEqual(EMPTY_PARSED_YOUTUBE_URL_DATA)
  expect(parseYoutubeUrl('https://youtu.be/')).toEqual(EMPTY_PARSED_YOUTUBE_URL_DATA)
  expect(parseYoutubeUrl('a')).toEqual(EMPTY_PARSED_YOUTUBE_URL_DATA)

  expect(parseYoutubeUrl('https://youtube.com/watch?t=123')).toEqual(EMPTY_PARSED_YOUTUBE_URL_DATA)
})

test('generate YouTube url correctly', () => {
  expect(generateYoutubeUrl({ type: 'video', id: 'abc', timestamp: null })).toEqual(
    'https://www.youtube.com/watch?v=abc',
  )
  expect(generateYoutubeUrl({ type: 'video', id: 'abc', timestamp: '123' })).toEqual(
    'https://www.youtube.com/watch?v=abc&t=123s',
  )

  expect(generateYoutubeUrl({ type: 'video', id: 'abc', timestamp: '123' }, '456')).toEqual(
    'https://www.youtube.com/watch?v=abc&t=456s',
  )

  expect(generateYoutubeUrl({ type: 'video', id: 'abc', timestamp: null }, '456')).toEqual(
    'https://www.youtube.com/watch?v=abc&t=456s',
  )
})

test('generate YouTube clip url correctly', () => {
  expect(generateYoutubeUrl({ type: 'clip', id: 'abc', timestamp: null })).toEqual('https://www.youtube.com/clip/abc')
  expect(generateYoutubeUrl({ type: 'clip', id: 'abc', timestamp: '123' })).toEqual('https://www.youtube.com/clip/abc')
  expect(generateYoutubeUrl({ type: 'clip', id: 'abc', timestamp: null }, '456')).toEqual(
    'https://www.youtube.com/clip/abc',
  )
  expect(generateYoutubeUrl({ type: 'clip', id: 'abc', timestamp: '123' }, '456')).toEqual(
    'https://www.youtube.com/clip/abc',
  )
})

test('parse input timestamp correctly', () => {
  expect(parseInputTimestampIntoSeconds('1:23:45')).toBe((1 * 60 + 23) * 60 + 45)
  expect(parseInputTimestampIntoSeconds('1;23;45')).toBe((1 * 60 + 23) * 60 + 45)
  expect(parseInputTimestampIntoSeconds('1:23;45')).toBe((1 * 60 + 23) * 60 + 45)
  expect(parseInputTimestampIntoSeconds('1.23.45')).toBe((1 * 60 + 23) * 60 + 45)
  expect(parseInputTimestampIntoSeconds('1,23,45')).toBe((1 * 60 + 23) * 60 + 45)
  expect(parseInputTimestampIntoSeconds('1.23,45')).toBe((1 * 60 + 23) * 60 + 45)
  expect(parseInputTimestampIntoSeconds('1,23.45')).toBe((1 * 60 + 23) * 60 + 45)
})
