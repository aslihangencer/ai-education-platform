import pg from 'pg';

const { Pool } = pg;

// Direct port 5432 kullan
const connectionString = 'postgresql://postgres:EgitimSaaS2026@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

try {
  const client = await pool.connect();
  console.log('✅ Bağlantı BAŞARILI (Direct 5432)!');
  const result = await client.query('SELECT NOW()');
  console.log('Veritabanı Zamanı:', result.rows[0]);
  client.release();
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('❌ Bağlantı BAŞARISIZ:', err.message);
  await pool.end();
  process.exit(1);
}
