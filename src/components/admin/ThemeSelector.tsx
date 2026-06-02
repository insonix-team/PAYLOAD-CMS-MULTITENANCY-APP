'use client'

import { useEffect, useState } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Card, CardActionArea, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material'

const themes = [
  {
    label: 'Blue',
    value: 'blue',
    preview: {
      primary: '#2563eb',
      secondary: '#60a5fa',
      bg: '#ffffff',
      text: '#111827',
      surface: '#f8fafc',
      font: 'Inter',
    },
  },
  {
    label: 'Green',
    value: 'green',
    preview: {
      primary: '#16a34a',
      secondary: '#4ade80',
      bg: '#f0fdf4',
      text: '#052e16',
      surface: '#dcfce7',
      font: 'Poppins',
    },
  },
  {
    label: 'Dark',
    value: 'dark',
    preview: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      bg: '#0f172a',
      text: '#f8fafc',
      surface: '#1e293b',
      font: 'Roboto',
    },
  },
]

export const ThemeSelector = ({ value, onChange }: any) => {
  const [selectedValue, setSelectedValue] = useState(value || 'blue')

  useEffect(() => {
    if (value) {
      setSelectedValue(value)
    }
  }, [value])

  const selectedTheme = themes.find((theme) => theme.value === selectedValue) || themes[0]

  const handleSelect = async (val: string) => {
    try {
      // INSTANT UI UPDATE
      setSelectedValue(val)

      // PAYLOAD FIELD UPDATE
      onChange?.(val)

      if (typeof window === 'undefined') return

      const pathname = window.location.pathname

      let match = pathname.match(/\/collections\/tenants\/([^/]+)/)

      if (!match) {
        match = pathname.match(/\/admin\/collections\/tenants\/([^/]+)/)
      }

      let id = match?.[1]

      if (!id) {
        const params = new URLSearchParams(window.location.search)
        id = params.get('id') || undefined
      }

      if (!id) return

      // AUTO SAVE
      await fetch(`/api/tenants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          theme: val,
        }),
      })
    } catch (err) {
      console.error('Failed to auto-save tenant theme', err)
    }
  }

  return (
    <Stack spacing={4}>
      {/* THEME CARDS */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {themes.map((theme) => {
          const isActive = selectedValue === theme.value

          return (
            <Card
              key={theme.value}
              elevation={isActive ? 8 : 1}
              sx={{
                width: 240,
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all .25s ease',
                border: isActive ? '2px solid' : '1px solid',
                borderColor: isActive ? theme.preview.primary : 'divider',
                transform: isActive ? 'translateY(-4px)' : 'none',
                boxShadow: isActive ? `0 10px 30px ${theme.preview.primary}30` : undefined,

                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {isActive && (
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Selected"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    backgroundColor: theme.preview.primary,
                    color: '#fff',
                    fontWeight: 600,
                  }}
                />
              )}

              <CardActionArea onClick={() => handleSelect(theme.value)}>
                {/* PREVIEW */}
                <Box
                  sx={{
                    backgroundColor: theme.preview.bg,
                    color: theme.preview.text,
                    p: 2,
                    minHeight: 180,
                  }}
                >
                  {/* NAVBAR */}
                  <Box
                    sx={{
                      height: 34,
                      backgroundColor: theme.preview.primary,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />

                  {/* CONTENT */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontFamily: theme.preview.font,
                    }}
                  >
                    Dashboard Heading
                  </Typography>

                  <Box
                    sx={{
                      height: 10,
                      width: '75%',
                      backgroundColor: theme.preview.secondary,
                      borderRadius: 10,
                      mb: 1,
                    }}
                  />

                  <Box
                    sx={{
                      height: 10,
                      width: '55%',
                      backgroundColor: `${theme.preview.text}25`,
                      borderRadius: 10,
                      mb: 3,
                    }}
                  />

                  {/* BUTTON */}
                  <Box
                    sx={{
                      width: 90,
                      height: 34,
                      borderRadius: 2,
                      backgroundColor: theme.preview.primary,
                    }}
                  />

                  {/* SURFACE */}
                  <Paper
                    elevation={0}
                    sx={{
                      mt: 3,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: theme.preview.surface,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.preview.text,
                        fontFamily: theme.preview.font,
                      }}
                    >
                      Theme Preview Card
                    </Typography>
                  </Paper>
                </Box>

                {/* LABEL */}
                <Box
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: isActive ? `${theme.preview.primary}10` : 'background.paper',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {theme.label}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>

      {/* SELECTED THEME DETAILS */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 3,
            py: 2,
            background: `linear-gradient(
              135deg,
              ${selectedTheme.preview.primary},
              ${selectedTheme.preview.secondary}
            )`,
            color: '#fff',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Selected Theme Details
          </Typography>

          <Typography variant="body2">{selectedTheme.label} Theme Configuration</Typography>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ThemeColorRow label="Primary Color" value={selectedTheme.preview.primary} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ThemeColorRow label="Secondary Color" value={selectedTheme.preview.secondary} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ThemeColorRow label="Background Color" value={selectedTheme.preview.bg} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ThemeColorRow label="Text Color" value={selectedTheme.preview.text} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ThemeColorRow label="Surface Color" value={selectedTheme.preview.surface} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ThemeInfoRow label="Font Family" value={selectedTheme.preview.font} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* LIVE PREVIEW */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            Live Theme Preview
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: selectedTheme.preview.bg,
              color: selectedTheme.preview.text,
              border: '1px solid',
              borderColor: 'divider',
              fontFamily: selectedTheme.preview.font,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Modern Dashboard Interface
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              This preview demonstrates how your tenant dashboard will appear with the selected theme.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Box
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: selectedTheme.preview.primary,
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                Primary Button
              </Box>

              <Box
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: selectedTheme.preview.surface,
                  color: selectedTheme.preview.text,
                  border: '1px solid',
                  borderColor: 'divider',
                  fontWeight: 600,
                }}
              >
                Secondary Button
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Stack>
  )
}

const ThemeColorRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack spacing={1}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>

      <Stack direction="row" spacing={1.5}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            backgroundColor: value,
            border: '1px solid',
            borderColor: 'divider',
          }}
        />

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  )
}

const ThemeInfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack spacing={1}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
    </Stack>
  )
}

export default ThemeSelector
