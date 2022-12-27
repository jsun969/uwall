import { AccountCircle, Email, Logout, Tune } from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { env } from '../env/client.mjs';

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            校园万能墙
          </Typography>
          {status === 'authenticated' ? (
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => setUserMenuAnchorEl(e.currentTarget)}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => signIn('authing')}>
              登录 / 注册
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={userMenuAnchorEl}
        open={!!userMenuAnchorEl}
        onClose={() => setUserMenuAnchorEl(null)}
      >
        <MenuItem divider>
          <ListItemIcon>
            <Email fontSize="small" />
          </ListItemIcon>
          {session?.user?.email}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Tune fontSize="small" />
          </ListItemIcon>
          控制台
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            // FIXME 需要访问登出链接使账号完全登出
            window.location.href = env.NEXT_PUBLIC_AUTHING_SIGN_OUT;
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          退出登录
        </MenuItem>
      </Menu>
      {children}
    </>
  );
};

export default Layout;
