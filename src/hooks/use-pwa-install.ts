"use client";

import { useCallback, useEffect, useState } from "react";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/**
 * Captures the browser's `beforeinstallprompt` event so a custom Install
 * button can call `prompt()` later. Hides itself once the app is installed
 * (standalone display or `appinstalled`).
 */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (isStandaloneDisplay()) {
      setInstalled(true);
      return;
    }

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    const onDisplayModeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setInstalled(true);
        setDeferredPrompt(null);
      }
    };

    const standaloneMq = window.matchMedia("(display-mode: standalone)");

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    standaloneMq.addEventListener("change", onDisplayModeChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      standaloneMq.removeEventListener("change", onDisplayModeChange);
    };
  }, []);

  const canInstall = !installed && deferredPrompt != null;

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt || installed) return false;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (outcome === "accepted") {
      setInstalled(true);
      return true;
    }
    return false;
  }, [deferredPrompt, installed]);

  return {
    /** True when the deferred install prompt is available and the app is not already installed. */
    canInstall,
    /** True when running as an installed PWA (or just accepted install). */
    installed,
    /** Triggers the native install sheet via the stored beforeinstallprompt event. */
    promptInstall,
  };
}

/** @deprecated Prefer `usePWAInstall`. */
export const usePwaInstall = usePWAInstall;
