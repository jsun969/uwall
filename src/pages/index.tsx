import { Button } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';

import { env } from '~/env.mjs';
import { api } from '~/utils/api';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>{env.NEXT_PUBLIC_NAME}</title>
      </Head>
      <main>
        <p>{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>
        <Button variant="contained">test</Button>
      </main>
    </>
  );
};

export default Home;
