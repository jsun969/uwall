'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { type z } from 'zod';

import { adminSchema } from '~/server/api/schema/admin';
import { api } from '~/trpc/react';

export const ConfigForm = ({
  defaultValues,
}: {
  defaultValues: z.infer<typeof adminSchema.updateConfig>;
}) => {
  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof adminSchema.updateConfig>
  >({
    resolver: zodResolver(adminSchema.updateConfig),
    defaultValues,
  });
  const updateConfig = api.admin.updateConfig.useMutation({
    onSuccess: () => {
      toast.success('设置修改成功！');
    },
  });

  return (
    <Card>
      <CardContent
        component="form"
        sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}
        onSubmit={handleSubmit((formData) => {
          updateConfig.mutate(formData);
        })}
      >
        <Typography variant="h6" color="text.secondary">
          设置
        </Typography>
        <TextFieldElement control={control} name="school" label="学校" />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={updateConfig.isLoading}
          disabled={!formState.isDirty}
        >
          修改
        </LoadingButton>
      </CardContent>
    </Card>
  );
};
