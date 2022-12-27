import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';

import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: 'authing',
      name: 'AuthingProvider',
      type: 'oauth',
      wellKnown: env.AUTHING_WELL_KNOWN,
      clientId: env.AUTHING_APP_ID,
      clientSecret: env.AUTHING_APP_SECRET,
      authorization: { params: { scope: 'openid email profile' } },
      idToken: true,
      profile: (profile) => ({
        id: profile.sub,
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      }),
    },
  ],
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
