// src/app/layout.tsx
import './globals.css'
import React, { ReactNode } from 'react'
import Providers from './providers'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* everything inside <Providers> is client‐side */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
