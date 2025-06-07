// src/components/Footer.tsx
'use client'

import React from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#fff',
        py: 1,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        alignItems: 'center',
        boxShadow: '0 -1px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* We no longer supply level="body2"; instead rely on default or custom fontSize */}
      <Typography sx={{ fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'underline' }}>
        Privacy Policy
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'underline' }}>
        Terms
      </Typography>
      <Typography sx={{ fontSize: '0.875rem' }}>© 2025 Lil Bits Inc.</Typography>
    </Box>
  )
}
