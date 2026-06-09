"use client";

import { cn } from "@/lib/utils";

interface HeaderNavTooltipProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function HeaderNavTooltip({
  label,
  children,
  className,
}: HeaderNavTooltipProps) {
  return (
    <span
      className={cn(
        "header-nav-tooltip group/tooltip relative inline-flex h-full items-stretch",
        className
      )}
    >
      {children}
      <span
        role="tooltip"
        className="header-nav-tooltip__bubble pointer-events-none absolute left-1/2 top-[calc(100%+0.375rem)] z-[70] -translate-x-1/2 whitespace-nowrap opacity-0 transition-[opacity,visibility] duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 invisible group-hover/tooltip:visible group-focus-within/tooltip:visible"
      >
        {label}
      </span>
    </span>
  );
}
