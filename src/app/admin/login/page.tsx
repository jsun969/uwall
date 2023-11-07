'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Login } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { type z } from 'zod';

import { authSchema } from '~/server/api/schema/auth';
import { api } from '~/trpc/react';

const AdminLoginPage = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<z.infer<typeof authSchema.login>>({
    resolver: zodResolver(authSchema.login),
  });
  const login = api.auth.login.useMutation({
    onSuccess: () => {
      toast.success('登录成功！');
      router.push('/admin');
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 300, mx: 2 }}>
        <CardContent
          component="form"
          sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}
          onSubmit={handleSubmit((formData) => {
            login.mutate(formData);
          })}
        >
          <Typography variant="h6" color="text.secondary">
            管理员登录
          </Typography>
          <TextFieldElement
            control={control}
            placeholder="用户名"
            name="username"
          />
          <TextFieldElement
            control={control}
            name="password"
            placeholder="密码"
            type="password"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={login.isLoading}
            startIcon={<Login />}
          >
            登录
          </LoadingButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLoginPage;
