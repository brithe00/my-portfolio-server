DROP DATABASE IF EXISTS my_portfolio_db;

CREATE DATABASE my_portfolio_db;

USE my_portfolio_db;

/* ===== Création des tables ===== */

CREATE TABLE `post`(
 	`id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR (100) NOT NULL,
    `description` VARCHAR (500) NOT NULL,
    `media` VARCHAR (500) NOT NULL,
    `link` VARCHAR (100) NOT NULL,
    `date_created` TIMESTAMP DEFAULT NOW(),
    `date_updated` TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (`id`)
);

CREATE TABLE `language`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR (100) NOT NULL,
    `media` VARCHAR (500) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR (100) NOT NULL,
    `password` VARCHAR (100) NOT NULL,
    PRIMARY KEY (`id`)
);

/* ===== Création des tables de jointure ===== */

CREATE TABLE `language_post` (
	`language_id` INT(11),
	`post_id` INT(11)
);

/* ===== Insertions ===== */

INSERT INTO post (`id`, `title`, `description`, `media`, `link`, `date_created`, `date_updated`) VALUES (1, 'My first project', 'This is my first project', 'myimage', 'http://localhost:8000', null, null),
(2, 'My second project', 'This is my second project', 'myimage', 'http://localhost:8000', null, null),
(3, 'My third project', 'This is my third project', 'myimage', 'http://localhost:8000', null, null);

INSERT INTO language (`id`, `name`, `media`) VALUES (1, 'JavaScript', 'myicon'), (2, 'Ruby', 'myicon'), (3, 'PHP', 'myicon');

/* ===== Contraintes ===== */

ALTER TABLE language_post
ADD CONSTRAINT `fk_language_post_language`
FOREIGN KEY (`language_id`)
REFERENCES `language`(`id`);

ALTER TABLE language_post
ADD CONSTRAINT `fk_language_post_post`
FOREIGN KEY (`post_id`)
REFERENCES `post`(`id`);