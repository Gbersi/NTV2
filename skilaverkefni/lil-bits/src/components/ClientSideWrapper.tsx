// src/components/ClientSideWrapper.tsx

'use client';

import React from 'react';
import ClientWrapper from './ClientWrapper';
import Background from './Background';

export default function ClientSideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientWrapper>
      <Background />
      {children}
    </ClientWrapper>
  );
}
