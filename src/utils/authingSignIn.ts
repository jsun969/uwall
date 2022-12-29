import { signIn } from 'next-auth/react';

export const authingSignIn = () => {
  signIn('authing', { callbackUrl: '/console' });
};
