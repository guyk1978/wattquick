"use client";

import { Download } from "lucide-react";
import { HeaderNavTooltip } from "@/components/header-nav-tooltip";
import { InstallAppModal } from "@/components/install-app-modal";
import { usePwaInstall } from "@/hooks/use-pwa-install";

export function HeaderInstallAppButton() {
  const { installed, install, helpOpen, setHelpOpen } = usePwaInstall();

  if (installed) return null;

  return (
    <>
      <HeaderNavTooltip label="Install app" className="flex h-full items-stretch">
        <button
          type="button"
          onClick={() => void install()}
          className="glass-header__segment header-nav-link"
          aria-label="Install WattQuick app"
        >
          <Download className="size-[1.125rem]" strokeWidth={2} aria-hidden />
        </button>
      </HeaderNavTooltip>

      <InstallAppModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
