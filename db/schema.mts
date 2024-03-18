import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const guilds = sqliteTable('guilds', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  allowDev: integer('allow_dev', { mode: 'boolean' }).notNull(),
})

export type SelectGuild = typeof guilds.$inferSelect

export const games = sqliteTable('games', {
  id: text('id').primaryKey(),
  guildId: text('guild_id')
    .references(() => guilds.id)
    .notNull(),
  channelId: text('channel_id').notNull(),
  authorId: text('author_id').notNull(),
  opponentId: text('opponent_id').notNull(),
  authorScore: integer('author_score'),
  opponentScore: integer('opponent_score'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const attempts = sqliteTable('attempts', {
  id: integer('id').primaryKey(),
  gameId: text('game_id')
    .references(() => games.id)
    .notNull(),
  userId: text('user_id').notNull(),
  round: integer('round').notNull(),
  dice1: integer('dice1').notNull(),
  dice2: integer('dice2').notNull(),
  dice3: integer('dice3').notNull(),
  dice4: integer('dice4').notNull(),
  score: integer('score').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})
