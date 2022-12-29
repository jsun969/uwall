import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useIsRouterChanging } from '../hooks/useIsRouterChanging';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';
import { trpc } from '../lib/trpc';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: { session: Session | null };
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const isRouterChanging = useIsRouterChanging();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={session}>
          {isRouterChanging && <LinearProgress />}
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default trpc.withTRPC(MyApp);
