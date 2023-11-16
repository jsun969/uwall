import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 4,
        height: '70vh',
      }}
    >
      <Image src="/die.svg" width={100} height={100} alt="Not found" />
      <Typography variant="h4" component="div" textAlign="center">
        404 - 页面未找到
      </Typography>
      <Button href="/" variant="contained" size="large">
        返回主页
      </Button>
    </Box>
  );
};

export default NotFound;
