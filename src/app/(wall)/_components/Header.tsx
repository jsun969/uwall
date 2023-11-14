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
import { useIsFetching } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CATEGORIES } from '~/constants';
import { api } from '~/trpc/react';

const tabs = [
  { name: '全部', path: '/' },
  ...CATEGORIES.map((category) => ({
    name: category.name,
    path: '/' + category.value,
  })),
];

const RefreshButton = () => {
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  }, [isRefreshing]);

  const isApiFetching = useIsFetching() > 0;
  useEffect(() => {
    if (isApiFetching) {
      setIsRefreshing(true);
    }
  }, [isApiFetching, isRefreshing]);
  const apiUtils = api.useUtils();

  const handleClick = async () => {
    setIsRefreshing(true);
    router.refresh();
    await apiUtils.invalidate();
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
        <RefreshButton />
      </Toolbar>
      {showTabs && (
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          value={pathname}
          indicatorColor="secondary"
        >
          {tabs.map((tab) => (
            <Tab
              label={tab.name}
              value={tab.path}
              key={tab.path}
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
