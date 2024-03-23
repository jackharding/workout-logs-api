WITH new_log AS (
  INSERT INTO log(name, date_start, date_end) VALUES('once more', NOW() - INTERVAL '1 hour', NOW()) RETURNING id
)
INSERT INTO log_exercise(exercise_id, log_id, notes) VALUES(1, (SELECT id FROM new_log), 'notes');