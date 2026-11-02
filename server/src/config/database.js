import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let prismaInstance;

try {
  prismaInstance = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
} catch (err) {
  console.warn('Prisma client not yet generated or DB unavailable:', err.message);
  prismaInstance = null;
}

export const prisma = prismaInstance;
export default prisma;
