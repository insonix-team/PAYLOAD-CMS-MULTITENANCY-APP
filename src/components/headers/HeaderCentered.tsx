'use client';

import Link from 'next/link';

import { AppBar, Toolbar, Typography, Box, Container, Stack } from '@mui/material';

type Props = {
  announcementText?: string;

  logo?: {
    url?: string;
  };

  menuItems?: {
    label: string;
    url: string;
  }[];
};

export default function HeaderCentered({ announcementText, logo, menuItems = [] }: Props) {
  return (
    <>
      {/* TOP BAR */}
      {announcementText && (
        <Box
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            py: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">{announcementText}</Typography>
        </Box>
      )}

      {/* HEADER */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          borderBottom: '1px solid #eee',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: 80,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              py: 2,
            }}
          >
            {/* LOGO */}
            {logo?.url ? (
              <Box
                component="img"
                src={logo.url}
                alt="Logo"
                sx={{
                  height: 50,
                  width: 'auto',
                }}
              />
            ) : (
              <Typography variant="h5">BRAND</Typography>
            )}

            {/* MENU */}
            <Stack direction="row" spacing={4}>
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
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
