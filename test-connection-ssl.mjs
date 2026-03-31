import pg from 'pg';

const { Pool } = pg;

const connectionString = 'postgresql://postgres:EgitimSaaS2026@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, // SSL sertifikası doğrulamasını bypass et
  },
});

try {
  const client = await pool.connect();
  console.log('✅ Bağlantı BAŞARILI (SSL bypass ile)!');
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
