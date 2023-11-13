import { Posts, type InitialGetPostsData } from './Posts';
import { type CategoryValue } from '~/constants';
import { api } from '~/trpc/server';

export const InitialPosts = async ({
  category,
}: {
  category?: CategoryValue;
}) => {
  const getPost = await api.wall.getPosts.query({
    category,
  });
  const initialGetPostsData = {
    pages: [getPost],
    pageParams: [],
  } satisfies InitialGetPostsData;

  return (
    <Posts initialGetPostsData={initialGetPostsData} category={category} />
  );
};
