import { z } from 'zod';

import { wallSchema } from '../schema/wall';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const wallRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(z.union([wallSchema.createPost, wallSchema.createAnonymousPost]))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.post.create({ data: input });
    }),
  createLovePost: publicProcedure
    .input(
      z.union([wallSchema.createLovePost, wallSchema.createAnonymousLovePost]),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.post.create({ data: { category: 'love', ...input } });
    }),
});
