"use client";

import { useCallback, useEffect, useState } from "react";
import { activateConsentScripts } from "@/lib/consent-scripts";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentStatus,
} from "@/lib/cookie-consent";

export function useCookieConsent() {
  const [status, setStatus] = useState<CookieConsentStatus | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [declinedAttempt, setDeclinedAttempt] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setStatus(stored);
    setHydrated(true);

    if (stored === "granted") {
      activateConsentScripts();
    }
  }, []);

  const isOverlayActive = hydrated && status !== "granted";

  useEffect(() => {
    if (!isOverlayActive) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOverlayActive]);

  const accept = useCallback(() => {
    writeCookieConsent("granted");
    setStatus("granted");
    setDeclinedAttempt(false);
    activateConsentScripts();
  }, []);

  const decline = useCallback(() => {
    writeCookieConsent("denied");
    setStatus("denied");
    setDeclinedAttempt(true);
  }, []);

  const showBanner = isOverlayActive;

  return {
    status,
    hydrated,
    isOverlayActive,
    showBanner,
    declinedAttempt,
    accept,
    decline,
  };
}
