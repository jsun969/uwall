import {
  Email,
  Logout,
  RemoveModerator,
  Tune,
  VerifiedUser,
} from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { env } from '../../env/client.mjs';
import theme from '../../lib/theme';
import { trpc } from '../../lib/trpc';
import { checkUserActive } from '../../server/utils/checkUserActive';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const UserMenu = ({ anchorEl, onClose }: UserMenuProps) => {
  const { data: session } = useSession();
  const { data: userInfo } = trpc.admin.getUserInfo.useQuery();

  const activeExpiresDayjs = dayjs(userInfo?.activeExpires);
  const isActive = checkUserActive(activeExpiresDayjs);

  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem divider={userInfo?.isSuper}>
        <ListItemIcon>
          <Email fontSize="small" />
        </ListItemIcon>
        {session?.user?.email}
      </MenuItem>
      {!userInfo?.isSuper && (
        <MenuItem divider>
          {isActive ? (
            <>
              <ListItemIcon>
                <VerifiedUser fontSize="small" />
              </ListItemIcon>
              激活至 {activeExpiresDayjs.format('YYYY/MM/DD')}
            </>
          ) : (
            <>
              <ListItemIcon>
                <RemoveModerator fontSize="small" />
              </ListItemIcon>
              未激活
            </>
          )}
        </MenuItem>
      )}
      <Link
        href={userInfo?.isSuper ? '/super' : '/console'}
        style={{ textDecoration: 'none', color: theme.palette.text.primary }}
      >
        <MenuItem>
          <ListItemIcon>
            <Tune fontSize="small" />
          </ListItemIcon>
          {userInfo?.isSuper ? '超级管理员后台' : '控制台'}
        </MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          signOut();
          // FIXME Next Auth OpenID 需要手动登出
          // https://github.com/nextauthjs/next-auth/discussions/3938
          window.location.href = env.NEXT_PUBLIC_AUTHING_SIGN_OUT;
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        退出登录
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
