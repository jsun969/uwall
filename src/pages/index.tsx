import { QuestionAnswer } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { POST_CATEGORIES } from '~/constants';
import { env } from '~/env.mjs';
import { api } from '~/utils/api';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });
  const [tab, setTab] = useState('all');

  return (
    <>
      <Head>
        <title>{env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <header>
        <AppBar position="sticky">
          <Toolbar>
            <QuestionAnswer sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {env.NEXT_PUBLIC_NAME}
            </Typography>
            <Button color="inherit">后台登录</Button>
          </Toolbar>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
          >
            {[{ name: 'all', label: '全部' }, ...POST_CATEGORIES].map(
              (category) => (
                <Tab
                  key={category.name}
                  label={category.label}
                  value={category.name}
                />
              ),
            )}
          </Tabs>
        </AppBar>
      </header>
      <Container maxWidth="sm" component="main">
        <p>{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>
        <Button variant="contained">test</Button>
      </Container>
    </>
  );
};

export default Home;
