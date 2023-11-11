'use client';

import { Edit } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { CATEGORIES } from '~/constants';

export const PostButton = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const showPostButton = !pathname.includes('/post/new');

  if (!showPostButton) {
    return <></>;
  }

  return (
    <SpeedDial
      ariaLabel="Post button"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon openIcon={<Edit />} />}
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
    >
      {CATEGORIES.map(({ name, value, icon: Icon }) => (
        <SpeedDialAction
          key={value}
          icon={<Icon />}
          tooltipTitle={name}
          tooltipOpen
          onClick={() => {
            router.push(`/post/new?category=${value}`);
          }}
        />
      ))}
    </SpeedDial>
  );
};
