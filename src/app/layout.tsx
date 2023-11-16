import { Box, CssBaseline } from '@mui/material';
import { type Metadata } from 'next';
import { headers } from 'next/headers';

import { Footer } from './_components/Footer';
import { ConfirmProvider } from '~/providers/ConfirmProvider';
import { MuiThemeProvider } from '~/providers/MuiThemeProvider';
import { Toast } from '~/providers/Toast';
import { db } from '~/server/db';
import { TRPCReactProvider } from '~/trpc/react';

export const generateMetadata = async (): Promise<Metadata> => {
  const config = (await db.config.findFirst())!;
  const wallName = `${config.school}万能墙`;
  return {
    title: {
      default: wallName,
      template: `%s | ${wallName}`,
    },
    icons: [{ rel: 'icon', url: '/favicon.svg' }],
  };
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh_CN">
      <body>
        <CssBaseline />
        <TRPCReactProvider headers={headers()}>
          <MuiThemeProvider>
            <ConfirmProvider>
              <Box sx={{ position: 'relative', minHeight: '100vh' }}>
                <Box sx={{ pb: 12 }}>{children}</Box>
                <Footer />
              </Box>
            </ConfirmProvider>
            <Toast />
          </MuiThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
