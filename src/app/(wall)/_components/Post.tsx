'use client';

import {
  Comment,
  Delete,
  Forward,
  PsychologyAlt,
  ThumbUp,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { type Post as PostData } from '@prisma/client';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { getLikesStorage } from '../_helpers/get-likes-storage';
import { CATEGORY_ICONS } from './category-icons';
import {
  CATEGORIES,
  DEFAULT_GENDER_COLOR,
  GENDERS,
  LIKE_POSTS_LOCALSTORAGE_KEY,
} from '~/constants';
import { useConfirm } from '~/hooks/use-confirm';
import { useIsAdmin } from '~/hooks/use-is-admin';
import { sqids } from '~/lib/sqids';
import { api } from '~/trpc/react';

const CategoryChip = ({ categoryValue }: { categoryValue: string }) => {
  const router = useRouter();
  const category = CATEGORIES.find(({ value }) => value === categoryValue);

  if (!category) {
    return <Chip label="未知类型" />;
  }
  const { name, value } = category;
  const Icon = CATEGORY_ICONS[value];
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

const LikeButton = ({
  post,
  likePostsStorage: propLikePostsStorage,
}: {
  post: PostData;
  likePostsStorage: number[];
}) => {
  const router = useRouter();
  // To avoid storage cannot be get in comment page
  const likePostsStorage =
    propLikePostsStorage.length === 0
      ? getLikesStorage('post')
      : propLikePostsStorage;
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
      const newLikePostsStorage = [...likePostsStorage, data.id];
      localStorage.setItem(
        LIKE_POSTS_LOCALSTORAGE_KEY,
        JSON.stringify(newLikePostsStorage),
      );
    },
    onSettled: async () => {
      router.refresh();
      await apiUtils.wall.getPosts.invalidate();
    },
  });

  return (
    <Tooltip title="点赞">
      <IconButton
        color={isLiked ? 'primary' : 'default'}
        onClick={() => {
          if (!isLiked) {
            addLike.mutate({ id: post.id });
          }
        }}
      >
        <Badge badgeContent={post.likes} max={999} color="secondary">
          <ThumbUp />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const apiUtils = api.useUtils();
  const deletePost = api.admin.deletePost.useMutation({
    onSuccess: async () => {
      await apiUtils.wall.getPosts.invalidate();
      toast.info('帖子删除成功');
    },
  });
  const confirmDelete = useConfirm({
    title: '确定删除这条帖子及其评论？',
    description: '删除后无法恢复',
    onConfirm: () => {
      router.refresh();
      deletePost.mutate({ id });
    },
  });

  return (
    <IconButton onClick={confirmDelete}>
      <Delete />
    </IconButton>
  );
};

export type PostDataWithCommentsCount = PostData & {
  _count: { comments: number };
};
export const Post = ({
  post,
  likePostsStorage,
}: {
  post: PostDataWithCommentsCount;
  likePostsStorage: number[];
}) => {
  const isLovePost = post.category === 'love';
  const isAdmin = useIsAdmin();

  const router = useRouter();

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          {isAdmin && <DeleteButton id={post.id} />}
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
        <LikeButton post={post} likePostsStorage={likePostsStorage} />
        {post.anonymous && (
          <Chip
            label="匿名"
            variant="outlined"
            size="small"
            icon={<PsychologyAlt />}
            color="secondary"
          />
        )}
        <Tooltip title="查看评论">
          <IconButton
            onClick={() => {
              const id = sqids.encode([post.id]);
              router.push(`/post/${id}`);
            }}
          >
            <Badge
              badgeContent={post._count.comments}
              max={999}
              color="secondary"
            >
              <Comment />
            </Badge>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
