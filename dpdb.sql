BEGIN TRANSACTION;

CREATE TABLE "blog" (
    `blog_id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `blog_url`    TEXT NOT NULL UNIQUE,
    `blog_area`    TEXT NOT NULL,
    `store_id`    INTEGER NOT NULL,
    FOREIGN KEY(`store_id`) REFERENCES store
);

CREATE TABLE "store" (
    `store_id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `store_area`    TEXT NOT NULL,
    `store_title`    TEXT NOT NULL,
    `store_type`    TEXT NOT NULL,
    `store_daum_id`    TEXT NOT NULL UNIQUE,
    `store_daum_x`    INTEGER NOT NULL,
    `store_daum_y`    INTEGER NOT NULL,
    `store_count`    INTEGER NOT NULL DEFAULT 0
);

COMMIT;
