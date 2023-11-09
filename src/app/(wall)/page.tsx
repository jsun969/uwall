import { type Metadata } from 'next';

import { db } from '~/server/db';

export const generateMetadata = async (): Promise<Metadata> => {
  const config = (await db.config.findFirst())!;
  return { title: `${config.school}万能墙` };
};

const WallPage = () => {
  return <main>WallPage</main>;
};

export default WallPage;
