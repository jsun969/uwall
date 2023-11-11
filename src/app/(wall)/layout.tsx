import { type Metadata } from 'next';

import { Header } from './_components/Header';
import { PostButton } from './_components/PostButton';
import { db } from '~/server/db';

export const generateMetadata = async (): Promise<Metadata> => {
  const config = (await db.config.findFirst())!;
  return { title: `${config.school}万能墙` };
};

const WallLayout = async ({ children }: { children: React.ReactNode }) => {
  const config = (await db.config.findFirst())!;

  return (
    <>
      <Header title={`${config.school}万能墙`} />
      {children}
      <PostButton />
    </>
  );
};

export default WallLayout;
