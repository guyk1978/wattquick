"use client";

import { useCallback, useEffect, useState } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type PWAInstallerProps = {
  className?: string;
  /** Visual variant for grid nav vs site header */
  variant?: "grid" | "header";
};

/**
 * Listens for `beforeinstallprompt`, stores the deferred prompt,
 * and renders an Install button only when the app is installable.
 */
export function PWAInstaller({
  className,
  variant = "grid",
}: PWAInstallerProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;
    if (standalone) return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    } else {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  if (!deferredPrompt) return null;

  return (
    <button
      type="button"
      className={cn(
        variant === "grid" ? "grid-nav__library-btn pwa-install-btn" : "pwa-install-btn",
        className
      )}
      onClick={() => void handleInstallClick()}
      aria-label="Install WattQuick app"
    >
      <Download className="size-4" aria-hidden />
      <span className="pwa-install-btn__label">Install</span>
    </button>
  );
}

export type { BeforeInstallPromptEvent };
