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
    `media` VARCHAR (1000) NOT NULL,
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

INSERT INTO post (`id`, `title`, `description`, `media`, `link`, `date_created`, `date_updated`) VALUES (1, 'Sacré Campus', 'Sacré Campus référence les différents lieux stratégiques autour du campus de la Wild Reims afin de vous aider dans vos déplacements.', 'https://zupimages.net/up/20/30/mbja.png', 'https://brianlag.github.io/sacre-campus/', null, null);
INSERT INTO post (`id`, `title`, `description`, `media`, `link`, `date_created`, `date_updated`) VALUES (2, 'GitHub Fighters', 'GitHub Fighters est une application web ayant pour but de réaliser un combat entre les utilisateurs de la plateforme GitHub utilisant les données du profil (repos, gists, followers, following).', 'https://www.zupimages.net/up/20/30/0ao5.png', 'https://projet-2-github-fighters.netlify.app/', null, null);
INSERT INTO post (`id`, `title`, `description`, `media`, `link`, `date_created`, `date_updated`) VALUES (3, 'Tonton Sommelier', 'Tonton Sommelier est une start-up qui à pour but de faire découvrir le monde de l oenologie dans un cadre ludique et évolutif. Le projet est associé à un jeu de plateau qui va favoriser l interactivité avec l application. Visée communautaire.', 'https://zupimages.net/up/20/30/7sfo.png', 'https://tontonsommelier.com/', null, null);
INSERT INTO post (`id`, `title`, `description`, `media`, `link`, `date_created`, `date_updated`) VALUES (4, 'The Confined Traveller - Hackathon #1', 'The Confined Traveller vous propose de découvrir les collections du Metropolitan Museum of Art selon les départements du musée. Il existe également notre sélection personnelle.', 'https://zupimages.net/up/20/30/rrag.png', 'https://laughing-joliot-98b470.netlify.app/', null, null);
INSERT INTO post (`id`, `title`, `description`, `media`, `link`, `date_created`, `date_updated`) VALUES (5, 'KiDoc - Hackathon #2 - Finaliste', 'KiDoc est une application destinée aux enfants malades, supervisée par les parents proposant une liste de tâches à réaliser (traitement régulier...)', 'https://www.zupimages.net/up/20/30/y7yw.png', 'https://www.linkedin.com/in/brian-thellier/', null, null);

INSERT INTO language (`id`, `name`, `media`) VALUES (1, 'JavaScript', 'image'), (2, 'ReactJS', 'image'), (3, 'NodeJS', 'image');

/* INSERT INTO language_post (`post_id`, `language_id`) VALUES (1, 2), (1, 3), (2, 1), (3, 2);*/

/* ===== Contraintes ===== */

ALTER TABLE language_post
ADD CONSTRAINT `fk_language_post_language`
FOREIGN KEY (`language_id`)
REFERENCES `language`(`id`);

ALTER TABLE language_post
ADD CONSTRAINT `fk_language_post_post`
FOREIGN KEY (`post_id`)
REFERENCES `post`(`id`);