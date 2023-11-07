'use client';

import { Logout } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

import { ADMIN_TOKEN_COOKIE_NAME } from '~/constants';
import { useConfirm } from '~/hooks/use-confirm';

export const AdminHeader = () => {
  const router = useRouter();
  const confirmLogout = useConfirm({
    title: '确定登出？',
    description: '你确定要退出登录吗？',
    onConfirm: () => {
      cookie.remove(ADMIN_TOKEN_COOKIE_NAME);
      router.push('/admin/login');
    },
  });

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          管理员后台
        </Typography>
        <Tooltip title="退出登录">
          <IconButton size="large" color="inherit" onClick={confirmLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
