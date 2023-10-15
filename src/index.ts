import express from 'express';
import bodyParser from 'body-parser';
import { Exercise } from './types.js';
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

app.get('/logs', (req, res) => {
  res.json(exercises);
});

app.get('/exercise-categories', async (req, res) => {
  const results = await db.query('SELECT * from exercise_category');
  res.json(results.rows);
});

app.get('/exercises', async (req, res) => {
  const results = await db.query('SELECT * from exercise');
  res.json(results.rows);
});

app.post('/exercises', async (req, res) => {
  const { name, categoryId, bodyPartId, icon, notes, video } = req.body as Exercise;

  try {
    await db.query('INSERT INTO exercise(name, body_part_id) VALUES($1, $2)', [name, bodyPartId]);
  } catch (err) {
    console.log(err);
  }

  res.json(null);
});

app.listen(3000);
