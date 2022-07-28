import { Category, GitHub, Menu, Rule, Settings } from '@mui/icons-material';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const adminNavList = [
  { icon: <Settings />, text: '站点设置', path: '' },
  { icon: <Rule />, text: '内容审核', path: '/review' },
  { icon: <Category />, text: '分类管理', path: '/category' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { asPath: currentPath } = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <Head>
        <title>XXX万能墙 - 管理员后台</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setIsNavOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            XXX万能墙 - 管理员后台
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            edge="end"
            onClick={() => window.open('https://github.com/jsun969/uwall')}
          >
            <GitHub />
          </IconButton>
        </Toolbar>
        <Drawer
          anchor="left"
          open={isNavOpen}
          onClose={() => setIsNavOpen(false)}
        >
          <List sx={{ width: 200 }}>
            {adminNavList.map((nav, index) => (
              <ListItem key={index} disablePadding>
                <Link href={'/admin' + nav.path}>
                  <ListItemButton
                    selected={currentPath === '/admin' + nav.path}
                  >
                    <ListItemIcon>{nav.icon}</ListItemIcon>
                    <ListItemText primary={nav.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
