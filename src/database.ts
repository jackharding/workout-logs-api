import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

export const queryDb = async () => {
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM body_part');
    console.log('res', res);
    return res;
  } catch (error) {
    console.log('ERR!', error);
  }
};
