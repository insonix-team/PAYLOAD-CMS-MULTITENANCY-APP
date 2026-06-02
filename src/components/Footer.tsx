import { Box, Typography, Link as MuiLink, Container } from '@mui/material';
import Link from 'next/link';

type FooterProps = {
  data: any;
};

export const Footer = ({ data }: FooterProps) => {
  if (!data) return null;

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        borderTop: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Text */}
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {data.text}
        </Typography>

        {/* Links */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {data.links?.map((link: any, i: number) => (
            <MuiLink
              key={i}
              component={Link}
              href={link.url}
              underline="none"
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {link.label}
            </MuiLink>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
