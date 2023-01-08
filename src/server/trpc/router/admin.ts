import { consoleFormSchema } from '../../../pages/console';
import { protectedProcedure, router } from '../trpc';

export const adminRouter = router({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { email: ctx.email },
    });
    return {
      isSuper: ctx.role === 'super',
      activeExpires: user!.activeExpires,
    };
  }),
  updateWall: protectedProcedure
    .input(consoleFormSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.school.update({
        where: { userEmail: ctx.email },
        data: input,
      });
    }),
});
