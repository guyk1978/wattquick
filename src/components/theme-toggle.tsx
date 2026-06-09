"use client";

import { Moon, Sun } from "lucide-react";
import { HeaderNavTooltip } from "@/components/header-nav-tooltip";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggleWithTooltip() {
  const { theme } = useTheme();
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <HeaderNavTooltip label={label} className="flex h-full items-stretch">
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
        "theme-toggle glass-header__segment",
        "flex h-full min-w-[7rem] shrink-0 items-center px-2.5 sm:min-w-[7.5rem] sm:px-3",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <span className="theme-toggle__track flex w-full items-stretch gap-0.5">
        <span
          className={cn(
            "theme-toggle__option",
            !isDark && "theme-toggle__option--active"
          )}
          aria-hidden
        >
          <Sun className="size-[1.125rem]" strokeWidth={2} />
        </span>
        <span
          className={cn(
            "theme-toggle__option",
            isDark && "theme-toggle__option--active"
          )}
          aria-hidden
        >
          <Moon className="size-[1.125rem]" strokeWidth={2} />
        </span>
      </span>
      <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>
    </button>
  );
}
