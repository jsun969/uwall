import { zodResolver } from '@hookform/resolvers/zod';
import { Email } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  SelectElement,
  SwitchElement,
  TextFieldElement,
  useForm,
  type FieldValues,
  type SelectElementProps,
} from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { GENDERS, POSTER_NAME_LOCALSTORAGE_KEY } from '~/constants';
import { wallSchema } from '~/server/api/schema/wall';
import { api } from '~/trpc/react';

const GenderSelect = <TFieldValues extends FieldValues>(
  props: SelectElementProps<TFieldValues>,
) => {
  return (
    <SelectElement
      {...props}
      fullWidth
      options={GENDERS.map((gender) => ({
        id: gender.value,
        label: gender.name,
      }))}
    />
  );
};

const schema = z.union([
  wallSchema.createLovePost,
  wallSchema.createAnonymousLovePost,
]);

export const LovePostForm = () => {
  const { control, watch, handleSubmit, setValue, getValues } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      name: localStorage.getItem(POSTER_NAME_LOCALSTORAGE_KEY) ?? '',
      gender: 'secret',
      toName: '',
      toGender: 'secret',
      content: '',
      anonymous: false,
    },
  });

  const cacheFormName = useRef(getValues('name'));
  const watchAnonymous = watch('anonymous');
  useEffect(() => {
    if (watchAnonymous) {
      cacheFormName.current = getValues('name');
      setValue('name', '');
    } else {
      setValue('name', cacheFormName.current);
    }
  }, [watchAnonymous]);
  const toPronoun =
    GENDERS.find(({ value }) => value === watch('toGender'))?.pronoun ?? 'TA';

  const router = useRouter();
  const createLovePost = api.wall.createLovePost.useMutation({
    onSuccess: (data) => {
      if (!data.anonymous) {
        localStorage.setItem(POSTER_NAME_LOCALSTORAGE_KEY, data.name ?? '');
      }
      toast.success('表白发送成功！');
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
        createLovePost.mutate(formData);
      })}
    >
      <Grid item xs={12} md={watchAnonymous ? 6 : 4}>
        <GenderSelect label="你的性别" control={control} name="gender" />
      </Grid>
      {!watchAnonymous && (
        <Grid item xs={12} md={8}>
          <TextFieldElement
            control={control}
            name="name"
            label="你的名字"
            fullWidth
          />
        </Grid>
      )}
      <Grid item xs={12} md={watchAnonymous ? 6 : 4}>
        <GenderSelect label="TA的性别" control={control} name="toGender" />
      </Grid>
      <Grid item xs={12} md={watchAnonymous ? 12 : 8}>
        <TextFieldElement
          control={control}
          name="toName"
          label={`${toPronoun}的名字`}
          fullWidth
        />
      </Grid>
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
          endIcon={<Email />}
          variant="contained"
          loading={createLovePost.isLoading}
        >
          表白
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
