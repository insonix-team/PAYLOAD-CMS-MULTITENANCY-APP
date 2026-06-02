'use client';

import Link from 'next/link';

import { Box, Container, Stack, Typography } from '@mui/material';

type SocialLink = {
  platform: string;
  url: string;
};

type Props = {
  copyrightText?: string;
  socialLinks?: SocialLink[];
};

export default function FooterSimple({ copyrightText, socialLinks = [] }: Props) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#111',
        color: '#fff',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          //   justifyContent="space-between"
          //   alignItems="center"
          spacing={2}
        >
          {/* LEFT */}
          <Typography variant="body2">{copyrightText || '© 2026 All Rights Reserved'}</Typography>

          {/* RIGHT */}
          <Stack direction="row" spacing={3}>
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    '&:hover': {
                      opacity: 0.7,
                    },
                  }}
                >
                  {item.platform}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
