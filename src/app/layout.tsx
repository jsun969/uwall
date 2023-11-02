import { CssBaseline } from '@mui/material';
import { headers } from 'next/headers';

import { MuiThemeProvider } from '~/providers/MuiThemeProvider';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata = {
  title: 'Uwall',
  description: '校园万能墙',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh-CN">
      <body>
        <CssBaseline />
        <TRPCReactProvider headers={headers()}>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
