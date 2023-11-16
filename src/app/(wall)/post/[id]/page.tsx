import { Stack } from '@mui/material';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Post } from '../../_components/Post';
import { CommentForm } from './_components/CommentForm';
import { Comments, type InitialGetCommentsData } from './_components/Comments';
import { sqids } from '~/lib/sqids';
import { db } from '~/server/db';
import { api } from '~/trpc/server';

const findPostWithCommentsCount = async (id: number) => {
  return await db.post.findUnique({
    where: { id },
    include: { _count: { select: { comments: true } } },
  });
};

interface PostPageProps {
  params: { id: string };
}

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const [postId] = sqids.decode(params.id);
  if (!postId) {
    return { title: '404' };
  }
  const post = await findPostWithCommentsCount(postId);
  if (!post) {
    return { title: '404' };
  }
  const title = post.anonymous ? '匿名帖子' : `来自${post.name}的帖子`;
  return { title, description: post.content };
};

const PostPage = async ({ params }: PostPageProps) => {
  const [postId] = sqids.decode(params.id);
  if (!postId) {
    notFound();
  }
  const post = await findPostWithCommentsCount(postId);
  if (!post) {
    notFound();
  }
  const initialComments = await api.wall.getComments.query({
    postId,
  });
  const initialGetCommentsData = {
    pages: [initialComments],
    pageParams: [],
  } satisfies InitialGetCommentsData;

  return (
    <Stack spacing={2}>
      <Post post={post} likePostsStorage={[]} />
      <Comments
        initialGetCommentsData={initialGetCommentsData}
        postId={postId}
      />
      <CommentForm postId={postId} />
    </Stack>
  );
};

export default PostPage;
