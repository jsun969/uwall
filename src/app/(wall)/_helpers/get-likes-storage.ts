import {
  LIKE_COMMENTS_LOCALSTORAGE_KEY,
  LIKE_POSTS_LOCALSTORAGE_KEY,
} from '~/constants';

type Type = 'post' | 'comment';
const KEYS = {
  post: LIKE_POSTS_LOCALSTORAGE_KEY,
  comment: LIKE_COMMENTS_LOCALSTORAGE_KEY,
} satisfies Record<Type, string>;

export const getLikesStorage = (type: Type) => {
  const key = KEYS[type];
  if (typeof window === 'undefined') {
    return [];
  }
  const likePostsStoragePlainData = localStorage?.getItem(key);
  return likePostsStoragePlainData
    ? (JSON.parse(likePostsStoragePlainData) as number[])
    : [];
};
