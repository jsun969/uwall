import {
  Favorite,
  Help,
  Notifications,
  People,
  RecordVoiceOver,
} from '@mui/icons-material';

export const POST_CATEGORIES = [
  { name: 'love', label: '表白', icon: <Favorite /> },
  { name: 'complaint', label: '吐槽', icon: <RecordVoiceOver /> },
  { name: 'help', label: '求助', icon: <Help /> },
  { name: 'notice', label: '通知', icon: <Notifications /> },
  { name: 'expand', label: '扩列', icon: <People /> },
];
