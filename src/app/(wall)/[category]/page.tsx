import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CATEGORIES, type CategoryValue } from '~/constants';
import { db } from '~/server/db';

export const generateMetadata = async ({
  params,
}: {
  params: { category: CategoryValue };
}): Promise<Metadata> => {
  const config = (await db.config.findFirst())!;
  const categoryName =
    CATEGORIES.find(({ value }) => value === params.category)?.name ?? '404';
  return { title: `${config.school}万能墙 - ${categoryName}` };
};

const WallCategoryPage = ({
  params,
}: {
  params: { category: CategoryValue };
}) => {
  if (!CATEGORIES.map(({ value }) => value).includes(params.category)) {
    notFound();
  }

  return <div>WallCategoryPage {params.category}</div>;
};

export default WallCategoryPage;
