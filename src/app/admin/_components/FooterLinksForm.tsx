'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';
import { toast } from 'react-toastify';
import { type z } from 'zod';

import { adminSchema } from '~/server/api/schema/admin';
import { api } from '~/trpc/react';

type FormValues = z.infer<typeof adminSchema.setFooterLinks>;
export const FooterLinksForm = ({
  defaultValues,
}: {
  defaultValues: FormValues;
}) => {
  const { control, handleSubmit, formState, reset } = useForm<
    z.infer<typeof adminSchema.setFooterLinks>
  >({
    resolver: zodResolver(adminSchema.setFooterLinks),
    defaultValues,
  });
  const linksField = useFieldArray({ control, name: 'links' });

  const router = useRouter();
  const setFooterLinks = api.admin.setFooterLinks.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success('页脚链接修改成功！');
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
            setFooterLinks.mutate(formData);
            reset(formData);
          })}
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              页脚链接
            </Typography>
          </Grid>
          {linksField.fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Grid item xs={12} md={8}>
                <TextFieldElement
                  label="链接"
                  placeholder="https://"
                  control={control}
                  name={`links.${index}.link`}
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} md={3}>
                <TextFieldElement
                  label="名称"
                  control={control}
                  name={`links.${index}.name`}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} md={1} alignSelf="center">
                <IconButton
                  onClick={() => {
                    linksField.remove(index);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                linksField.append({ name: '', link: 'https://' });
              }}
            >
              新增
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!formState.isDirty}
            >
              确定
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
