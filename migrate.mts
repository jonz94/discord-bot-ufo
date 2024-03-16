import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './db/db.mjs'

migrate(db, { migrationsFolder: './drizzle' })
