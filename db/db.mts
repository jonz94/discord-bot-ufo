import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { config } from '../src/config.mts'
import * as schema from './schema.mts'

const client = createClient({ url: config.DATABASE_URL, authToken: config.DATABASE_AUTH_TOKEN })

export const db = drizzle(client, { schema })
