'use client';

import { LoadingButton, Masonry } from '@mui/lab';
import { Alert, Box } from '@mui/material';
import { type InfiniteData } from '@tanstack/react-query';
import Image from 'next/image';

import { getLikesStorage } from '../_helpers/get-likes-storage';
import { Post, type PostDataWithCommentsCount } from './Post';
import { type CategoryValue } from '~/constants';
import { api } from '~/trpc/react';

const NoPost = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Alert severity="info" sx={{ mb: 2 }}>
        暂时没有帖子哦，点击右下角发送一条吧！
      </Alert>
      <Image src="/sleepy.svg" width={100} height={100} alt="No posts" />
    </Box>
  );
};

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

  const likePostsStorage = getLikesStorage('post');

  return (
    <Box sx={{ pl: 2 }}>
      {postsInAllPages.length === 0 ? (
        <NoPost />
      ) : (
        <Masonry spacing={2} columns={{ lg: 3, sm: 2, xs: 1 }}>
          {postsInAllPages.map((post) => (
            <Post
              post={post}
              key={post.id}
              likePostsStorage={likePostsStorage}
            />
          ))}
        </Masonry>
      )}
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
