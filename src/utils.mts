import { randomInt } from 'node:crypto'
import { config } from './config.mts'

export const isDev = config.APP_ENV.toLowerCase() === 'dev'

export function rollDice() {
  return randomInt(1, 7)
}

export function calculateScore(input: readonly [number, number, number, number]) {
  const numberOfUniqueElement = new Set(input).size

  switch (numberOfUniqueElement) {
    // input is [a, b, c, d]
    case 4:
      return 0

    // input is [a, a, b, c]
    case 3: {
      const duplicatedElementRemovedInput = input.filter(
        (element) => input.indexOf(element) === input.lastIndexOf(element),
      )
      // duplicatedElementRemovedInput is [b, c]

      // return b + c
      return duplicatedElementRemovedInput[0] + duplicatedElementRemovedInput[1]
    }

    // input is [a, a, a, b] or [a, a, b, b]
    case 2: {
      const uniqueElementRemovedInput = input.filter((element) => input.indexOf(element) !== input.lastIndexOf(element))
      // uniqueElementRemovedInput is [a, a, a] or [a, a, b, b]

      if (uniqueElementRemovedInput.length === 3) {
        // means input is [a, a, a, b]
        return 0
      }

      // input is [a, a, b, b]; return max(a, b) * 2
      return Math.max(...uniqueElementRemovedInput) * 2
    }

    // input is [a, a, a, a]
    case 1:
      // NOTE: 豹子，直接乘以 100 方便後續比大小
      return input[0] * 100

    default:
      return -1
  }
}
