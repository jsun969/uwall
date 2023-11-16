'use client';

import { LoadingButton } from '@mui/lab';
import { Box, Card } from '@mui/material';
import { type Comment as CommentData } from '@prisma/client';
import { type InfiniteData } from '@tanstack/react-query';

import { Comment } from './Comment';
import { getLikesStorage } from '~/app/(wall)/_helpers/get-likes-storage';
import { api } from '~/trpc/react';

export type InitialGetCommentsData = InfiniteData<{
  comments: CommentData[];
  nextCursor: number | undefined;
}>;

export const Comments = ({
  initialGetCommentsData,
  postId,
}: {
  initialGetCommentsData: InitialGetCommentsData;
  postId: number;
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

  if (commentsInAllPages.length === 0) return <></>;

  const likeCommentsStorage = getLikesStorage('comment');

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
