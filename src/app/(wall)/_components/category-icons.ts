'use client';

import {
  Favorite,
  Help,
  Notifications,
  People,
  RecordVoiceOver,
} from '@mui/icons-material';

import { type CategoryValue } from '~/constants';

export const CATEGORY_ICONS = {
  love: Favorite,
  complaint: RecordVoiceOver,
  help: Help,
  notice: Notifications,
  expand: People,
} satisfies Record<CategoryValue, React.FunctionComponent>;
