import type { ReactNode } from "react";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { BlueprintListNav } from "@/components/blueprint/blueprint-list-nav";
import {
  SITE_BLUEPRINT_NAV_ITEMS,
  type SiteBlueprintPageId,
} from "@/lib/site-blueprint-nav";

interface SiteBlueprintLayoutProps {
  activeId: SiteBlueprintPageId;
  children: ReactNode;
}

export function SiteBlueprintLayout({ activeId, children }: SiteBlueprintLayoutProps) {
  return (
    <BlueprintHubShell
      rightNav={
        <BlueprintListNav
          title="Pages"
          items={SITE_BLUEPRINT_NAV_ITEMS}
          activeId={activeId}
        />
      }
    >
      {children}
    </BlueprintHubShell>
  );
}
