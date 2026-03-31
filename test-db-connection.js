const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:EgitimSaaS2026@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require';

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect(async (err, client, release) => {
  if (err) {
    console.error('❌ Bağlantı BAŞARISIZ:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Bağlantı BAŞARILI!');
    const result = await client.query('SELECT NOW()');
    console.log('Veritabanı Zamanı:', result.rows[0]);
    release();
    pool.end();
  }
});
