import { Button } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';

import { api } from '~/utils/api';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>校园万能墙</title>
      </Head>
      <main>
        <p>{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>
        <Button variant="contained">test</Button>
      </main>
    </>
  );
};

export default Home;
