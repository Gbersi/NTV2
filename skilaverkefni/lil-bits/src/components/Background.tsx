// src/components/Background.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Background() {
  const pathname = usePathname() || '/';
  const [offsetY, setOffsetY] = useState(0);

  let img = '/images/lilbits-landingpage.png';
  if (pathname.startsWith('/dish')) img = '/images/lilbits-dishes2.png';
  if (pathname.startsWith('/drinks')) img = '/images/lilbits-drinks.png';
  if (pathname.startsWith('/order')) img = '/images/lilbits-order-bg.png';
  if (pathname.startsWith('/receipt')) img = '/images/lilbits-receipt.png';

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.05);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        backgroundPosition: `center ${-offsetY}px`,
        willChange: 'background-position',
      }}
    />
  );
}
