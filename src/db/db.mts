import { drizzle } from 'drizzle-orm/connect'
import { config } from '~/src/config.mts'
import * as schema from './schema.mts'

export const db = await drizzle('turso', {
  connection: {
    url: config.DATABASE_URL,
    authToken: config.DATABASE_AUTH_TOKEN,
  },
  schema,
})
