import { z } from 'zod';

export const adminSchema = {
  updateConfig: z.object({
    school: z.string(),
  }),
};
