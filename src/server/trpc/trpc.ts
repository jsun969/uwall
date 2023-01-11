import { initTRPC, TRPCError } from '@trpc/server';
import dayjs from 'dayjs';
import superjson from 'superjson';

import { p } from '../db/client';
import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { email: ctx.session.user.email!, ...ctx } });
});

const isUnexpiredAdmin = t.middleware(async ({ ctx, next }) => {
  if (ctx.role === 'super') {
    return next();
  }
  const user = await p.user.findUnique({
    where: { email: ctx.session!.user!.email! },
    select: { activeExpires: true },
  });
  const isActive = dayjs().isBefore(user?.activeExpires);
  if (!isActive) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

const isSuper = t.middleware(({ ctx, next }) => {
  if (ctx.role !== 'super') {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
export const unexpiredAdminProcedure = t.procedure
  .use(isAdmin)
  .use(isUnexpiredAdmin);
export const superProcedure = t.procedure.use(isSuper);
