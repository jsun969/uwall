import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

import { env } from '~/env.mjs';

const key = new TextEncoder().encode(env.JWT_SECRET_KEY);

const sign = async () => {
  return await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
};

const verify = async (token: string) => {
  try {
    await jwtVerify(token, key);
    return true;
  } catch (error) {
    return false;
  }
};

export const jwt = { sign, verify };
