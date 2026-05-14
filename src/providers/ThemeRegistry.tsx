'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { themes } from '@/theme'

export default function ThemeRegistry({
  children,
  themeKey,
}: {
  children: React.ReactNode
  themeKey: string
}) {
  const theme = themes[themeKey as keyof typeof themes] || themes.blue

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
