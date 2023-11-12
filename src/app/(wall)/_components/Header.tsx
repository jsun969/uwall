'use client';

import { QuestionAnswer, Refresh } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CATEGORIES } from '~/constants';

const tabs = [
  { name: '全部', path: '/' },
  ...CATEGORIES.map((category) => ({
    name: category.name,
    path: '/' + category.value,
  })),
];

const RefreshButton = ({ onClick }: { onClick?: () => void }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  }, [isRefreshing]);

  const handleClick = () => {
    onClick?.();
    setIsRefreshing(true);
  };

  return (
    <Tooltip title="刷新">
      <IconButton
        color="inherit"
        onClick={isRefreshing ? undefined : handleClick}
      >
        <Refresh
          sx={{
            transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)',
            transition: isRefreshing ? 'transform 1s linear' : 'none',
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export const Header = ({ title }: { title: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const showTabs = tabs.some(({ path }) => path === pathname);

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => {
            router.push('/');
          }}
        >
          <QuestionAnswer />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ ml: 1 }}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        </Box>
        <RefreshButton
          onClick={() => {
            router.refresh();
          }}
        />
      </Toolbar>
      {showTabs && (
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          value={pathname}
          indicatorColor="secondary"
        >
          {tabs.map((tab, i) => (
            <Tab
              label={tab.name}
              value={tab.path}
              key={i}
              onClick={() => {
                router.push(tab.path);
              }}
            />
          ))}
        </Tabs>
      )}
    </AppBar>
  );
};
