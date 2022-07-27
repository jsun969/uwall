import { createRouter } from './createRouter';
import { hello } from './routers/hello';

export const appRouter = createRouter().merge(hello);

export type AppRouter = typeof appRouter;
