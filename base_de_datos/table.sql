CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT,
  `user_name` VARCHAR(30) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `if_admin` TINYINT(0) NULL DEFAULT 0,
  `full_name` VARCHAR(30) NOT NULL,
  `phone` BIGINT(20) NOT NULL,
  `mail` VARCHAR(30) NOT NULL,
  `address` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT,
  `id_client` INT NOT NULL,
  `id_status` INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `status` (
  `id` INT AUTO_INCREMENT,
  `status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `orders-products` (
  `id` INT AUTO_INCREMENT,
  `id_products` INT  NOT NULL,
  `id_orders` INT NOT NULL,
  `amount` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Products` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `price` FLOAT NOT NULL,
  `img_url` VARCHAR (255) NOT NULL,
  `description` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`)
);
