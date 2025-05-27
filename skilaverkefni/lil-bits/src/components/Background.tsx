// src/components/Background.tsx
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function Background() {
  const p = usePathname() || '/'
  let img = '/images/lilbits-landingpage.png'
  if (p.startsWith('/dish'   )) img = '/images/lilbits-dishes2.png'
  if (p.startsWith('/drinks' )) img = '/images/lilbits-drinks.png'
  if (p.startsWith('/order'  )) img = '/images/lilbits-order-bg.png'
  if (p.startsWith('/receipt')) img = '/images/lilbits-receipt.png'

  return (
    <div
      style={{
        position:         'fixed',
        inset:            0,
        zIndex:          -1,
        backgroundImage:  `url(${img})`,
        backgroundSize:   'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}
