/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: DB connection fails when I move this to index.ts
import 'dotenv/config';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import pg, { QueryResult } from 'pg';

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});

// export const query = async (
//   queryText: string,
//   values?: any[]
// ): Promise<QueryResult> => {
//   const start = Date.now();

//   const res = await pool.query(queryText, values);
//   const duration = Date.now() - start;

//   console.log('executed query', { queryText, duration, rows: res.rowCount });
//   return res;
// };

// export const connectToDatabase = async () => {
//   try {
//     await client.connect();
//   } catch (err) {
//     console.error('data connect error', err);
//   }
// };

// export const queryDb = async () => {
//   try {
//     const res = await client.query('SELECT * FROM body_part');
//     console.log('res', res);
//     return res;
//   } catch (error) {
//     console.log('ERR!', error);
//   }
// };
