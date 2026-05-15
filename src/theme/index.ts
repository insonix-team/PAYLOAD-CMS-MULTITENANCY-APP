import { createTheme } from '@mui/material/styles'

export const themes = {
  blue: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#2563eb' },
      secondary: { main: '#9333ea' },
      background: { default: '#899edbce' },
    },
  }),

  green: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#16a34a' },
      secondary: { main: '#15803d' },
      background: { default: '#f0fdf4' },
    },
  }),

  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#f59e0b' },
      secondary: { main: '#b45309' },
      background: { default: '#0f172a' },
    },
  }),
}
