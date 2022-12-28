import { GitHub } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import Head from 'next/head';

const GitHubButton = () => {
  return (
    <IconButton
      size="large"
      color="inherit"
      onClick={() => window.open('https://github.com/jsun969/uwall')}
    >
      <GitHub />
    </IconButton>
  );
};

const TitleWithGitHub = ({ title }: { title: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Typography variant="h6" component="div" sx={{ mr: 1 }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <GitHubButton />
      </Box>
    </>
  );
};

export default TitleWithGitHub;
