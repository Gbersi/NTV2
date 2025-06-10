'use client';
import { useEffect, useRef, useState } from 'react';

interface AnimatedPriceProps {
  value: number;
  duration?: number;
  prefix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}

export default function AnimatedPrice({
  value,
  duration = 700,
  prefix = '$',
  decimals = 2,
  style,
}: AnimatedPriceProps) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const diff = end - start;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const current = start + diff * pct;
      setDisplay(current);

      if (pct < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = value;
        setDisplay(value);
      }
    }

    cancelAnimationFrame(raf.current!);
    raf.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf.current!);
  }, [value, duration]);

  return (
    <span style={style}>
      {prefix}
      {display.toFixed(decimals)}
    </span>
  );
}
