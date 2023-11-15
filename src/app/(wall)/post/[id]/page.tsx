import { Stack } from '@mui/material';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Post } from '../../_components/Post';
import { CommentForm } from './_components/CommentForm';
import { Comments, type InitialGetCommentsData } from './_components/Comments';
import { db } from '~/server/db';
import { api } from '~/trpc/server';

const findPostWithCommentsCount = async (id: string) => {
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
  const post = await findPostWithCommentsCount(params.id);
  if (!post) {
    return { title: '404' };
  }
  const title = post.anonymous ? '匿名帖子' : `来自${post.name}的帖子`;
  return { title, description: post.content };
};

const PostPage = async ({ params }: PostPageProps) => {
  const post = await findPostWithCommentsCount(params.id);
  if (!post) {
    notFound();
  }
  const initialComments = await api.wall.getComments.query({
    postId: params.id,
  });
  const initialGetCommentsData = {
    pages: [initialComments],
    pageParams: [],
  } satisfies InitialGetCommentsData;

  return (
    <Stack spacing={2}>
      <Post post={post} />
      {initialComments.comments.length !== 0 && (
        <Comments
          initialGetCommentsData={initialGetCommentsData}
          postId={params.id}
        />
      )}
      <CommentForm postId={params.id} />
    </Stack>
  );
};

export default PostPage;
