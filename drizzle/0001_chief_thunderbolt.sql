CREATE TABLE `adminCredentials` (
	`id` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` text NOT NULL,
	`name` text,
	`createdAt` timestamp DEFAULT (now()),
	`lastLogin` timestamp,
	CONSTRAINT `adminCredentials_id` PRIMARY KEY(`id`),
	CONSTRAINT `adminCredentials_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` varchar(64) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImage` text,
	`category` varchar(100) NOT NULL,
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`publishedAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	`authorId` varchar(64),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `posts_slug_unique` UNIQUE(`slug`)
);
