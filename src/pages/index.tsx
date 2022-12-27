import { type NextPage } from 'next';
import Head from 'next/head';

import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>校园万能墙</title>
      </Head>
      <h1 style={{ textAlign: 'center', marginTop: 300 }}>内测中</h1>
    </Layout>
  );
};

export default Home;
