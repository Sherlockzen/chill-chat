ALTER TABLE userTable ADD `googleId` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_googleId_unique` ON `userTable` (`googleId`);