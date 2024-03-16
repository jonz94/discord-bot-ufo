CREATE TABLE `servers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`guild_id` text NOT NULL,
	`allow_dev` integer NOT NULL
);
