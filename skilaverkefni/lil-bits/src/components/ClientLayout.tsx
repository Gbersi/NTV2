'use client'

import React, { ReactNode } from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import Background from './Background'
import TopMenu from './TopMenu'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider>
      {/* picks the right image based on URL */}
      <Background />

      {/* your sticky header + nav links */}
      <TopMenu />

      {/* your page content */}
      <main>{children}</main>
    </CssVarsProvider>
  )
}
