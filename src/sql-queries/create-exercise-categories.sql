CREATE TABLE exercise_category(
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(150) NOT NULL
);

INSERT INTO exercise_category(name) VALUES ('Barbell');
INSERT INTO exercise_category(name) VALUES ('Dumbbell');
INSERT INTO exercise_category(name) VALUES ('Machine');
INSERT INTO exercise_category(name) VALUES ('Weighted bodyweight');
INSERT INTO exercise_category(name) VALUES ('Reps only');
INSERT INTO exercise_category(name) VALUES ('Cardio');
INSERT INTO exercise_category(name) VALUES ('Duration');