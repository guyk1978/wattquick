"use client";

import { Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { cn } from "@/lib/utils";

type PWAInstallerProps = {
  className?: string;
  /** Visual variant for grid nav vs site header */
  variant?: "grid" | "header";
};

/**
 * Square Install control for the header/grid nav.
 * Hidden with `display: none` until `beforeinstallprompt` fires;
 * disappears again once the app is installed.
 */
export function PWAInstaller({
  className,
  variant = "grid",
}: PWAInstallerProps) {
  const { canInstall, promptInstall } = usePWAInstall();

  return (
    <button
      type="button"
      className={cn(
        "pwa-install-btn",
        variant === "grid" && "pwa-install-btn--grid",
        canInstall && "pwa-install-btn--available",
        className
      )}
      onClick={() => void promptInstall()}
      aria-label="Install WattQuick app"
      title="Install app"
      hidden={!canInstall}
      tabIndex={canInstall ? 0 : -1}
      aria-hidden={!canInstall}
    >
      <Download className="size-4" strokeWidth={2} aria-hidden />
    </button>
  );
}
