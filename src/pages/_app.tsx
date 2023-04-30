import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useIsRouterChanging } from '~/hooks/useIsRouterChanging';
import createEmotionCache from '~/lib/createEmotionCache';
import theme from '~/lib/theme';
import { api } from '~/utils/api';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const isRouterChanging = useIsRouterChanging();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isRouterChanging && <LinearProgress />}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default api.withTRPC(MyApp);
