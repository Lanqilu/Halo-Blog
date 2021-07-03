create table m_blog
(
    id          bigint auto_increment
        primary key,
    user_id     bigint       not null,
    title       varchar(255) not null,
    description varchar(255) not null,
    content     longtext     null,
    created     datetime     not null on update CURRENT_TIMESTAMP,
    status      tinyint      null
)
    charset = utf8mb4;

create table m_user
(
    id         bigint auto_increment
        primary key,
    username   varchar(64)  null,
    avatar     varchar(255) null,
    email      varchar(64)  null,
    password   varchar(64)  null,
    status     int          not null,
    created    datetime     null,
    last_login datetime     null
)
    charset = utf8;

create index UK_USERNAME
    on m_user (username);

