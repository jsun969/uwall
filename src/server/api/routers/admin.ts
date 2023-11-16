import { z } from 'zod';

import { adminSchema } from '../schema/admin';
import { adminProcedure, createTRPCRouter } from '../trpc';

export const adminRouter = createTRPCRouter({
  auth: adminProcedure.query(() => {
    return { isAdmin: true };
  }),
  updateConfig: adminProcedure
    .input(adminSchema.updateConfig)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.config.update({
        where: { id: 1 },
        data: input,
      });
    }),
  setFooterLinks: adminProcedure
    .input(adminSchema.setFooterLinks)
    .mutation(async ({ input, ctx }) => {
      const deleteMany = ctx.db.footerLink.deleteMany({});
      if (input.links.length === 0) {
        await deleteMany;
        return { success: true };
      }
      const insertValues = input.links
        .map(({ name, link }) => `('${name}', '${link}')`)
        .join(',\n\t');
      const query = `
        INSERT INTO \`FooterLink\` (name, link) VALUES
        ${insertValues};
      `;
      const createMany = ctx.db.$executeRawUnsafe(query);
      await ctx.db.$transaction([deleteMany, createMany]);
      return { success: true };
    }),
  deletePost: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.post.delete({ where: input });
    }),
  deleteComment: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.comment.delete({ where: input });
    }),
});
