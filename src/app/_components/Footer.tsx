import { Box, Link, Typography } from '@mui/material';

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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 1,
        color: 'text.secondary',
      }}
    >
      <Typography variant="caption">{yiyan}</Typography>
      <Typography variant="caption">
        Powered by <Link href="https://github.com/jsun969/uwall">uwall</Link>
      </Typography>
    </Box>
  );
};
