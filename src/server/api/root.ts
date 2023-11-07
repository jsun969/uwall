import { adminRouter } from './routers/admin';
import { authRouter } from './routers/auth';
import { createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
