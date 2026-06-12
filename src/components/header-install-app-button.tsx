"use client";

import { Download } from "lucide-react";
import { HeaderNavItem } from "@/components/header-nav-item";
import { InstallAppModal } from "@/components/install-app-modal";
import { usePwaInstall } from "@/hooks/use-pwa-install";

export function HeaderInstallAppButton() {
  const { installed, install, helpOpen, setHelpOpen } = usePwaInstall();

  if (installed) return null;

  return (
    <>
      <HeaderNavItem
        label="Install"
        icon={Download}
        onClick={() => void install()}
        aria-label="Install WattQuick app"
        className="glass-header__action-item hidden lg:flex"
      />

      <InstallAppModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
