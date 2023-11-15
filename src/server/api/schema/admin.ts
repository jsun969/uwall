import { z } from 'zod';

export const adminSchema = {
  updateConfig: z.object({
    school: z.string(),
  }),
  setFooterLinks: z.object({
    links: z.array(
      z.object({
        name: z.string(),
        link: z.string().url({ message: '请输入链接' }),
      }),
    ),
  }),
};
