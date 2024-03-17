import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const servers = sqliteTable('servers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  guildId: text('guild_id').notNull(),
  allowDev: integer('allow_dev', { mode: 'boolean' }).notNull(),
})

export type SelectServer = typeof servers.$inferSelect
