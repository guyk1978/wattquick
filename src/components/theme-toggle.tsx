"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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
        "theme-toggle group relative h-8 w-[3.25rem] shrink-0 rounded-full border p-0.5",
        "transition-[border-color,background,box-shadow] duration-300 ease-out",
        "hover:scale-[1.03] active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark
          ? "border-border/70 bg-zinc-800/90 shadow-inner shadow-black/25"
          : "border-amber-300/70 bg-gradient-to-r from-amber-100 via-amber-50 to-sky-100 shadow-sm shadow-amber-200/50"
      )}
    >
      <span
        className={cn(
          "theme-toggle__thumb absolute top-0.5 left-0.5 flex size-7 items-center justify-center rounded-full",
          "shadow-md transition-[transform,background,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "group-hover:shadow-lg",
          isDark
            ? "translate-x-[1.35rem] bg-zinc-700 text-amber-300"
            : "translate-x-0 bg-white text-amber-500"
        )}
      >
        <span
          className={cn(
            "relative block size-4 transition-transform duration-300",
            isDark ? "rotate-[-25deg] scale-95" : "rotate-0 scale-100"
          )}
          aria-hidden
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>

      <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-full transition-opacity duration-300",
          isDark ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="theme-toggle__stars absolute inset-0" />
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-full">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="8"
          y1="1.5"
          x2="8"
          y2="3"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          transform={`rotate(${deg} 8 8)`}
          className="origin-center"
        />
      ))}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-full">
      <path
        d="M11.2 2.4a5.5 5.5 0 1 0 2.4 10.1 4.5 4.5 0 0 1-2.4-10.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
