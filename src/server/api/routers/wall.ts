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
  addLike: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.post.update({
        where: { id: input.id },
        data: { likes: { increment: 1 } },
      });
    }),
  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const comments = await ctx.db.comment.findMany({
        where: { postId: input.postId },
        take: PAGE_SIZE + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'asc' },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (comments.length > PAGE_SIZE) {
        const nextComment = comments.pop();
        nextCursor = nextComment!.id;
      }
      return { comments, nextCursor };
    }),
  createComment: publicProcedure
    .input(
      z.union([wallSchema.createComment, wallSchema.createAnonymousComment]),
    )
    .mutation(async ({ input, ctx }) => {
      const { postId, ...data } = input;
      return await ctx.db.comment.create({
        data: {
          ...data,
          post: { connect: { id: postId } },
        },
      });
    }),
  addCommentLike: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.comment.update({
        where: { id: input.id },
        data: { likes: { increment: 1 } },
      });
    }),
});
