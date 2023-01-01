import { consoleFormSchema } from '../../../pages/console';
import { protectedProcedure, router } from '../trpc';

export const adminRouter = router({
  updateWall: protectedProcedure
    .input(consoleFormSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.school.update({
        where: { userEmail: ctx.session!.user!.email! },
        data: input,
      });
    }),
});
