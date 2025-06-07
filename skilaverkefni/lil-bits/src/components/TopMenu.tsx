// src/components/TopMenu.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Dish', href: '/dish' },
  { label: 'Drinks', href: '/drinks' },
  { label: 'Order', href: '/order' },
  { label: 'Receipt', href: '/receipt' },
];

export default function TopMenu() {
  // This flag ensures we only render on the client side
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname() || '/';

  if (!mounted) {
    // On the server, render nothing to avoid any style‐injection mismatch
    return null;
  }

  // Inline styles using your three-color theme
  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#3E6053', // primary
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.5rem',
    margin: 0,
  };

  const ulStyle: React.CSSProperties = {
    listStyle: 'none',
    display: 'flex',
    gap: '24px',
    margin: 0,
    padding: 0,
  };

  const linkStyleBase: React.CSSProperties = {
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.125rem',
    transition: 'color 0.2s, letterSpacing 0.2s',
  };

  const linkActiveStyle: React.CSSProperties = {
    color: '#C16757', // secondary accent
    letterSpacing: '0.5px',
    fontWeight: 600,
  };

  const linkInactiveStyle: React.CSSProperties = {
    color: '#FFFFFF',
    opacity: 0.9,
  };

  return (
    <nav style={navStyle}>
      {/* Logo + Title */}
      <div style={logoStyle}>
        <img
          src="/lil-bits-logo.png"
          alt="Lil Bits Logo"
          width={40}
          height={40}
        />
        <h1 style={titleStyle}>Gourmet Random</h1>
      </div>

      {/* Menu Items */}
      <ul style={ulStyle}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  ...linkStyleBase,
                  ...(isActive ? linkActiveStyle : linkInactiveStyle),
                }}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
