'use client';

import { LoadingButton } from '@mui/lab';
import { Box, Card } from '@mui/material';
import { type Comment as CommentData } from '@prisma/client';
import { type InfiniteData } from '@tanstack/react-query';

import { Comment } from './Comment';
import { LIKE_COMMENTS_LOCALSTORAGE_KEY } from '~/constants';
import { api } from '~/trpc/react';

export type InitialGetCommentsData = InfiniteData<{
  comments: CommentData[];
  nextCursor: number | undefined;
}>;

const getLikeCommentsStorage = () => {
  // FIXME: ReferenceError: localStorage is not defined
  const likeCommentsStoragePlainData = localStorage?.getItem(
    LIKE_COMMENTS_LOCALSTORAGE_KEY,
  );
  return likeCommentsStoragePlainData
    ? (JSON.parse(likeCommentsStoragePlainData) as number[])
    : [];
};

export const Comments = ({
  initialGetCommentsData,
  postId,
}: {
  initialGetCommentsData: InitialGetCommentsData;
  postId: string;
}) => {
  const getComments = api.wall.getComments.useInfiniteQuery(
    { postId },
    {
      initialData: initialGetCommentsData,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const commentsInAllPages =
    getComments.data?.pages.flatMap(({ comments }) => comments) ?? [];

  const likeCommentsStorage = getLikeCommentsStorage();

  return (
    <Card>
      {commentsInAllPages.map((comment, i) => (
        <Comment
          comment={comment}
          key={comment.id}
          index={i + 1}
          likeCommentsStorage={likeCommentsStorage}
        />
      ))}
      {getComments.hasNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            loading={getComments.isFetchingNextPage}
            onClick={() => getComments.fetchNextPage()}
          >
            加载更多
          </LoadingButton>
        </Box>
      )}
    </Card>
  );
};
