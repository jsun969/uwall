import cookies from 'js-cookie';

import { ADMIN_TOKEN_COOKIE_NAME } from '~/constants';
import { api } from '~/trpc/react';

const haveAdminCookie = cookies.get(ADMIN_TOKEN_COOKIE_NAME) !== undefined;
export const useIsAdmin = () => {
  if (!haveAdminCookie) {
    return false;
  }
  const { data, isError } = api.admin.auth.useQuery(undefined, {
    enabled: haveAdminCookie,
  });
  if (isError) {
    cookies.remove(ADMIN_TOKEN_COOKIE_NAME);
    return false;
  }
  return data?.isAdmin ?? false;
};
