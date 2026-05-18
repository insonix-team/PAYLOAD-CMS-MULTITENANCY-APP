import Link from 'next/link'

import { AppBar, Toolbar, Typography, Button, Container, Stack, Box } from '@mui/material'

type MenuItem = {
  label: string
  url: string
}

type Props = {
  logo?: {
    url?: string
  }

  menuItems?: MenuItem[]

  showButton?: boolean

  buttonLabel?: string

  buttonUrl?: string
}

export default function HeaderSimple({ logo, menuItems = [], showButton, buttonLabel, buttonUrl }: Props) {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: '72px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {logo?.url ? (
              <Box
                component="img"
                src={logo.url}
                alt="Logo"
                sx={{
                  height: 42,
                  width: 'auto',
                }}
              />
            ) : (
              <Typography variant="h6">LOGO</Typography>
            )}
          </Box>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    transition: '0.2s',

                    '&:hover': {
                      opacity: 0.7,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          <Box>
            {showButton && (
              <Button
                component={Link}
                href={buttonUrl || '#'}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  px: 3,
                }}
              >
                {buttonLabel || 'Get Started'}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
