'use client';

import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

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
        px: 4,
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
        fontSize: '0.875rem',
      }}
    >
      <Typography component="span" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
        Privacy Policy
      </Typography>
      <Typography component="span" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
        Terms
      </Typography>
      <Typography component="span">© 2025 Lil Bits Inc.</Typography>
    </Box>
  );
}
