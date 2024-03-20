ALTER TABLE exercise ADD CONSTRAINT body_part_id_fk FOREIGN KEY (body_part_id) REFERENCES body_part(id);

-- name must be unique
ALTER TABLE exercise ADD CONSTRAINT unique_name UNIQUE(name);
-- use CHECK constraint for validation