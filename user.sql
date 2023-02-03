CREATE TABLE `usermanagement`.`user` (`id` INT NOT NULL AUTO_INCREMENT , `prenom` VARCHAR(45) NOT NULL , `name` VARCHAR(45) NOT NULL , `email` TEXT NOT NULL , `phone` TEXT NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;



INSERT INTO `user` (`id`, `prenom`, `name`, `email`, `phone`, `comments`, `status`) VALUES (NULL, 'abdellah', 'elouanas', 'abdellahmath296@gmail.com', '0666778899', 'Hey this is a comment', 'active');