import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    ADMIN_USERNAME: z.string(),
    ADMIN_PASSWORD_HASH: z.string(),
    JWT_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SQIDS_ALPHABET: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NEXT_PUBLIC_SQIDS_ALPHABET: process.env.NEXT_PUBLIC_SQIDS_ALPHABET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
