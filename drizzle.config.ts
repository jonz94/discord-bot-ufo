import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.mts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './database.sqlite',
  },
} satisfies Config
