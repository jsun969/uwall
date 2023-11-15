import { z } from 'zod';

import { CATEGORY_VALUES, GENDER_VALUES } from '~/constants';

const name = z
  .string()
  .min(1, '请输入名字')
  .max(15, { message: '不得大于15个字符' });
const content = z
  .string()
  .min(1, { message: '请输入内容' })
  .max(250, { message: '不得大于250个字符' });
const gender = z.enum(GENDER_VALUES);

const createPostBase = z.object({
  category: z.enum(CATEGORY_VALUES),
  content,
});
const createLovePostBase = z.object({
  gender,
  toName: name,
  toGender: gender,
  content,
});
const createCommentBase = z.object({
  postId: z.string(),
  content,
});

const nameWhenAnonymous = z.object({
  anonymous: z.literal(true),
  name: z.literal(''),
});
const nameWhenNotAnonymous = z.object({
  anonymous: z.literal(false),
  name,
});

export const wallSchema = {
  createPost: createPostBase.merge(nameWhenNotAnonymous),
  createAnonymousPost: createPostBase.merge(nameWhenAnonymous),
  createLovePost: createLovePostBase.merge(nameWhenNotAnonymous),
  createAnonymousLovePost: createLovePostBase.merge(nameWhenAnonymous),
  createComment: createCommentBase.merge(nameWhenNotAnonymous),
  createAnonymousComment: createCommentBase.merge(nameWhenAnonymous),
};
