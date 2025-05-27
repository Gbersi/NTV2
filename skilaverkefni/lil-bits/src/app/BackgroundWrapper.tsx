'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const pageBackgrounds: Record<string,string> = {
  '/':               "url('/images/lilbits-landingpage.png')",
  '/order':          "url('/images/lilbits-order-bg.png')",
  '/drinks':         "url('/images/lilbits-drinks.png')",
  '/receipt':        "url('/images/lilbits-receipt.png')",
  '/dish':           "url('/images/lilbits-dishes2.png')"
};

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bg = pageBackgrounds[pathname] ?? 'var(--bg-image)';
  return (
    <div
      style={
        { 
        
          '--bg-image': bg 
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
