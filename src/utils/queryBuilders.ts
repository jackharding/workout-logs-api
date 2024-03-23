import { Log } from '../types.js';

export const buildLogExercisesQuery = (
  newLogAlias: string,
  exercises: Log['exercises']
) => {
  let query = '';

  for (let index = 0; index < exercises.length; index++) {
    const exercise = exercises[index];

    query += `
      INSERT INTO log_exercise(exercise_id, log_id, notes) VALUES(${exercise.exerciseId}, (SELECT id FROM ${newLogAlias}), '${exercise.notes}');
    `;
  }

  return query;
};
