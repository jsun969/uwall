import { ThumbUp } from '@mui/icons-material';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { type Comment as CommentData } from '@prisma/client';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { LIKE_COMMENTS_LOCALSTORAGE_KEY } from '~/constants';
import { api } from '~/trpc/react';

interface CommentProps {
  comment: CommentData;
  index: number;
  likeCommentsStorage: number[];
}

const LikeButton = ({
  comment,
  likeCommentsStorage,
}: {
  comment: CommentData;
  likeCommentsStorage: number[];
}) => {
  const [isLiked, setIsLiked] = useState(
    likeCommentsStorage.includes(comment.id),
  );
  const apiUtils = api.useUtils();
  const addCommentLike = api.wall.addCommentLike.useMutation({
    onMutate: () => {
      setIsLiked(true);
    },
    onError: () => {
      setIsLiked(false);
      toast.error(`为 ${comment.anonymous ? '匿名' : comment.name} 点赞失败`);
    },
    onSuccess: (data) => {
      const newLikeCommentsStorage = [...likeCommentsStorage, data.id];
      localStorage.setItem(
        LIKE_COMMENTS_LOCALSTORAGE_KEY,
        JSON.stringify(newLikeCommentsStorage),
      );
    },
    onSettled: async () => {
      await apiUtils.wall.getComments.invalidate({ postId: comment.postId });
    },
  });

  return (
    <Tooltip title="点赞">
      <IconButton
        color={isLiked ? 'primary' : 'default'}
        onClick={() => {
          if (!isLiked) {
            addCommentLike.mutate({ id: comment.id });
          }
        }}
        size="small"
      >
        <Badge badgeContent={comment.likes} color="secondary">
          <ThumbUp fontSize="small" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export const Comment = ({
  comment,
  index,
  likeCommentsStorage,
}: CommentProps) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            fontWeight="bold"
            color={comment.anonymous ? 'secondary' : undefined}
          >
            {comment.anonymous ? '匿名' : comment.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography color="text.secondary">#{index}</Typography>
            <LikeButton
              comment={comment}
              likeCommentsStorage={likeCommentsStorage}
            />
          </Box>
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
    </>
  );
};
