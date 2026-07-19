"use client";

import { useEffect } from "react";

/**
 * Registers the WattQuick service worker once on the client.
 * Required for installability (beforeinstallprompt) and basic offline support.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      void navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration can fail on insecure origins — leave the page usable.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
