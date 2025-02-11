import { sql } from 'drizzle-orm'
import { blob, integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

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

export const brawls = sqliteTable('brawls', {
  id: text('id').primaryKey(),
  guildId: text('guild_id')
    .references(() => guilds.id)
    .notNull(),
  channelId: text('channel_id').notNull(),
  messageId: text('message_id'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  startedAt: text('started_at'),
  endedAt: text('ended_at'),
})

export const brawlParticipants = sqliteTable(
  'brawl_participants',
  {
    id: integer('id').primaryKey(),
    brawlId: text('brawl_id')
      .references(() => brawls.id)
      .notNull(),
    userId: text('user_id').notNull(),
    score: integer('score'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    unq: unique().on(table.brawlId, table.userId),
  }),
)

export const brawlAttempts = sqliteTable('brawl_attempts', {
  id: integer('id').primaryKey(),
  brawlId: text('brawl_id')
    .references(() => brawls.id)
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

export const youtubeThumbnails = sqliteTable('youtube_thumbnails', {
  id: integer('id').primaryKey(),
  data: blob('data', { mode: 'buffer' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const youtubeThumbnailChangedNotificationChannels = sqliteTable(
  'youtube_thumbnail_changed_notification_channels',
  {
    id: text('id').primaryKey(),
  },
)
