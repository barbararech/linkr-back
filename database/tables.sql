CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    username VARCHAR(50) NOT NULL,
    "pictureUrl" TEXT NOT NULL
);