CREATE TABLE `galleries`
(
    `id`           BIGINT AUTO_INCREMENT,
    `name`         VARCHAR(255) NOT NULL,
    `address`      VARCHAR(400) NOT NULL,
    `close_day`    VARCHAR(255),
    `open_time`    TIME,
    `close_time`   TIME,
    `poster_url`   VARCHAR(2000),
    `homepage_url` VARCHAR(2000),
    `created_at`   DATETIME     NOT NULL DEFAULT NOW(),
    `updated_at`   DATETIME     NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`),
    FULLTEXT `galleries_name_fulltext` (`name`),
    FULLTEXT `galleries_address_fulltext` (`address`)
);

CREATE TABLE `artists`
(
    `id`         BIGINT AUTO_INCREMENT,
    `name`       VARCHAR(255) NOT NULL,
    `field`      VARCHAR(255) NOT NULL,
    `country`    VARCHAR(100) NOT NULL,
    `en_name`    VARCHAR(255),
    `poster_url` VARCHAR(2000),
    `created_at` DATETIME     NOT NULL DEFAULT NOW(),
    `updated_at` DATETIME     NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`),
    FULLTEXT `artists_name_fulltext` (`name`),
    FULLTEXT `artists_field_fulltext` (`field`),
    FULLTEXT `artists_country_fulltext` (`country`),
    FULLTEXT `artists_en_name_fulltext` (`en_name`)
);

CREATE TABLE `users`
(
    `id`            BIGINT AUTO_INCREMENT,
    `name`          VARCHAR(30)  NOT NULL,
    `email_address` VARCHAR(255) NOT NULL,
    `password`      VARCHAR(255) NOT NULL,
    `phone_number`  CHAR(11)     NOT NULL,
    `status`        ENUM ('IN_USE', 'DELETED') DEFAULT 'IN_USE',
    `created_at`    DATETIME     NOT NULL      DEFAULT NOW(),
    `updated_at`    DATETIME     NOT NULL      DEFAULT NOW(),
    `deleted_at`    DATETIME,
    PRIMARY KEY (`id`),
    INDEX `users_email_address_index` (`email_address`)
);
