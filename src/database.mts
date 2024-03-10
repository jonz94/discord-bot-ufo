import { type User } from 'discord.js'

export type Attempt = [number, number, number, number]

export interface Fighter {
  user: User
  attempts: Attempt[]
  finalScore?: number
}

export interface Fight {
  id: string
  fighters: Set<Fighter['user']['id']>
  author: Fighter
  opponent: Fighter
}

type MessageId = string
type FightersKey = string

declare global {
  var fights: Map<MessageId, Fight>
  var fightersKey: Set<FightersKey>
}

export function initializeDatabase() {
  globalThis.fights = new Map()
  globalThis.fightersKey = new Set()
}

export function hasFight(messageId: MessageId) {
  return globalThis.fights.has(messageId)
}

export function getFight(messageId: MessageId) {
  return globalThis.fights.get(messageId)
}

export function setFight(messageId: MessageId, fight: Fight) {
  return globalThis.fights.set(messageId, fight)
}

export function deleteFight(messageId: MessageId) {
  return globalThis.fights.delete(messageId)
}

export function calculateSortedFightersKey(input: string[]) {
  const clonedInput = structuredClone(input)
  clonedInput.sort()
  return clonedInput.join('+')
}

export function hasFightersKey(key: FightersKey) {
  return globalThis.fightersKey.has(key)
}

export function addFightersKey(key: FightersKey) {
  return globalThis.fightersKey.add(key)
}

export function deleteFightersKey(key: FightersKey) {
  globalThis.fightersKey.delete(key)
}
