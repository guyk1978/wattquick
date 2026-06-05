"use client";

import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number | null;
  decimals?: number;
  className?: string;
  suffix?: string;
}

/** Static numeric display (no count-up animation) */
export function AnimatedCounter({
  target,
  decimals = 0,
  className,
  suffix,
}: AnimatedCounterProps) {
  if (target === null) return null;

  const formatted =
    decimals > 0 ? target.toFixed(decimals) : String(Math.round(target));

  return (
    <span className={cn("tabular-nums", className)}>
      {formatted}
      {suffix}
    </span>
  );
}
