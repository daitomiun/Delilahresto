CREATE DATABASE delilah_resto;

USE delilah_resto;

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
  `id_status` INT NULL DEFAULT 1,
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `status` (
  `id` INT AUTO_INCREMENT,
  `status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `orders_products` (
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

INSERT INTO `users` (`user_name`, `password`, `if_admin`, `full_name`, `phone`, `mail`, `address`) VALUES ('andrea', 'Andrea123.', '0', 'andrea lopez', '3112503695', 'andrea@gmail.com', 'diagonal 8b # 50a - 102');
INSERT INTO `users` (`user_name`, `password`, `if_admin`, `full_name`, `phone`, `mail`, `address`) VALUES ('juan', 'Juan123.', '1', 'juan perez', '3125896325', 'juan@gmail.com', 'carrera 9a # 26b - 89');

INSERT INTO `orders` (`id_client`, `date`) VALUES ('1', current_timestamp());
INSERT INTO `orders` (`id_client`, `date`) VALUES ('2', current_timestamp());

INSERT INTO `status` (`status`) VALUES ('NUEVO');
INSERT INTO `status` (`status`) VALUES ('CONFIRMADO');
INSERT INTO `status` (`status`) VALUES ('PREPARANDO');
INSERT INTO `status` (`status`) VALUES ('ENVIADO');
INSERT INTO `status` (`status`) VALUES ('ENTREGADO');
INSERT INTO `status` (`status`) VALUES ('CANCELADO');

INSERT INTO `orders_products` (`id_products`, `id_orders`, `amount`) VALUES ('1', '1', '1');
INSERT INTO `orders_products` (`id_products`, `id_orders`, `amount`) VALUES ('2', '2', '2');

INSERT INTO `products` (`name`, `price`, `img_url`, `description`) VALUES ('Pescado', '20000', 'https://www.google.com/search?q=pescado&sxsrf=ALeKk003eUrXArNY4CaRBJa36l0NU3z67w:1623858334195&source=lnms&tbm=isch&sa=X&ved=2ahUKEwir6rLZv5zxAhX-RjABHVFpBqkQ_AUoAXoECAIQAw#imgrc=yIVUX2g-MfLEFM', 'Filete de Robalo a La plancha\r\nAcompañado de Arroz blanco, patacones y ensalada.');
INSERT INTO `products` (`name`, `price`, `img_url`, `description`) VALUES ('Pollo frito', '15000', 'https://www.google.com/search?q=pollo+frito&sxsrf=ALeKk00W_ntLJo8ckXtaEQ-a-sUGhy7M9w:1623858462407&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiZmMSWwJzxAhX7SzABHUubBsUQ_AUoAXoECAIQAw&biw=1918&bih=1009#imgrc=TUcr-_J-GeKMIM', 'Pollo frito');