import { type GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { env } from '../../env/server.mjs';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export type Role = 'super' | 'admin';

export const getServerAuth = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions,
  );
  const role: Role =
    session?.user?.email === env.SUPER_ADMIN_EMAIL ? 'super' : 'admin';

  return { session, role };
};
