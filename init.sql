CREATE DATABASE IF NOT EXISTS tvshows;

use tvshows;

CREATE TABLE IF NOT EXISTS `shows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `review` mediumtext NOT NULL,
  `platform` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);