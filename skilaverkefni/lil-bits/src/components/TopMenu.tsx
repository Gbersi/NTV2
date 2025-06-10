'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '../styles/TopMenu.module.css';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Dish', href: '/dish' },
  { label: 'Drinks', href: '/drinks' },
  { label: 'Order', href: '/order' },
  { label: 'Receipt', href: '/receipt' },
];

export default function TopMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image
          src="/lil-bits-logo.png"
          alt="Lil Bits Logo"
          className={styles.logoImg}
          width={80}
          height={42}
          priority
        />
        <span className={styles.wordmark}>Lil Bits</span>
      </div>
      <div className={styles.menu}>
        {menuItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === item.href
              : pathname.startsWith(item.href);
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
