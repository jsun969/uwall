import type { NextPage } from 'next';

import LayoutWall from '../../components/layout/LayoutWall';

const WallPage: NextPage<{ schoolURL: string }> = ({ schoolURL }) => {
  return (
    <LayoutWall title="学校名万能墙">
      <div>SCHOOL_URL: {schoolURL}</div>
    </LayoutWall>
  );
};

WallPage.getInitialProps = async ({ query }) => {
  const { school: schoolURL } = query as { school: string };
  return { schoolURL };
};

export default WallPage;
