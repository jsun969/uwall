import { consoleFormSchema } from '../../../pages/console';
import { p } from '../../db/client';
import { protectedProcedure, router } from '../trpc';

export const adminRouter = router({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await p.user.findUnique({
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
      await p.school.update({
        where: { userEmail: ctx.email },
        data: input,
      });
    }),
});
