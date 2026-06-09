"use client";

import { HeaderNavTooltip } from "@/components/header-nav-tooltip";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggleWithTooltip() {
  const { theme } = useTheme();
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <HeaderNavTooltip label={label}>
      <ThemeToggle />
    </HeaderNavTooltip>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "theme-toggle group relative h-8 w-[3.25rem] shrink-0 rounded-none border p-0.5",
        "transition-[border-color,background] duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "border-border bg-[var(--matte-btn)]"
      )}
    >
      <span
        className={cn(
          "theme-toggle__thumb absolute top-0.5 left-0.5 flex size-7 items-center justify-center rounded-none border border-border/50",
          "transition-[transform,background,color] duration-200",
          isDark
            ? "translate-x-[1.35rem] bg-[var(--matte-btn-hover)] text-foreground"
            : "translate-x-0 bg-[var(--matte-card)] text-foreground"
        )}
      >
        <span className="relative block size-4" aria-hidden>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>

      <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
