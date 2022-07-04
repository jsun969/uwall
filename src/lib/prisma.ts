import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  db = (global as any).prisma;
}

export default db;
