'use client';

import { Edit } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { CATEGORY_ICONS } from './category-icons';
import { CATEGORIES } from '~/constants';

export const PostButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const showPostButton = !pathname.includes('/post/');

  if (!showPostButton) {
    return <></>;
  }

  return (
    <SpeedDial
      ariaLabel="Post button"
      sx={{ position: 'fixed', bottom: 8, right: 8 }}
      icon={<SpeedDialIcon openIcon={<Edit />} />}
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
    >
      {CATEGORIES.map(({ name, value }) => {
        const Icon = CATEGORY_ICONS[value];
        return (
          <SpeedDialAction
            key={value}
            icon={<Icon />}
            tooltipTitle={name}
            tooltipOpen
            onClick={() => {
              router.push(`/post/new?category=${value}`);
            }}
          />
        );
      })}
    </SpeedDial>
  );
};
