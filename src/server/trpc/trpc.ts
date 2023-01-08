import { initTRPC, TRPCError } from '@trpc/server';
import dayjs from 'dayjs';
import superjson from 'superjson';

import { prisma } from '../db/client';
import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  if (ctx.role !== 'super') {
    const user = await prisma.user.findUnique({
      where: { email: ctx.session!.user!.email! },
      select: { activeExpires: true },
    });
    const isActive = dayjs().isBefore(user?.activeExpires);
    if (!isActive) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  }
  return next({ ctx: { email: ctx.session.user.email!, ...ctx } });
});

export const protectedProcedure = t.procedure.use(isAuthed);

const isSuperAdmin = t.middleware(({ ctx, next }) => {
  if (ctx.role !== 'super') {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const superProtectedProcedure = t.procedure.use(isSuperAdmin);
