import { Box, Typography, Link } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';

import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>校园万能墙</title>
      </Head>
      <Box
        sx={{
          textAlign: 'center',
          marginTop: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Typography variant="h4">内测中，欢迎站长注册</Typography>
        <Typography>
          QQ群：
          <Link href="https://jq.qq.com/?_wv=1027&k=MSNyMu0O">153535519</Link>
        </Typography>
      </Box>
    </Layout>
  );
};

export default Home;
