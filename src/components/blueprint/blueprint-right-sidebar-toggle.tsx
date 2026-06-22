"use client";

import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useBlueprintRightSidebar } from "@/components/blueprint/blueprint-right-sidebar-context";
import { cn } from "@/lib/utils";

interface BlueprintRightSidebarToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function BlueprintRightSidebarToggle({
  className,
  showLabel = true,
}: BlueprintRightSidebarToggleProps) {
  const { collapsed, toggleCollapsed } = useBlueprintRightSidebar();

  return (
    <button
      type="button"
      className={cn("blueprint-sidebar-toggle", className)}
      onClick={toggleCollapsed}
      aria-expanded={!collapsed}
      aria-controls="blueprint-tools-sidebar"
      aria-label={collapsed ? "Show tools sidebar" : "Hide tools sidebar"}
    >
      {collapsed ? (
        <PanelRightOpen className="blueprint-sidebar-toggle__icon" strokeWidth={2} aria-hidden />
      ) : (
        <PanelRightClose className="blueprint-sidebar-toggle__icon" strokeWidth={2} aria-hidden />
      )}
      {showLabel ? (
        <span className="blueprint-sidebar-toggle__label">Tools</span>
      ) : null}
    </button>
  );
}
