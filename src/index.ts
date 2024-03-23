import express from 'express';
import bodyParser from 'body-parser';
import { Exercise, Log } from './types.js';
import { db } from './database.js';
import { buildLogExercisesQuery } from './utils/queryBuilders.js';
// import { client } from './database';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const exercises: Array<Exercise> = [
  {
    id: '11',
    name: 'Barbell Front Squat',
    categoryId: '123',
    custom: false,
    bodyPartId: '321',
  },
  {
    id: '12',
    name: 'Military Press',
    categoryId: '666',
    custom: false,
    bodyPartId: '999',
  },
];

app.get('/exercise-categories', async (req, res) => {
  const results = await db
    .selectFrom('exercise_category')
    .selectAll()
    .execute();
  res.json(results);
});

app.get('/exercises', async (req, res) => {
  const results = await db.selectFrom('exercise').selectAll().execute();
  res.json(results);
});

app.get('/logs', async (req, res) => {
  const results = await db.selectFrom('log').selectAll().execute();
  res.json(results);
});

/**
 * TODO:
 * - Finish this function
 * - Utilise TIMESTAMP and enum type in database
 * - use DEFAULT for date_end
 */
app.post('/logs', async (req, res) => {
  const { name, dateStart, dateEnd, notes, exercises } = req.body as Log;

  const { logId } = await db
    .insertInto('log')
    .values({
      name,
      notes,
      date_start: dateStart,
      date_end: dateEnd,
    })
    .returning('id as logId')
    .executeTakeFirst();

  // TODO: How do I do this using with???
  await db
    .insertInto('log_exercise')
    .values(
      exercises.map((exercise) => ({
        log_id: logId,
        exercise_id: exercise.exerciseId,
        notes: exercise.notes,
      }))
    )
    .execute();

  res.json();
});

app.post('/exercises', async (req, res) => {
  // const { name, categoryId, bodyPartId, icon, notes, video } =
  //   req.body as Exercise;

  db.insertInto('exercise')
    .values(req.body)
    .returningAll()
    .executeTakeFirstOrThrow();

  res.json(null);
});

app.listen(3000);
