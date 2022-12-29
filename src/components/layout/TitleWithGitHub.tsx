import { GitHub } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

const TitleWithGitHub = ({ title }: { title: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Typography variant="h6" component="div" sx={{ mr: 1 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {title}
        </Link>
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => window.open('https://github.com/jsun969/uwall')}
        >
          <GitHub />
        </IconButton>
      </Box>
    </>
  );
};

export default TitleWithGitHub;
