import { PrismaClient } from '@prisma/client';

import { env } from '../../env/server.mjs';

const globalForPrisma = global as unknown as { p: PrismaClient };

export const p =
  globalForPrisma.p ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.p = p;
}
