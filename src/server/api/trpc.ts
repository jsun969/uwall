/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from '@trpc/server';
import cookie, { type CookieSerializeOptions } from 'cookie';
import { type NextRequest } from 'next/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { ADMIN_TOKEN_COOKIE_NAME } from '~/constants';
import { jwt } from '~/lib/jwt';
import { db } from '~/server/db';

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

interface CreateContextOptions {
  headers: Headers;
  resHeaders: Headers;
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  // https://www.answeroverflow.com/m/1165005090562789416
  const cookies = {
    get: (name?: string) => {
      const cookiesHeader = opts.headers.get('Cookie');
      if (!cookiesHeader) return null;
      const cookies = cookie.parse(cookiesHeader);
      return name ? cookies[name] ?? null : cookies;
    },
    has: (name: string) => {
      const cookiesHeader = opts.headers.get('Cookie');
      if (!cookiesHeader) return false;
      const cookies = cookie.parse(cookiesHeader);
      return name in cookies;
    },
    set: (name: string, value: string, options?: CookieSerializeOptions) => {
      opts.resHeaders.append(
        'Set-Cookie',
        cookie.serialize(name, value, options),
      );
    },
    clear: (name: string) => {
      opts.resHeaders.append(
        'Set-Cookie',
        cookie.serialize(name, '', { maxAge: -1 }),
      );
    },
  };

  return {
    headers: opts.headers,
    db,
    cookies,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: {
  req: NextRequest;
  resHeaders: Headers;
}) => {
  // Fetch stuff that depends on the request

  return createInnerTRPCContext({
    headers: opts.req.headers,
    resHeaders: opts.resHeaders,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  const adminToken = ctx.cookies.get(ADMIN_TOKEN_COOKIE_NAME);
  const isAdmin = adminToken ? await jwt.verify(adminToken as string) : false;
  if (!isAdmin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: '管理员验证失败',
    });
  }
  return next();
});
