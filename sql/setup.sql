-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
     email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);


CREATE TABLE restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    style VARCHAR NOT NULL,
    rating INT
);

INSERT into restaurants (name, style, rating) values
('Thai Tanic', 'Thai', 3),
('Jones Good Ass BBQ & Foot Massage', 'BBQ', 5),
('Groovy Smoothie', 'Taco-On-Stick', 4),
('The Waverly Sub Station', 'Subs', 2),
('Casa Bonita', 'Mexican', 1)
