// src/app/ClientWrapper.tsx
'use client'

import React from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import { OrderProvider } from 'context/OrderContext'
import TopMenu from 'components/TopMenu'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CssVarsProvider>
      <OrderProvider>
        <TopMenu />
        {children}
      </OrderProvider>
    </CssVarsProvider>
  )
}
