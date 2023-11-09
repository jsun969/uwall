import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CATEGORIES } from '~/constants';
import { db } from '~/server/db';

export const generateMetadata = async ({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> => {
  const config = (await db.config.findFirst())!;
  const categoryName =
    CATEGORIES.find(({ path }) => path === params.category)?.name ?? '404';
  return { title: `${config.school}万能墙 - ${categoryName}` };
};

const WallCategoryPage = ({ params }: { params: { category: string } }) => {
  if (!CATEGORIES.map(({ path }) => path).includes(params.category)) {
    notFound();
  }

  return <div>WallCategoryPage {params.category}</div>;
};

export default WallCategoryPage;
