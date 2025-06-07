// src/app/layout.tsx

import React from 'react';
import ClientSideWrapper from '../components/ClientSideWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Everything inside ClientSideWrapper is client-only */}
        <ClientSideWrapper>
          {children}
        </ClientSideWrapper>
      </body>
    </html>
  );
}
