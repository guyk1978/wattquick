"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useBlueprintRightSidebar } from "@/components/blueprint/blueprint-right-sidebar-context";
import { cn } from "@/lib/utils";

interface BlueprintRightSidebarWidenToggleProps {
  className?: string;
}

export function BlueprintRightSidebarWidenToggle({
  className,
}: BlueprintRightSidebarWidenToggleProps) {
  const { wide, toggleWide } = useBlueprintRightSidebar();

  return (
    <button
      type="button"
      className={cn("blueprint-sidebar-toggle", className)}
      onClick={toggleWide}
      aria-pressed={wide}
      aria-label={wide ? "Use normal sidebar width" : "Widen sidebar for long labels"}
      title={wide ? "Normal width" : "Widen sidebar"}
    >
      {wide ? (
        <Minimize2 className="blueprint-sidebar-toggle__icon" strokeWidth={2} aria-hidden />
      ) : (
        <Maximize2 className="blueprint-sidebar-toggle__icon" strokeWidth={2} aria-hidden />
      )}
      <span className="sr-only">{wide ? "Normal width" : "Widen"}</span>
    </button>
  );
}
