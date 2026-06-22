"use client";

import type { ReactNode } from "react";
import { useBlueprintLeftSidebar } from "@/components/blueprint/blueprint-left-sidebar-context";
import { useBlueprintRightSidebar } from "@/components/blueprint/blueprint-right-sidebar-context";
import { cn } from "@/lib/utils";

interface BlueprintShellWorkspaceProps {
  children: ReactNode;
  className?: string;
}

export function BlueprintShellWorkspace({
  children,
  className,
}: BlueprintShellWorkspaceProps) {
  const { collapsed: leftCollapsed, hydrated: leftHydrated } = useBlueprintLeftSidebar();
  const { collapsed: rightCollapsed, wide: rightWide, hydrated: rightHydrated } =
    useBlueprintRightSidebar();

  const hydrated = leftHydrated && rightHydrated;

  return (
    <div
      className={cn(
        "calculator-blueprint-shell__workspace",
        hydrated && leftCollapsed && "calculator-blueprint-shell__workspace--left-collapsed",
        hydrated && rightCollapsed && "calculator-blueprint-shell__workspace--right-collapsed",
        hydrated && rightWide && "calculator-blueprint-shell__workspace--right-wide",
        className
      )}
    >
      {children}
    </div>
  );
}
