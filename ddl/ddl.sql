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