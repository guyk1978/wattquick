"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number | null;
  decimals?: number;
  className?: string;
  suffix?: string;
}

/** Odometer-style count-up for dashboard result numbers */
export function AnimatedCounter({
  target,
  decimals = 0,
  className,
  suffix,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const prevTarget = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (target === null) {
      setDisplay(0);
      prevTarget.current = null;
      return;
    }

    const from = prevTarget.current ?? 0;
    prevTarget.current = target;
    const start = performance.now();
    const duration = 520;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(from + (target - from) * eased);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  if (target === null) return null;

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : String(Math.round(display));

  return (
    <span className={cn("tabular-nums", className)}>
      {formatted}
      {suffix}
    </span>
  );
}
