import { trpc } from '../lib/trpc';
import { Button } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'world' }]);

  return (
    <div>
      <Head>
        <title>万能墙</title>
        <meta name="description" content="万能墙" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button variant="contained">TEST</Button>
        {isLoading ? <div>loading...</div> : <div>{data?.greeting}</div>}
      </main>
    </div>
  );
};

export default Index;
