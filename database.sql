create table users
(
    id       integer generated always as identity
        primary key,
    name     varchar(30),
    email    varchar(30),
    password varchar(255)
);

alter table users
    owner to postgres;

create table folders
(
    id         integer generated always as identity
        primary key,
    name       varchar(100),
    path       varchar(200),
    parent_key integer,
    create_by  integer
);

alter table folders
    owner to postgres;

create table files
(
    id         integer generated always as identity
        primary key,
    folder_id  integer,
    name       varchar(100),
    path       varchar(200),
    parent_key integer,
    create_by  integer
);

alter table files
    owner to postgres;

create table shares
(
    id        integer generated always as identity
        primary key,
    file_id   integer,
    name      varchar(100),
    path      varchar(200),
    type      varchar(200),
    create_by integer
);

alter table shares
    owner to postgres;
