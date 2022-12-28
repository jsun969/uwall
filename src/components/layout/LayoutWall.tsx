import { Edit, QuestionAnswer } from '@mui/icons-material';
import {
  AppBar,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tab,
  Tabs,
  Toolbar,
} from '@mui/material';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { POST_CATEGORIES } from '../../constants';
import TitleWithGitHub from './TitleWithGitHub';

const PostButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <SpeedDial
      ariaLabel="Post button"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon openIcon={<Edit />} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {POST_CATEGORIES.map((category) => (
        <SpeedDialAction
          key={category.name}
          icon={category.icon}
          tooltipTitle={category.label}
          tooltipOpen
        />
      ))}
    </SpeedDial>
  );
};

interface LayoutWallProps {
  title: string;
  children: ReactNode;
}

const LayoutWall = ({ title, children }: LayoutWallProps) => {
  const [tab, setTab] = useState('all');

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <TitleWithGitHub title={title} />
        </Toolbar>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
        >
          {[
            { name: 'all', label: '全部', icon: <QuestionAnswer /> },
            ...POST_CATEGORIES,
          ].map((category) => (
            <Tab
              key={category.name}
              label={category.label}
              value={category.name}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </AppBar>
      <Container maxWidth="sm">{children}</Container>
      <PostButton />
    </>
  );
};

export default LayoutWall;
