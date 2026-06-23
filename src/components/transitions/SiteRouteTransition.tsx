"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import {
  SlidingDoors,
  type SlidingDoorsPhase,
} from "@/components/transitions/SlidingDoors";

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

interface SiteRouteTransitionProps {
  children: ReactNode;
}

/**
 * Plays SlidingDoors on every client route change (and once on first paint).
 * Zero overhead while idle — overlay mounts only during the ~0.8s animation.
 * Mounted from root layout — remove that import to revert entirely.
 */
export function SiteRouteTransition({ children }: SiteRouteTransitionProps) {
  const pathname = usePathname() ?? "/";
  const prefersReducedMotion = useReducedMotion();
  const previousPathRef = useRef<string | null>(null);
  const [phase, setPhase] = useState<SlidingDoorsPhase | null>(null);
  const handleComplete = useCallback(() => setPhase(null), []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const previous = previousPathRef.current;
    const current = normalizePath(pathname);

    if (previous === null) {
      setPhase("opening");
    } else if (normalizePath(previous) !== current) {
      setPhase("opening");
    }

    previousPathRef.current = pathname;
  }, [pathname, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <SlidingDoors key={phase ?? "idle"} phase={phase} onComplete={handleComplete} />
    </>
  );
}
