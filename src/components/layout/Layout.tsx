import { AccountCircle } from '@mui/icons-material';
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { authingSignIn } from '../../utils/authingSignIn';
import TitleWithGitHub from './TitleWithGitHub';
import UserMenu from './UserMenu';

const Layout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <TitleWithGitHub title="校园万能墙" />
          {status === 'authenticated' ? (
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => setUserMenuAnchorEl(e.currentTarget)}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => authingSignIn()}>
              登录 / 注册
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <UserMenu
        anchorEl={userMenuAnchorEl}
        onClose={() => setUserMenuAnchorEl(null)}
      />
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
