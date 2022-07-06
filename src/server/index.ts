import { createRouter } from './create-router';
import { hello } from './routers/hello';

export const appRouter = createRouter().merge(hello);

export type AppRouter = typeof appRouter;
