import { z } from 'zod';

const name = z
  .string()
  .min(1, '请输入名字')
  .max(15, { message: '不得大于15个字符' });
const content = z
  .string()
  .min(1, { message: '请输入内容' })
  .max(250, { message: '不得大于250个字符' });

const commonCreatePostSchema = z.object({
  category: z.string(),
  content,
});
const commonCreateLovePost = z.object({
  fromGender: z.string(),
  toName: name,
  toGender: z.string(),
  content,
});

export const wallSchema = {
  createPost: commonCreatePostSchema.merge(
    z.object({
      anonymous: z.literal(true),
      name: z.literal(''),
    }),
  ),
  createAnonymousPost: commonCreatePostSchema.merge(
    z.object({
      anonymous: z.literal(false),
      name,
    }),
  ),
  createLovePost: commonCreateLovePost.merge(
    z.object({
      anonymous: z.literal(false),
      fromName: name,
    }),
  ),
  createAnonymousLovePost: commonCreateLovePost.merge(
    z.object({
      anonymous: z.literal(true),
      fromName: z.literal(''),
    }),
  ),
};
