import { CssBaseline } from '@mui/material';
import { type Metadata } from 'next';
import { headers } from 'next/headers';

import { ConfirmProvider } from '~/providers/ConfirmProvider';
import { MuiThemeProvider } from '~/providers/MuiThemeProvider';
import { Toast } from '~/providers/Toast';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh_CN">
      <body>
        <CssBaseline />
        <TRPCReactProvider headers={headers()}>
          <MuiThemeProvider>
            <ConfirmProvider>{children}</ConfirmProvider>
            <Toast />
          </MuiThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
