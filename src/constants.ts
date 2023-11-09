import {
  Favorite,
  Help,
  Notifications,
  People,
  RecordVoiceOver,
} from '@mui/icons-material';

export const ADMIN_TOKEN_COOKIE_NAME = 'admin-token' as const;

export const CATEGORIES = [
  { name: '表白', path: 'love', icon: Favorite },
  { name: '吐槽', path: 'complaint', icon: RecordVoiceOver },
  { name: '求助', path: 'help', icon: Help },
  { name: '通知', path: 'notice', icon: Notifications },
  { name: '扩列', path: 'expand', icon: People },
];
