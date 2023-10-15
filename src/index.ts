import express from 'express';
import bodyParser from 'body-parser';
import { Exercise } from './types';
import { queryDb } from './database.js';
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
  queryDb();
  res.json(exercises);
});

app.post('/exercises', (req, res) => {
  const { name, categoryId, bodyPartId, icon, notes, video } = req.body as Exercise;

  exercises.push({
    id: '123123',
    custom: false,
    name,
    categoryId,
    bodyPartId,
    icon,
    notes,
    video,
  });

  res.json(exercises);
});

app.listen(3000);
