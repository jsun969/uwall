import {
  Favorite,
  Help,
  Notifications,
  People,
  RecordVoiceOver,
} from '@mui/icons-material';

export const ADMIN_TOKEN_COOKIE_NAME = 'admin-token' as const;

export const CATEGORIES = [
  { name: '表白', value: 'love', icon: Favorite },
  { name: '吐槽', value: 'complaint', icon: RecordVoiceOver },
  { name: '求助', value: 'help', icon: Help },
  { name: '通知', value: 'notice', icon: Notifications },
  { name: '扩列', value: 'expand', icon: People },
];
