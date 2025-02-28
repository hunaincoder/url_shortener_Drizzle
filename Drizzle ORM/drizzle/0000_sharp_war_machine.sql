CREATE TABLE `short_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`shortcode` varchar(25) NOT NULL,
	CONSTRAINT `short_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `short_links_shortcode_unique` UNIQUE(`shortcode`)
);
