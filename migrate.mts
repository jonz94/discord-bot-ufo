import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from './db/db.mts'

migrate(db, { migrationsFolder: './drizzle' })
