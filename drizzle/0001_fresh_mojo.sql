CREATE TABLE `attempts` (
	`id` integer PRIMARY KEY NOT NULL,
	`game_id` integer NOT NULL,
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
	`id` integer PRIMARY KEY NOT NULL,
	`guild_id` text NOT NULL,
	`message_id` text,
	`author_id` text NOT NULL,
	`opponent_id` text NOT NULL,
	`author_score` integer,
	`opponent_score` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`guild_id`) REFERENCES `servers`(`guild_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `games_message_id_unique` ON `games` (`message_id`);