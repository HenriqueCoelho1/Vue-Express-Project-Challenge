CREATE TABLE users_movies (
  users INT REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE, 
  movies INT REFERENCES movies (id) ON UPDATE CASCADE ON DELETE CASCADE, 
  CONSTRAINT users_movies_pkey PRIMARY KEY (users, movies)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(250) UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    genre VARCHAR(250) NOT NULL,
);
