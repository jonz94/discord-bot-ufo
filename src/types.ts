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
