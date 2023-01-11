import { consoleFormSchema } from '../../../pages/console';
import { p } from '../../db/client';
import { adminProcedure, router, unexpiredAdminProcedure } from '../trpc';

export const adminRouter = router({
  getUserInfo: adminProcedure.query(async ({ ctx }) => {
    const user = await p.user.findUnique({
      where: { email: ctx.email },
    });
    return {
      isSuper: ctx.role === 'super',
      activeExpires: user!.activeExpires,
    };
  }),
  updateWall: unexpiredAdminProcedure
    .input(consoleFormSchema)
    .mutation(async ({ ctx, input }) => {
      await p.school.update({
        where: { userEmail: ctx.email },
        data: input,
      });
    }),
});
