CREATE TABLE `attempts` (
	`id` integer PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`user_id` text NOT NULL,
	`round` integer NOT NULL,
	`dice1` integer NOT NULL,
	`dice2` integer NOT NULL,
	`dice3` integer NOT NULL,
	`dice4` integer NOT NULL,
	`score` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` text PRIMARY KEY NOT NULL,
	`guild_id` text NOT NULL,
	`author_id` text NOT NULL,
	`opponent_id` text NOT NULL,
	`author_score` integer,
	`opponent_score` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guilds` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`allow_dev` integer NOT NULL
);
