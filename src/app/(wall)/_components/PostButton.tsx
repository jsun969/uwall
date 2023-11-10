'use client';

import { Edit } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useState } from 'react';

import { CATEGORIES } from '~/constants';

export const PostButton = () => {
  const [open, setOpen] = useState(false);

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
        />
      ))}
    </SpeedDial>
  );
};
