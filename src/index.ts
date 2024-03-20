import express from 'express';
import bodyParser from 'body-parser';
import { Exercise, Log } from './types.js';
import * as db from './database.js';
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
  const results = await db.query('SELECT * from exercise_category');
  res.json(results.rows);
});

app.get('/exercises', async (req, res) => {
  const results = await db.query('SELECT * from exercise');
  res.json(results.rows);
});

app.get('/logs', async (req, res) => {
  const results = await db.query('SELECT * from log');
  res.json(results.rows);
});

/**
 * TODO:
 * - Finish this function
 * - Utilise TIMESTAMP and enum type in database
 * - use DEFAULT for date_end
 */
app.post('/logs', async (req, res) => {
  const { name, dateStart, dateEnd, notes, exercises } = req.body as Log;
  const results = await db.query(
    `
      INSERT INTO log(name, date_start, date_end, notes) VALUES($1, $2, $3, $4);
    `,
    [name, dateStart, dateEnd || new Date().toISOString(), notes]
  );
  res.json(results.rows);
});

app.post('/exercises', async (req, res) => {
  const { name, categoryId, bodyPartId, icon, notes, video } =
    req.body as Exercise;

  try {
    await db.query('INSERT INTO exercise(name, body_part_id) VALUES($1, $2)', [
      name,
      bodyPartId,
    ]);
  } catch (err) {
    console.log(err);
  }

  res.json(null);
});

app.listen(3000);
