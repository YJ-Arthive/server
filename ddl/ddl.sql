CREATE TABLE `gallery`
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
    PRIMARY KEY (`id`)
)