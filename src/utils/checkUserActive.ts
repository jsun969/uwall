import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const checkUserActive = (activeExpiresDayjs: Dayjs) => {
  const isActive = dayjs().isBefore(activeExpiresDayjs);
  return isActive;
};
