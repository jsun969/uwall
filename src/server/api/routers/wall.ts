import { z } from 'zod';

import { wallSchema } from '../schema/wall';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { PAGE_SIZE } from '~/constants';

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
  getPosts: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        category: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const posts = await ctx.db.post.findMany({
        where: { category: input.category },
        include: {
          _count: { select: { comments: true } },
        },
        take: PAGE_SIZE + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (posts.length > PAGE_SIZE) {
        const nextPost = posts.pop();
        nextCursor = nextPost!.id;
      }
      return { posts, nextCursor };
    }),
});
