CREATE TABLE users(
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150) NOT NULL 
);