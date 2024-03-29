export const ADMIN_TOKEN_COOKIE_NAME = 'admin-token' as const;

export const POSTER_NAME_LOCALSTORAGE_KEY = 'posterName' as const;
export const LIKE_POSTS_LOCALSTORAGE_KEY = 'likePosts' as const;
export const LIKE_COMMENTS_LOCALSTORAGE_KEY = 'likeComments' as const;

export const PAGE_SIZE = 90;

export const CATEGORY_VALUES = [
  'love',
  'complaint',
  'help',
  'notice',
  'expand',
] as const;
export type CategoryValue = (typeof CATEGORY_VALUES)[number];
type Category = {
  name: string;
  value: CategoryValue;
};
export const CATEGORIES = [
  { name: '表白', value: 'love' },
  { name: '吐槽', value: 'complaint' },
  { name: '求助', value: 'help' },
  { name: '通知', value: 'notice' },
  { name: '扩列', value: 'expand' },
] satisfies Category[];

export const GENDER_VALUES = ['secret', 'boy', 'girl', 'other'] as const;
export type GenderValue = (typeof GENDER_VALUES)[number];
type Gender = {
  name: string;
  value: GenderValue;
  pronoun?: string;
  color?: string;
};
export const DEFAULT_GENDER_COLOR = '#000000';
export const GENDERS: Gender[] = [
  { name: '保密', value: 'secret' },
  { name: '男', value: 'boy', pronoun: '他', color: '#0069c0' },
  { name: '女', value: 'girl', pronoun: '她', color: '#b0003a' },
  { name: '其他', value: 'other', color: '#808080' },
];
