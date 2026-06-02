'use client';

// import { ThemeProvider, CssBaseline } from '@mui/material'
// import { themes } from '@/theme'
import { ThemeProvider } from './Theme';

export const ThemeRegistry: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      {/* <CssBaseline /> */}
      {children}
    </ThemeProvider>
  );
};
