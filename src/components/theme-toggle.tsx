"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggleWithTooltip() {
  return (
    <div className="glass-header__action">
      <ThemeToggle />
      <span className="glass-header__action-label">Theme</span>
    </div>
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
        "theme-toggle glass-header__action-control",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <span className="theme-toggle__track">
        <span
          className={cn(
            "theme-toggle__option",
            !isDark && "theme-toggle__option--active"
          )}
          aria-hidden
        >
          <Sun className="glass-header__nav-icon" strokeWidth={2} />
        </span>
        <span
          className={cn(
            "theme-toggle__option",
            isDark && "theme-toggle__option--active"
          )}
          aria-hidden
        >
          <Moon className="glass-header__nav-icon" strokeWidth={2} />
        </span>
      </span>
      <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>
    </button>
  );
}
