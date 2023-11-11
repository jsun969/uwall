import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { SwitchElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { POSTER_NAME_LOCALSTORAGE_KEY } from '~/constants';
import { wallSchema } from '~/server/api/schema/wall';
import { api } from '~/trpc/react';

const schema = z.union([
  wallSchema.createPost.omit({ category: true }),
  wallSchema.createAnonymousPost.omit({ category: true }),
]);

export const PostForm = ({ category }: { category: string }) => {
  const { control, watch, handleSubmit, setValue, getValues } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      name: localStorage.getItem(POSTER_NAME_LOCALSTORAGE_KEY) ?? '',
      content: '',
      anonymous: false,
    },
  });

  const cacheName = useRef(getValues('name'));
  const watchAnonymous = watch('anonymous');
  useEffect(() => {
    if (watchAnonymous) {
      cacheName.current = getValues('name');
      setValue('name', '');
    } else {
      setValue('name', cacheName.current);
    }
  }, [watchAnonymous]);

  const router = useRouter();
  const createPost = api.wall.createPost.useMutation({
    onSuccess: (data) => {
      if (!data.anonymous) {
        localStorage.setItem(POSTER_NAME_LOCALSTORAGE_KEY, data.name ?? '');
      }
      toast.success('发送成功！');
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
      onSubmit={handleSubmit((formData) => {
        createPost.mutate({ category, ...formData });
      })}
    >
      {!watchAnonymous && (
        <Grid item xs={12}>
          <TextFieldElement
            control={control}
            name="name"
            label="你的名字"
            fullWidth
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextFieldElement
          control={control}
          name="content"
          label="内容"
          fullWidth
          multiline
          minRows={6}
        />
      </Grid>
      <Grid item flexGrow={1}>
        <SwitchElement control={control} name="anonymous" label="匿名" />
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
