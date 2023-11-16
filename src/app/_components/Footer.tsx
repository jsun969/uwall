import { Box, Divider, Link, Typography } from '@mui/material';
import React from 'react';

import { db } from '~/server/db';

type YiyanResponse = {
  hitokoto: string;
  from: string;
  from_who: string | null;
};
const fetchYiyan = async () => {
  const fetchData = await fetch('https://v1.hitokoto.cn');
  const data = (await fetchData.json()) as YiyanResponse;
  const sentense = data.from_who
    ? `${data.hitokoto} —— ${data.from_who}「${data.from}」`
    : `${data.hitokoto} —— 「${data.from}」`;
  return sentense;
};

export const Footer = async () => {
  const yiyan = await fetchYiyan();
  const footerLinks = await db.footerLink.findMany();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 4,
        width: '100%',
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.secondary',
        textAlign: 'center',
      }}
    >
      <Divider sx={{ width: '100%', mb: 1 }} />
      <Typography variant="caption">{yiyan}</Typography>
      <Typography variant="caption">
        {footerLinks.map(({ name, link, id }, i) => (
          <React.Fragment key={id}>
            <Link href={link} target="_blank">
              {name}
            </Link>
            {i !== footerLinks.length - 1 && ` / `}
          </React.Fragment>
        ))}
      </Typography>
      <Typography variant="caption">
        Powered by{' '}
        <Link href="https://github.com/jsun969/uwall" target="_blank">
          uwall
        </Link>
      </Typography>
    </Box>
  );
};
