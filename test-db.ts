import { prisma } from './lib/prisma.js';

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS test`;
    console.log('✅ Bağlantı başarılı! Sonuç:', result);
    process.exit(0);
  } catch (err) {
    console.error('❌ Bağlantı hatası:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
