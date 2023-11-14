import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { InitialPosts } from '../_components/InitialPosts';
import { CATEGORIES, type CategoryValue } from '~/constants';

interface WallCategoryPageProps {
  params: { category: CategoryValue };
}

export const generateMetadata = ({
  params,
}: WallCategoryPageProps): Metadata => {
  const categoryName =
    CATEGORIES.find(({ value }) => value === params.category)?.name ?? '404';
  return { title: categoryName };
};

const WallCategoryPage = ({ params }: WallCategoryPageProps) => {
  if (!CATEGORIES.map(({ value }) => value).includes(params.category)) {
    notFound();
  }

  return <InitialPosts category={params.category} />;
};

export default WallCategoryPage;
