// src/app/providers.tsx
'use client'

import React from 'react'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { ThemeProvider } from '@mui/joy'
import { GlobalStyles } from '@mui/system'
import { Inter } from 'next/font/google'
import TopMenu from '../components/TopMenu'
import Background from '../components/Background'     
import { OrderProvider } from '../context/OrderContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary:  { solidBg: '#3E6053', solidColor: '#fff' },
        neutral:  { solidBg: '#C16757', solidColor: '#fff' },
        danger:   { solidBg: '#BA2329', solidColor: '#fff' },
      },
    },
  },
  fontFamily: {
    body:    inter.style.fontFamily,
    display: inter.style.fontFamily,
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme}>
      <ThemeProvider>
        <GlobalStyles
          styles={{
            html: {
              height: '100%',
            },
            body: {
              margin: 0,
              padding: 0,
              minHeight: '100%',
              fontFamily: inter.style.fontFamily,
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
          {/* dynamic fixed‐background based on pathname */}
          <Background />
          {/* your top nav */}
          <TopMenu />
          {/* page content */}
          <main>{children}</main>
          {/* toasts if you use them */}
          <ToastContainer position="bottom-right" />
        </OrderProvider>
      </ThemeProvider>
    </CssVarsProvider>
  )
}
