import React, { ReactNode } from 'react'

interface StepContainerProps {
  index: number
  children: ReactNode
}

export default function StepContainer({
  index,
  children,
}: StepContainerProps) {
  return (
    <div
      className="step-container"
      data-step={index}
      style={{ padding: 16, border: '1px solid var(--color-border)', margin: '1rem 0' }}
    >
      {children}
    </div>
  )
}
