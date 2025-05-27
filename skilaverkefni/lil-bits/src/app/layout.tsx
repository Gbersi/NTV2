// src/app/layout.tsx
import './globals.css'
import React, { ReactNode } from 'react'
import ClientLayout from '../components/ClientLayout'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* everything inside here is rendered on the client */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
