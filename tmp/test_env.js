const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing Prisma connection...');
    const userCount = await prisma.user.count();
    console.log(`Connection successful. Total users: ${userCount}`);
    
    console.log('Testing Environment Variables...');
    console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`);
    console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'Exists' : 'Missing'}`);
    console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? 'Exists' : 'Missing'}`);
    
  } catch (e) {
    console.error('Error during testing:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
