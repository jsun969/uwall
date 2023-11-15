'use client';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Typography } from '@mui/material';
import { type Comment } from '@prisma/client';
import { type InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';

import { api } from '~/trpc/react';

export type InitialGetCommentsData = InfiniteData<{
  comments: Comment[];
  nextCursor: number | undefined;
}>;

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

  return (
    <Card>
      {commentsInAllPages.map((comment, i) => (
        <React.Fragment key={comment.id}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                fontWeight="bold"
                color={comment.anonymous ? 'secondary' : undefined}
              >
                {comment.anonymous ? '匿名' : comment.name}
              </Typography>
              <Typography color="text.secondary">#{i + 1}</Typography>
            </Box>
            <Typography sx={{ wordBreak: 'break-word' }}>
              {comment.content}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Typography variant="caption" color="text.secondary">
                {dayjs(comment.createdAt).format('YYYY年M月D号 HH:mm')}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </React.Fragment>
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
