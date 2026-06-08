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

  useEffect(() => {
    const stored = readCookieConsent();
    setStatus(stored);
    setHydrated(true);

    if (stored === "granted") {
      activateConsentScripts();
    }
  }, []);

  const accept = useCallback(() => {
    writeCookieConsent("granted");
    setStatus("granted");
    activateConsentScripts();
  }, []);

  const decline = useCallback(() => {
    writeCookieConsent("denied");
    setStatus("denied");
  }, []);

  const showBanner = hydrated && status === null;

  return {
    status,
    hydrated,
    showBanner,
    accept,
    decline,
  };
}
