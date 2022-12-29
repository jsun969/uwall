import { Email, Logout, Tune } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { env } from '../../env/client.mjs';
import theme from '../../lib/theme';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const UserMenu = ({ anchorEl, onClose }: UserMenuProps) => {
  const { data: session } = useSession();

  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem divider>
        <ListItemIcon>
          <Email fontSize="small" />
        </ListItemIcon>
        {session?.user?.email}
      </MenuItem>
      <Link
        href="console"
        style={{ textDecoration: 'none', color: theme.palette.text.primary }}
      >
        <MenuItem>
          <ListItemIcon>
            <Tune fontSize="small" />
          </ListItemIcon>
          控制台
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
