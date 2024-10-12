import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema.mts'

// NOTE: do not use new drizzle-orm/connect yet due to bundler issues
// See: https://github.com/drizzle-team/drizzle-orm/issues/3077#issuecomment-2401475020
const client = createClient({ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN })
export const db = drizzle(client, { schema })
