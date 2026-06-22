"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useBlueprintLeftSidebar } from "@/components/blueprint/blueprint-left-sidebar-context";
import { cn } from "@/lib/utils";

interface BlueprintLeftSidebarToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function BlueprintLeftSidebarToggle({
  className,
  showLabel = true,
}: BlueprintLeftSidebarToggleProps) {
  const { collapsed, toggle } = useBlueprintLeftSidebar();

  return (
    <button
      type="button"
      className={cn("blueprint-sidebar-toggle", className)}
      onClick={toggle}
      aria-expanded={!collapsed}
      aria-controls="blueprint-categories-sidebar"
      aria-label={collapsed ? "Show categories sidebar" : "Hide categories sidebar"}
    >
      {collapsed ? (
        <PanelLeftOpen className="blueprint-sidebar-toggle__icon" strokeWidth={2} aria-hidden />
      ) : (
        <PanelLeftClose className="blueprint-sidebar-toggle__icon" strokeWidth={2} aria-hidden />
      )}
      {showLabel ? (
        <span className="blueprint-sidebar-toggle__label">
          {collapsed ? "Categories" : "Hide"}
        </span>
      ) : null}
    </button>
  );
}
