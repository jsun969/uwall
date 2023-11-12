'use client';

import { LoadingButton } from '@mui/lab';
import { Box, Container, Grid } from '@mui/material';
import { type InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Post, type PostDataWithCommentsCount } from './Post';
import { type CategoryValue } from '~/constants';
import { api } from '~/trpc/react';

export type InitialGetPostsData = InfiniteData<{
  posts: PostDataWithCommentsCount[];
  nextCursor: string | undefined;
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
  const utils = api.useUtils();
  useEffect(() => {
    void (async () => {
      await utils.wall.getPosts.cancel({ category });
      utils.wall.getPosts.setInfiniteData(
        { category },
        () => initialGetPostsData,
      );
    })();
  }, [initialGetPostsData, category]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignContent="stretch">
        {getPosts.data?.pages.map((page) =>
          page.posts.map((post) => (
            <Grid item lg={4} sm={6} xs={12} key={post.id}>
              <Post post={post} />
            </Grid>
          )),
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <LoadingButton
          variant="contained"
          color="secondary"
          size="large"
          loading={getPosts.isFetchingNextPage}
          onClick={() => getPosts.fetchNextPage()}
          disabled={!getPosts.hasNextPage}
        >
          加载更多
        </LoadingButton>
      </Box>
    </Container>
  );
};
