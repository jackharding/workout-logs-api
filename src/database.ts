/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: DB connection fails when I move this to index.ts
import 'dotenv/config';
import pg, { QueryResult } from 'pg';

const pool = new pg.Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export const query = async (queryText: string, values?: any[]): Promise<QueryResult> => {
  const start = Date.now();

  const res = await pool.query(queryText, values);
  const duration = Date.now() - start;

  console.log('executed query', { queryText, duration, rows: res.rowCount });
  return res;
};

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
