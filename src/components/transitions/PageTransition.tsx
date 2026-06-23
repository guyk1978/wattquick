"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ENTER_MS = 300;

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Subtle fade + 10px slide on client-side route changes (not on hard refresh).
 * CSS-only — no layout shift; transform/opacity only.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname() ?? "/";
  const skipFirstRef = useRef(true);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (skipFirstRef.current) {
      skipFirstRef.current = false;
      return;
    }

    setEntering(true);
    const timer = window.setTimeout(() => setEntering(false), ENTER_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={cn("page-transition", entering && "page-transition--enter")}>
      {children}
    </div>
  );
}
