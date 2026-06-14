"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggleWithTooltip() {
  return <ThemeToggle />;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="theme-switch-wrap glass-header__action-item">
      <span className="theme-switch__label" id="theme-switch-label">
        {isDark ? "Dark" : "Light"}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-labelledby="theme-switch-label"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
        className={cn("theme-switch", isDark && "theme-switch--dark")}
      >
        <span className="theme-switch__thumb" aria-hidden />
      </button>
    </div>
  );
}
