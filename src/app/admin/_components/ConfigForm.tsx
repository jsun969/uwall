'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { type z } from 'zod';

import { adminSchema } from '~/server/api/schema/admin';
import { api } from '~/trpc/react';

type FormValues = z.infer<typeof adminSchema.updateConfig>;
export const ConfigForm = ({
  defaultValues,
}: {
  defaultValues: FormValues;
}) => {
  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(adminSchema.updateConfig),
    defaultValues,
  });

  const router = useRouter();
  const updateConfig = api.admin.updateConfig.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success('设置修改成功！');
    },
  });

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit((formData) => {
            updateConfig.mutate(formData);
            reset(formData);
          })}
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              设置
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextFieldElement
              control={control}
              name="school"
              label="学校"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={updateConfig.isLoading}
              disabled={!formState.isDirty}
            >
              修改
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
