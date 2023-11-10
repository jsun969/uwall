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
import { type Config } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

import { CATEGORIES } from '~/constants';

const tabs = [
  { name: '全部', path: '/' },
  ...CATEGORIES.map((category) => ({
    name: category.name,
    path: '/' + category.value,
  })),
];

export const Header = ({
  config,
  showTabs,
}: {
  config: Config;
  showTabs?: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AppBar position="sticky">
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
            <Typography variant="h6">{config?.school}万能墙</Typography>
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
