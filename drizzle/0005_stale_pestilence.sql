CREATE TABLE `youtube_thumbnails` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`data` blob NOT NULL,
	`updated_at` integer NOT NULL
);
