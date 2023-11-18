'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { pink, purple } from '@mui/material/colors';

import NextAppDirEmotionCacheProvider from './EmotionCacheProvider';

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});

export const MuiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
