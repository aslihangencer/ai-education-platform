import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Testing DATABASE_URL...');
  console.log('URL ends with:', process.env.DATABASE_URL?.slice(-15));
  
  try {
    await prisma.$connect();
    console.log('Successfully connected to Supabase Database!');
  } catch (e) {
    console.error('CRITICAL CONNECTION ERROR:');
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
