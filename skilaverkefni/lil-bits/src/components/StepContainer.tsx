// src/components/StepContainer.tsx
'use client'

import React, { ReactNode } from 'react'

interface StepContainerProps {
  children: ReactNode
  index: number
}

export default function StepContainer({
  children,
  index,
}: StepContainerProps) {
  return (
    <div
      className="step-container"
      data-step={index}
      style={{
        padding: 16,
        border: '1px solid var(--joy-palette-neutral-light)',
        margin: '1rem 0',
      }}
    >
      {children}
    </div>
  )
}
