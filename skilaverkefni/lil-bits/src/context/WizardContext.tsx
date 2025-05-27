// src/context/WizardContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type WizardStep = 0 | 1 | 2 | 3 | 4;
interface WizardContext {
  step: WizardStep;
  next: () => void;
  prev: () => void;
  goTo: (step: WizardStep) => void;
}
const C = createContext<WizardContext | null>(null);
export function useWizard() {
  const ctx = useContext(C);
  if (!ctx) throw new Error('useWizard must be inside WizardProvider');
  return ctx;
}
export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<WizardStep>(0);
  const next = () => setStep((s) => (s < 4 ? (s + 1) as WizardStep : s));
  const prev = () => setStep((s) => (s > 0 ? (s - 1) as WizardStep : s));
  const goTo = (s: WizardStep) => setStep(s);
  return (
    <C.Provider value={{ step, next, prev, goTo }}>
      {children}
    </C.Provider>
  );
}
