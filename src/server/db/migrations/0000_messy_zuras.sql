CREATE TABLE `sessionTable` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `userTable`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `userTable` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`githubId` integer,
	`username` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_id_unique` ON `userTable` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_email_unique` ON `userTable` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_githubId_unique` ON `userTable` (`githubId`);