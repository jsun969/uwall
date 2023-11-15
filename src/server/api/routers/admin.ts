import { adminSchema } from '../schema/admin';
import { adminProcedure, createTRPCRouter } from '../trpc';

export const adminRouter = createTRPCRouter({
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
});
