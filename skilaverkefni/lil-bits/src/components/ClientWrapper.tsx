// src/components/ClientWrapper.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { ThemeProvider, GlobalStyles } from '@mui/joy';
import { Inter } from 'next/font/google';
import TopMenu from './TopMenu';
import { OrderProvider } from '../context/OrderContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { solidBg: '#3E6053', solidColor: '#fff' },
        danger: { solidBg: '#BA2329', solidColor: '#fff' },
        neutral: { solidBg: '#C16757', solidColor: '#fff' },
      },
    },
  },
  fontFamily: {
    body: inter.style.fontFamily,
    display: inter.style.fontFamily,
  },
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  // Only mount Joy/MUI providers on the client to avoid SSR/client mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // On the server, render nothing
    return null;
  }

  return (
    <CssVarsProvider theme={theme}>
      <ThemeProvider>
        <GlobalStyles
          styles={{
            html: { height: '100%' },
            body: {
              margin: 0,
              padding: 0,
              minHeight: '100%',
              fontFamily: inter.style.fontFamily,
              backgroundColor: 'background.body',
              display: 'flex',
              flexDirection: 'column',
            },
            '#__next': {
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
            },
            main: {
              flex: '1 0 auto',
            },
          }}
        />
        <OrderProvider>
          <TopMenu />
          <main style={{ flex: 1 }}>{children}</main>
          <ToastContainer position="bottom-right" />
        </OrderProvider>
      </ThemeProvider>
    </CssVarsProvider>
  );
}
