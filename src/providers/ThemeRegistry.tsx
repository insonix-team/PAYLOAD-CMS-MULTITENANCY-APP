'use client';

// import { ThemeProvider, CssBaseline } from '@mui/material'
// import { themes } from '@/theme'
import { ThemeProvider } from './Theme';

export const ThemeRegistry: React.FC<{
  children: React.ReactNode;
  tenantTheme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  } | null;
}> = ({ children, tenantTheme }) => {
  return (
    <ThemeProvider tenantTheme={tenantTheme}>
      {/* <CssBaseline /> */}
      {children}
    </ThemeProvider>
  );
};
