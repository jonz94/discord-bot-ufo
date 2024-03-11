import { expect, test } from 'vitest'
import { calculateScore } from './utils.mjs'

test('calculate score is correct', () => {
  // [a, b, c, d]
  expect(calculateScore([1, 2, 3, 4])).toBe(0)
  expect(calculateScore([6, 5, 4, 3])).toBe(0)

  // [a, a, b, c]
  expect(calculateScore([1, 1, 2, 3])).toBe(5)
  expect(calculateScore([6, 6, 5, 4])).toBe(9)

  // [a, a, b, b]
  expect(calculateScore([1, 1, 2, 2])).toBe(4)
  expect(calculateScore([6, 6, 5, 5])).toBe(12)

  // [a, a, a, b]
  expect(calculateScore([1, 1, 1, 2])).toBe(0)
  expect(calculateScore([6, 6, 6, 5])).toBe(0)

  // [a, a, a, a]
  expect(calculateScore([1, 1, 1, 1])).toBe(100)
  expect(calculateScore([6, 6, 6, 6])).toBe(600)
})
