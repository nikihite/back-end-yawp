-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS restaurants cascade;
DROP TABLE if EXISTS reviews cascade;

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

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    restaurant_id BIGINT,
    user_id BIGINT,
    rating INT,
    details TEXT,
    foreign key (restaurant_id) references restaurants(id),
    foreign key (user_id) references users(id)
);

INSERT into restaurants (name, style, rating) values
('Thai Tanic', 'Thai', 3),
('Jones Good Ass BBQ & Foot Massage', 'BBQ', 5),
('Groovy Smoothie', 'Taco-On-Stick', 4),
('The Waverly Sub Station', 'Subs', 2),
('Casa Bonita', 'Mexican', 1);

INSERT into users (first_name, last_name, email, password_hash) values 
('Peter', 'Griffin', 'wheresmy@beer.com', 'fake_password'),
('Joe', 'Swanson', 'shotmy@legs.com', 'fake_password'),
('Cleveland', 'Brown', 'cleveland@brown.com', 'fake_password'),
('Glenn', 'Quagmire', 'giggity@giggity.com', 'fake_password'),
('Chris', 'Griffin', 'cantstop@eating.com', 'fake_password');

INSERT into reviews (restaurant_id, user_id, rating, details) values
('3', '1', '4', 'I enjoy eating my tacos from a stick.'),
('5', '3', '2', 'Margaritas were too small.'),
('1', '2', '5', 'No wheel chair access, had to eat in parking lot, food was good though.'),
('2', '4', '3', 'Real great foot massage with a side of good ass BBQ, giggity.'),
('4', '1', '1', 'Ran out of pickles. I dont like pickles but i still wanted to throw the one on my sub away.'),
('2', '2', '1', 'Im sure the foot massage would have been great if I had feeling in my legs.')