import { useIsRouterChanging } from '../hooks/useIsRouterChanging';
import type { AppRouter } from '../server';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, LinearProgress } from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withTRPC } from '@trpc/next';
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
  const isRouterChanging = useIsRouterChanging();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isRouterChanging && <LinearProgress />}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default withTRPC<AppRouter>({
  ssr: true,
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';
    return { url };
  },
})(MyApp);
