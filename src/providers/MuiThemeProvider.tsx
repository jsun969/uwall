'use client';

import { ThemeProvider, createTheme } from '@mui/material';
import { pink, purple } from '@mui/material/colors';

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
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
