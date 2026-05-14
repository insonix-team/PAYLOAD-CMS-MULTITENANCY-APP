'use client'

import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material'
import Link from 'next/link'

type HeaderProps = {
  data: any
  tenant: string
}

export const Header = ({ data, tenant }: HeaderProps) => {
  if (!data) return null

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {data.logo}
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {data.links?.map((link: any, i: number) => (
              <Button
                key={i}
                component={Link}
                href={`/${tenant}${link.url}`}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
