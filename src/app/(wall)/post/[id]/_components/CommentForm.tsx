'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Card, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SwitchElement, TextFieldElement } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useWatchAnonymousAndCacheName } from '../../_helpers/use-watch-anonymous-and-cache-name';
import { POSTER_NAME_LOCALSTORAGE_KEY } from '~/constants';
import { wallSchema } from '~/server/api/schema/wall';
import { api } from '~/trpc/react';

const schema = z.union([
  wallSchema.createComment.omit({ postId: true }),
  wallSchema.createAnonymousComment.omit({ postId: true }),
]);

export const CommentForm = ({ postId }: { postId: string }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: localStorage.getItem(POSTER_NAME_LOCALSTORAGE_KEY) ?? '',
      content: '',
      anonymous: false,
    },
  });
  const watchAnonymous = useWatchAnonymousAndCacheName(form);

  const router = useRouter();
  const apiUtils = api.useUtils();
  const createComment = api.wall.createComment.useMutation({
    onSuccess: async () => {
      form.resetField('content');
      await apiUtils.wall.getComments.invalidate();
      router.refresh();
      toast.success('评论成功！');
    },
  });

  return (
    <Card sx={{ px: 2, pb: 2, pt: 1 }}>
      <Grid
        container
        component="form"
        spacing={2}
        onSubmit={form.handleSubmit((data) => {
          createComment.mutate({ postId, ...data });
        })}
      >
        {!watchAnonymous && (
          <Grid item xs={12} md={2}>
            <TextFieldElement
              control={form.control}
              name="name"
              label="名字"
              variant="standard"
              fullWidth
            />
          </Grid>
        )}
        <Grid item xs={12} md={watchAnonymous ? 12 : 10}>
          <TextFieldElement
            control={form.control}
            name="content"
            label="评论"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
          <SwitchElement control={form.control} name="anonymous" label="匿名" />
          <LoadingButton type="submit" variant="contained">
            评论
          </LoadingButton>
        </Grid>
      </Grid>
    </Card>
  );
};
