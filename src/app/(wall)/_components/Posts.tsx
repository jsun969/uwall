'use client';

import { LoadingButton, Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import { type InfiniteData } from '@tanstack/react-query';

import { Post, type PostDataWithCommentsCount } from './Post';
import { type CategoryValue } from '~/constants';
import { api } from '~/trpc/react';

export type InitialGetPostsData = InfiniteData<{
  posts: PostDataWithCommentsCount[];
  nextCursor: number | undefined;
}>;
export const Posts = ({
  initialGetPostsData,
  category,
}: {
  initialGetPostsData: InitialGetPostsData;
  category?: CategoryValue;
}) => {
  const getPosts = api.wall.getPosts.useInfiniteQuery(
    { category },
    {
      initialData: initialGetPostsData,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const postsInAllPages =
    getPosts.data?.pages.flatMap(({ posts }) => posts) ?? [];

  return (
    <Box sx={{ pl: 2 }}>
      <Masonry spacing={2} columns={{ lg: 3, sm: 2, xs: 1 }}>
        {postsInAllPages.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </Masonry>
      {getPosts.hasNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            loading={getPosts.isFetchingNextPage}
            onClick={() => getPosts.fetchNextPage()}
          >
            加载更多
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
};
