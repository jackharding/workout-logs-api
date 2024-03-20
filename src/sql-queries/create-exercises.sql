CREATE TABLE exercise(
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  icon TEXT,
  video TEXT,
  body_part_id INT NOT NULL,
  CONSTRAINT body_part_id_fkey
  FOREIGN KEY(body_part_id)
  REFERENCES body_part(id),
  category_id INT NOT NULL,
  CONSTRAINT category_id_fkey
  FOREIGN KEY(category_id)
  REFERENCES exercise_category(id)
);

INSERT INTO exercise(name, body_part_id, category_id) VALUES('Bench Press (Barbell)', 1, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Squat (Barbell)', 2, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Front Squat (Barbell)', 2, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Overhead Press (Barbell)'3, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Curl (Barbell)', 4, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Incline Bench Press', 1, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Goblet Squat', 2, 4);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Dips', 5, 4);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Ring Dips', 5, 4);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Chin Up', 4, 4);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Pushup', 1, 4);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Leg Press', 2, 3);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Lateral Raise (Dumbbell)', 3, 2);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Waiter Curl', 4, 2);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Dumbbell Fly', 1, 2);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Tricep Extension', 5, 2);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Squat Jump', 2, 4);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Hip Thrust (Barbell)', 8, 1);
INSERT INTO exercise(name, body_part_id, category_id) VALUES('Wrist Roller', 7, 2);
