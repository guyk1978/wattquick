"use client";

import { PWAInstaller } from "@/components/pwa-installer";

/** Site header Install control — visible only when the PWA is installable. */
export function HeaderInstallAppButton() {
  return <PWAInstaller variant="header" />;
}
