import { drizzle } from 'drizzle-orm/libsql'
import { config } from '~/src/config.mjs'
import * as schema from './schema.mts'

export const db = drizzle({
  connection: {
    url: config.DATABASE_URL,
    authToken: config.DATABASE_AUTH_TOKEN,
  },
  schema,
})
