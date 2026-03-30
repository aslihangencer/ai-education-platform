import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL;

async function testConnection() {
  console.log('Testing connection to:', url?.replace(/:.*@/, ':****@'));
  const client = new Client({
    connectionString: url,
  });

  try {
    await client.connect();
    console.log('SUCCESS: Connected to PostgreSQL/Supabase!');
    const res = await client.query('SELECT NOW()');
    console.log('Database Time:', res.rows[0].now);
  } catch (err) {
    console.error('FAILURE: Connection failed!');
    console.error(err);
  } finally {
    await client.end();
  }
}

testConnection();
