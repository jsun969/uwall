import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SwitchElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useWatchAnonymousAndCacheName } from '../../_helpers/use-watch-anonymous-and-cache-name';
import { POSTER_NAME_LOCALSTORAGE_KEY, type CategoryValue } from '~/constants';
import { wallSchema } from '~/server/api/schema/wall';
import { api } from '~/trpc/react';

const schema = z.union([
  wallSchema.createPost.omit({ category: true }),
  wallSchema.createAnonymousPost.omit({ category: true }),
]);

export const PostForm = ({ category }: { category: CategoryValue }) => {
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
  const createPost = api.wall.createPost.useMutation({
    onSuccess: async (data) => {
      if (!data.anonymous) {
        localStorage.setItem(POSTER_NAME_LOCALSTORAGE_KEY, data.name ?? '');
      }
      toast.success('发送成功！');
      await apiUtils.wall.getPosts.invalidate();
      router.push('/');
    },
  });

  return (
    <Grid
      container
      item
      xs={12}
      component="form"
      spacing={2}
      onSubmit={form.handleSubmit((formData) => {
        createPost.mutate({ category, ...formData });
      })}
    >
      {!watchAnonymous && (
        <Grid item xs={12}>
          <TextFieldElement
            control={form.control}
            name="name"
            label="你的名字"
            fullWidth
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextFieldElement
          control={form.control}
          name="content"
          label="内容"
          fullWidth
          multiline
          minRows={6}
        />
      </Grid>
      <Grid item flexGrow={1}>
        <SwitchElement control={form.control} name="anonymous" label="匿名" />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          endIcon={<Send />}
          variant="contained"
          loading={createPost.isLoading}
        >
          发送
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
