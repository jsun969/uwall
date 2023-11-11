import { z } from 'zod';

import { wallSchema } from '../schema/wall';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '~/server/db';

export const wallRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(z.union([wallSchema.createPost, wallSchema.createAnonymousPost]))
    .mutation(async ({ input }) => {
      return await db.post.create({ data: input });
    }),
  createLovePost: publicProcedure
    .input(
      z.union([wallSchema.createLovePost, wallSchema.createAnonymousLovePost]),
    )
    .mutation(async ({ input }) => {
      return await db.lovePost.create({ data: input });
    }),
});
