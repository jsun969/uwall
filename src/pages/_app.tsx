import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
