import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import { Exercise, Log } from './types.js';
import { db } from './database.js';
// import { client } from './database';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getUserByEmail = async (email: string) => {
  return db
    .selectFrom('users')
    .where('email', '=', email)
    .select(['salt', 'password'])
    .executeTakeFirstOrThrow();
};

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await db
        .selectFrom('users')
        .where('email', '=', username)
        .select(['salt', 'password'])
        .executeTakeFirstOrThrow();

      if (!user) {
        throw new Error('No user found');
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        function (error, hashedPassword) {
          if (error) {
            return cb(error);
          }
          // @ts-expect-error user.password needs to be an ArrayBufferView?
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return cb(null, false, {
              message: 'Incorrect username or password.',
            });
          }
          return cb(null, user);
        }
      );
    } catch (error) {
      cb(error);
    }
  })
);

app.get('/login-success', (req, res) => res.json({ ya: '123' }));

app.get('/login-failure', (req, res) => res.json({ na: '123' }));

app.post(
  '/login/password',
  passport.authenticate('local', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failure',
  })
);

app.post('/auth/register', async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  console.log('a', password);
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    password,
    salt,
    310000,
    32,
    'sha256',
    async (error, hashedPassword) => {
      if (error) return next(error);

      console.log('YAAAAA');

      const { insertId } = await db
        .insertInto('users')
        .values({
          email,
          salt,
          // @ts-expect-error ArrayBufferView thing again
          password: hashedPassword,
          first_name: firstName,
          last_name: lastName,
        })
        .executeTakeFirstOrThrow();

      req.login(
        {
          id: insertId,
          username: email,
        },
        function (err) {
          if (err) {
            return next(err);
          }

          console.log('logged in');
          // res.redirect('/');
        }
      );
    }
  );
});

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
