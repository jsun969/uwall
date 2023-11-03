import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    ADMIN_USERNAME: z.string({
      errorMap: () => ({
        message: '请使用 pnpm run set-admin 设置管理员用户名',
      }),
    }),
    ADMIN_PASSWORD_HASH: z.string({
      errorMap: () => ({ message: '请使用 pnpm run set-admin 设置管理员密码' }),
    }),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
