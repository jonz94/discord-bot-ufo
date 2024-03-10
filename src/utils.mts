import { randomInt } from 'node:crypto'
import { Attempt } from './database.mjs'

export const isDev = process.env.NODE_ENV?.toLowerCase() === 'dev'

export function rollDice() {
  return randomInt(1, 7)
}

export function calculateScore(input: Attempt) {
  const size = new Set(input).size

  switch (size) {
    case 4:
      return 0

    case 3: {
      const scores = input.filter((element) => input.indexOf(element) === input.lastIndexOf(element))

      return scores[0] + scores[1]
    }

    case 2: {
      const scores = input.filter((element) => input.indexOf(element) !== input.lastIndexOf(element))

      if (scores.length === 3) {
        return 0
      }

      return (scores[0] > scores[1] ? scores[0] : scores[1]) * 2
    }

    case 1:
      return input[0] * 100

    default:
      return -1
  }
}
