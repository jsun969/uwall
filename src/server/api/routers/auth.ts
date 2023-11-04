import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';

import { authSchema } from '../schema/auth';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { env } from '~/env.mjs';
import { jwt } from '~/lib/jwt';

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(authSchema.login).mutation(async ({ input }) => {
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
    return { token };
  }),
});
