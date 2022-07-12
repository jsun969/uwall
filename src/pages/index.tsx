import Layout from '../components/layouts/Layout';
import type { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <Layout
      categories={[
        { id: 'expand', name: '扩列' },
        { id: 'notice', name: '通知' },
        { id: 'complaint', name: '吐槽' },
      ]}
      selectedCategory="all"
    >
      <h1>还没写</h1>
    </Layout>
  );
};

export default Index;
