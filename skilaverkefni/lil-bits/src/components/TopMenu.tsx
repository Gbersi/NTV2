// src/components/TopMenu.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Box from '@mui/joy/Box'
import Image from 'next/image'

export default function TopMenu() {
  const pathname = usePathname() || '/'

  const leftLinks = [{ label: 'Home', href: '/' }]
  const rightLinks = [
    { label: 'Dishes', href: '/dish' },
    { label: 'Drinks', href: '/drinks' },
    { label: 'Order', href: '/order' },
    { label: 'Receipt', href: '/receipt' },
  ]

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        py: 1,
        backgroundColor: 'transparent',
      }}
    >
      {/* Left: Home + “Lil Bits” */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {leftLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              textDecoration: 'none',
              color:
                pathname === l.href ? 'var(--color-secondary)' : '#fff',
              fontSize: '1.1rem',
            }}
          >
            {l.label}
          </Link>
        ))}
        <Box
          component="span"
          sx={{
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          Lil Bits
        </Box>
      </Box>

      {/* Center: Logo */}
      <Box>
        <Image
          src="/lil-bits-logo.png"
          alt="Lil Bits Logo"
          width={48}
          height={48}
        />
      </Box>

      {/* Right: other menu items */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {rightLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              textDecoration: 'none',
              color:
                pathname === l.href
                  ? 'var(--color-secondary)'
                  : '#fff',
              fontSize: '1.1rem',
            }}
          >
            {l.label}
          </Link>
        ))}
      </Box>
    </Box>
  )
}
