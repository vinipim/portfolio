CREATE TABLE `media` (
	`id` varchar(64) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`fileType` enum('image','video','document') NOT NULL,
	`contentType` varchar(100) NOT NULL,
	`size` int NOT NULL,
	`storageKey` varchar(500) NOT NULL,
	`url` text NOT NULL,
	`thumbnail` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	`userId` varchar(64),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
