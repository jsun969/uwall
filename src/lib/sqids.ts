import Sqids from 'sqids';

import { env } from '~/env.mjs';

export const sqids = new Sqids({
  alphabet: env.NEXT_PUBLIC_SQIDS_ALPHABET,
  minLength: 8,
});
