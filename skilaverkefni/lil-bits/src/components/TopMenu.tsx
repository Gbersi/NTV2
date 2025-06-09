// src/components/TopMenu.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/TopMenu.module.css';

export default function TopMenu() {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Dish', href: '/dish' },
    { label: 'Drinks', href: '/drinks' },
    { label: 'Order', href: '/order' },
    { label: 'Receipt', href: '/receipt' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img
          src="/lil-bits-logo.png"
          alt="Lil Bits Logo"
          className={styles.logoImg}
        />
        <span className={styles.wordmark}>Lil Bits</span>
      </div>

      <div className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
