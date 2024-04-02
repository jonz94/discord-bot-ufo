import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from './db/db.mjs'

migrate(db, { migrationsFolder: './drizzle' })
