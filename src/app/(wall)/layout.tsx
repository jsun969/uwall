import { Header } from '../_components/Header';
import { PostButton } from './_components/PostButton';
import { db } from '~/server/db';

const WallLayout = async ({ children }: { children: React.ReactNode }) => {
  const config = (await db.config.findFirst())!;

  return (
    <>
      <Header config={config} showTabs />
      {children}
      <PostButton />
    </>
  );
};

export default WallLayout;
