import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';

import { authSchema } from '../schema/auth';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { ADMIN_TOKEN_COOKIE_NAME } from '~/constants';
import { env } from '~/env.mjs';
import { jwt } from '~/lib/jwt';

const SEVEN_DAYS_IN_SECONDS = 60_4800;

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(authSchema.login)
    .mutation(async ({ input, ctx }) => {
      const isPasswordCorrect = await argon2.verify(
        env.ADMIN_PASSWORD_HASH,
        input.password,
      );
      const isUsernameCorrect = input.username === env.ADMIN_USERNAME;
      const isAdmin = isPasswordCorrect && isUsernameCorrect;
      if (!isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: '用户名或密码错误',
        });
      }
      const token = await jwt.sign();
      ctx.cookies.set(ADMIN_TOKEN_COOKIE_NAME, token, {
        maxAge: SEVEN_DAYS_IN_SECONDS,
        path: '/',
      });
      return { success: true };
    }),
});
