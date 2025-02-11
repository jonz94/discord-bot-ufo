CREATE TABLE `youtube_thumbnail_changed_notification_channels` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `youtube_thumbnails` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` blob NOT NULL,
	`updated_at` integer NOT NULL
);
