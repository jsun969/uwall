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
});
