CREATE TABLE `reviews` (
	`id` varchar(64) NOT NULL,
	`type` enum('film','album','book') NOT NULL,
	`title` text NOT NULL,
	`creator` text,
	`year` int,
	`rating` int NOT NULL,
	`notes` text,
	`tags` text,
	`coverImage` text,
	`apiId` varchar(255),
	`metadata` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	`userId` varchar(64),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
