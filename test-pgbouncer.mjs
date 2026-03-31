import pg from 'pg';

const { Pool } = pg;

// pgbouncer (6543) için doğru format: postgres.project_id
const connectionString = 'postgresql://postgres.mcyipbdsslqiazkxylur:EgitimSaaS2026@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

try {
  const client = await pool.connect();
  console.log('✅ Bağlantı BAŞARILI (pgbouncer 6543)!');
  const result = await client.query('SELECT NOW()');
  console.log('✨ Veritabanı Zamanı:', result.rows[0]);
  console.log('\n🎯 Doğru DATABASE_URL:');
  console.log('postgresql://postgres.mcyipbdsslqiazkxylur:EgitimSaaS2026@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require');
  client.release();
  await pool.end();
  process.exit(0);
} catch (err) {
  console.error('❌ Hata:', err.message);
  await pool.end();
  process.exit(1);
}
