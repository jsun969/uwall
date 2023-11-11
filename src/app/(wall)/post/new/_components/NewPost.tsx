'use client';

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

import { LovePostForm } from './LovePostForm';
import { PostForm } from './PostForm';
import { CATEGORIES } from '~/constants';

export const NewPost = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>帖子分类</InputLabel>
          <Select
            label="帖子分类"
            value={category}
            onChange={(e) => {
              router.push(`/post/new?category=${e.target.value}`);
            }}
            fullWidth
          >
            {CATEGORIES.map(({ name, value, icon: Icon }) => (
              <MenuItem value={value} key={value}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Icon color="action" />
                  <div>{name}</div>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {category === 'love' ? (
        <LovePostForm />
      ) : (
        <PostForm category={category!} />
      )}
    </Grid>
  );
};
