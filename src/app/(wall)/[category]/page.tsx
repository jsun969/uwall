import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { InitialPosts } from '../_components/InitialPosts';
import { CATEGORIES, type CategoryValue } from '~/constants';

export const generateMetadata = ({
  params,
}: {
  params: { category: CategoryValue };
}): Metadata => {
  const categoryName =
    CATEGORIES.find(({ value }) => value === params.category)?.name ?? '404';
  return { title: categoryName };
};

const WallCategoryPage = ({
  params,
}: {
  params: { category: CategoryValue };
}) => {
  if (!CATEGORIES.map(({ value }) => value).includes(params.category)) {
    notFound();
  }

  return <InitialPosts category={params.category} />;
};

export default WallCategoryPage;
