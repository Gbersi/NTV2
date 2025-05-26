'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { ThemeProvider } from '@mui/joy'
import { GlobalStyles } from '@mui/system'
import { Inter } from 'next/font/google'
import { OrderProvider } from 'context/OrderContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Dynamically import the client-only TopMenu
const TopMenu = dynamic(() => import('../components/TopMenu'), {
  ssr: false,
})

const inter = Inter({ subsets: ['latin'] })
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary:   { solidBg: '#3E6053', solidColor: '#fff' },
        neutral:   { solidBg: '#C16757', solidColor: '#fff' },
        danger:    { solidBg: '#BA2329', solidColor: '#fff' },
      },
    },
  },
  fontFamily: {
    body:    inter.style.fontFamily,
    display: inter.style.fontFamily,
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'

  // pick background per route
  let bgUrl = '/lilbits-bg1.png'
  if (pathname === '/')            bgUrl = '/lilbits-landingpage.png'
  else if (pathname.startsWith('/dish'))    bgUrl = '/lilbits-dishes2.png'
  else if (pathname.startsWith('/drinks'))  bgUrl = '/lilbits-drinks.png'
  else if (pathname.startsWith('/order'))   bgUrl = '/lilbits-order-bg.png'
  else if (pathname.startsWith('/receipt')) bgUrl = '/lilbits-receipt.png'

  return (
    <CssVarsProvider theme={theme}>
      <ThemeProvider>
        <GlobalStyles
          styles={{
            html: { height: '100%' },
            body: {
              margin: 0,
              padding: 0,
              height: '100%',
              fontFamily: inter.style.fontFamily,
              backgroundImage: `url('${bgUrl}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              display: 'flex',
              flexDirection: 'column',
            },
            '#__next': {
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
            },
            main: { flex: '1 0 auto' },
          }}
        />
        <OrderProvider>
          <TopMenu />
          <main>{children}</main>
          <ToastContainer position="bottom-right" />
        </OrderProvider>
      </ThemeProvider>
    </CssVarsProvider>
  )
}
