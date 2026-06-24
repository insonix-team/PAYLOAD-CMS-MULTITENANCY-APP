'use client';

import Link from 'next/link';

import { Box, Container, Typography, Stack, TextField, Button } from '@mui/material';

type FooterLink = {
  label: string;
  url: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type Props = {
  columns?: FooterColumn[];
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
};

export default function FooterColumns({ columns = [], newsletterTitle, newsletterPlaceholder }: Props) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0f172a',
        color: '#fff',
        pt: 8,
        pb: 4,
        mt: 10,
      }}
    >
      <Container maxWidth="xl">
        {/* TOP SECTION */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'space-between',
          }}
        >
          {/* FOOTER COLUMNS */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              flex: 1,
            }}
          >
            {columns.map((column, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: {
                    xs: '100%',
                    sm: '220px',
                    md: '180px',
                  },
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  {column.title}
                </Typography>

                <Stack spacing={1.5}>
                  {column.links?.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url}
                      style={{
                        textDecoration: 'none',
                        color: '#cbd5e1',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          transition: '0.2s',

                          '&:hover': {
                            color: '#fff',
                          },
                        }}
                      >
                        {link.label}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          {/* NEWSLETTER */}
          <Box
            sx={{
              width: {
                xs: '100%',
                md: '350px',
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              {newsletterTitle || 'Subscribe'}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: '#cbd5e1',
              }}
            >
              Get latest updates and news.
            </Typography>

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={1}
            >
              <TextField
                fullWidth
                size="small"
                placeholder={newsletterPlaceholder || 'Enter your email'}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',

                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <Button
                variant="contained"
                size="large"
                sx={{
                  minWidth: 120,
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* BOTTOM */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 6,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#94a3b8',
            }}
          >
            © 2026 All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
