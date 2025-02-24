import { defineConfig } from 'drizzle-kit'
import { config } from '~/src/config'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: config.DATABASE_URL,
    authToken: config.DATABASE_AUTH_TOKEN,
  },
})
