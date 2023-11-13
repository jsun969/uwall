'use client';

import { Comment, Forward, PsychologyAlt, ThumbUp } from '@mui/icons-material';
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { type Post as PostData } from '@prisma/client';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  CATEGORIES,
  DEFAULT_GENDER_COLOR,
  GENDERS,
  LIKE_POSTS_LOCALSTORAGE_KEY,
} from '~/constants';
import { api } from '~/trpc/react';

const CategoryChip = ({ categoryValue }: { categoryValue: string }) => {
  const router = useRouter();
  const category = CATEGORIES.find(({ value }) => value === categoryValue);

  if (!category) {
    return <Chip label="未知类型" />;
  }
  const { name, icon: Icon, value } = category;
  return (
    <Chip
      label={name}
      icon={<Icon />}
      onClick={() => {
        router.push('/' + value);
      }}
    />
  );
};

const getGenderColor = (gender: string) =>
  GENDERS.find(({ value }) => value === gender)?.color ?? DEFAULT_GENDER_COLOR;
const LoveNames = ({ post }: { post: PostData }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {!post.anonymous && (
        <Typography color={getGenderColor(post.gender!)} fontWeight="bold">
          {post.name}
        </Typography>
      )}
      <Forward color="primary" />
      <Typography color={getGenderColor(post.toGender!)} fontWeight="bold">
        {post.toName}
      </Typography>
    </Box>
  );
};
const Name = ({ post }: { post: PostData }) => {
  if (post.anonymous) return <></>;
  return (
    <Box>
      <Typography fontWeight="bold">{post?.name}</Typography>
    </Box>
  );
};

const getLikePostsStorage = () => {
  const likePostsStoragePlainData = localStorage.getItem(
    LIKE_POSTS_LOCALSTORAGE_KEY,
  );
  return likePostsStoragePlainData
    ? (JSON.parse(likePostsStoragePlainData) as string[])
    : [];
};

export type PostDataWithCommentsCount = PostData & {
  _count: { comments: number };
};
export const Post = ({ post }: { post: PostDataWithCommentsCount }) => {
  const isLovePost = post.category === 'love';

  const likePostsStorage = getLikePostsStorage();
  const [isLiked, setIsLiked] = useState(likePostsStorage.includes(post.id));
  const apiUtils = api.useUtils();
  const addLike = api.wall.addLike.useMutation({
    onMutate: () => {
      setIsLiked(true);
    },
    onError: () => {
      setIsLiked(false);
      toast.error(`为 ${post.anonymous ? '匿名' : post.name} 点赞失败`);
    },
    onSuccess: (data) => {
      const newlikePostsStorage = [...likePostsStorage, data.id];
      localStorage.setItem(
        LIKE_POSTS_LOCALSTORAGE_KEY,
        JSON.stringify(newlikePostsStorage),
      );
    },
    onSettled: async () => {
      await apiUtils.wall.getPosts.invalidate();
    },
  });

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CategoryChip categoryValue={isLovePost ? 'love' : post.category} />
          <Typography color="text.secondary" variant="subtitle2">
            {dayjs(post.createdAt).format('YYYY年M月D号 HH:mm')}
          </Typography>
        </Box>
        {isLovePost ? <LoveNames post={post} /> : <Name post={post} />}
        <Typography
          component="pre"
          style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color={isLiked ? 'primary' : 'default'}
          onClick={() => {
            !isLiked && addLike.mutate({ id: post.id });
          }}
        >
          <Badge badgeContent={post.likes} color="secondary">
            <ThumbUp />
          </Badge>
        </IconButton>
        {post.anonymous && (
          <Chip
            label="匿名"
            variant="outlined"
            size="small"
            icon={<PsychologyAlt />}
            color="secondary"
          />
        )}
        <IconButton>
          <Badge badgeContent={post._count.comments} color="secondary">
            <Comment />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
};
