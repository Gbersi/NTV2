// src/hooks/usePersistedState.ts
import { useState, useEffect } from 'react';
export function usePersistedState<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, setVal] as const;
}
