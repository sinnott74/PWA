-- serial means auto increment
CREATE TABLE users (
  userid serial primary key,
  username varchar(60),
  password varchar(60)
);