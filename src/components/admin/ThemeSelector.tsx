'use client'

import { Box, Card, CardActionArea, Typography } from '@mui/material'

const themes = [
  {
    label: 'Blue',
    value: 'blue',
    preview: {
      primary: '#2563eb',
      bg: '#ffffff',
      text: '#111827',
    },
  },
  {
    label: 'Green',
    value: 'green',
    preview: {
      primary: '#16a34a',
      bg: '#f0fdf4',
      text: '#052e16',
    },
  },
  {
    label: 'Dark',
    value: 'dark',
    preview: {
      primary: '#f59e0b',
      bg: '#0f172a',
      text: '#f8fafc',
    },
  },
]

export const ThemeSelector = ({ value, onChange }: any) => {
  const handleSelect = async (val: string) => {
    try {
      onChange?.(val)

      // Attempt to detect tenant ID from admin URL: /admin/collections/tenants/:id
      if (typeof window === 'undefined') return
      const pathname = window.location.pathname
      let match = pathname.match(/\/collections\/tenants\/([^/]+)/)
      if (!match) match = pathname.match(/\/admin\/collections\/tenants\/([^/]+)/)
      let id = match?.[1]

      // Fallback: try search params
      if (!id) {
        const params = new URLSearchParams(window.location.search)
        id = params.get('id') || undefined
      }

      if (!id) return

      await fetch(`/api/tenants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ theme: val }),
      })
    } catch (err) {
      // don't block UI on error
      // eslint-disable-next-line no-console
      console.error('Failed to auto-save tenant theme', err)
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {themes.map((theme) => {
        const isActive = value === theme.value

        return (
          <Card
            key={theme.value}
            sx={{
              width: 220,
              border: isActive ? '2px solid' : '1px solid',
              borderColor: isActive ? 'primary.main' : 'divider',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardActionArea onClick={() => handleSelect(theme.value)}>
              {/* PREVIEW */}
              <Box
                sx={{
                  backgroundColor: theme.preview.bg,
                  color: theme.preview.text,
                  p: 2,
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    height: 30,
                    backgroundColor: theme.preview.primary,
                    borderRadius: 1,
                    mb: 2,
                  }}
                />

                {/* Text */}
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Heading
                </Typography>

                <Box
                  sx={{
                    height: 10,
                    backgroundColor: theme.preview.primary,
                    width: '60%',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />

                {/* Button */}
                <Box
                  sx={{
                    height: 30,
                    width: 80,
                    backgroundColor: theme.preview.primary,
                    borderRadius: 2,
                  }}
                />
              </Box>

              {/* LABEL */}
              <Box sx={{ p: 1.5, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {theme.label}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        )
      })}
    </Box>
  )
}

export default ThemeSelector
