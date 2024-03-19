CREATE TABLE `brawl_attempts` (
	`id` integer PRIMARY KEY NOT NULL,
	`brawl_id` text NOT NULL,
	`user_id` text NOT NULL,
	`round` integer NOT NULL,
	`dice1` integer NOT NULL,
	`dice2` integer NOT NULL,
	`dice3` integer NOT NULL,
	`dice4` integer NOT NULL,
	`score` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`brawl_id`) REFERENCES `brawls`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `brawl_participants` (
	`id` integer PRIMARY KEY NOT NULL,
	`brawl_id` text NOT NULL,
	`user_id` text NOT NULL,
	`score` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`brawl_id`) REFERENCES `brawls`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `brawls` (
	`id` text PRIMARY KEY NOT NULL,
	`guild_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`message_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`started_at` text,
	FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `brawl_participants_brawl_id_user_id_unique` ON `brawl_participants` (`brawl_id`,`user_id`);