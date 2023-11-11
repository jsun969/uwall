import { notFound } from 'next/navigation';

import { NewPost } from './_components/NewPost';
import { CATEGORIES } from '~/constants';

const NewPostPage = ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  if (!CATEGORIES.map(({ value }) => value).includes(searchParams.category)) {
    notFound();
  }

  return <NewPost />;
};

export default NewPostPage;
