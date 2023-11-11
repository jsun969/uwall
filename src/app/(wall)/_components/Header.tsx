'use client';

import { GitHub, QuestionAnswer } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { CATEGORIES } from '~/constants';

const tabs = [
  { name: '全部', path: '/' },
  ...CATEGORIES.map((category) => ({
    name: category.name,
    path: '/' + category.value,
  })),
];

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
        <IconButton color="inherit" href="https://github.com/jsun969/uwall">
          <GitHub />
        </IconButton>
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
