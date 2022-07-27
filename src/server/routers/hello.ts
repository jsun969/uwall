import { createRouter } from '../createRouter';
import { z } from 'zod';

export const hello = createRouter().query('hello', {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? 'world'}`,
    };
  },
});
