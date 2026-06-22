"use client";

import type { ReactNode } from "react";
import { BlueprintLeftSidebarProvider } from "@/components/blueprint/blueprint-left-sidebar-context";
import { BlueprintRightSidebarProvider } from "@/components/blueprint/blueprint-right-sidebar-context";
import { cn } from "@/lib/utils";

interface BlueprintShellFrameProps {
  children: ReactNode;
  className?: string;
}

export function BlueprintShellFrame({ children, className }: BlueprintShellFrameProps) {
  return (
    <BlueprintLeftSidebarProvider>
      <BlueprintRightSidebarProvider>
        <div className={cn("calculator-page-shell calculator-blueprint-shell", className)}>
          {children}
        </div>
      </BlueprintRightSidebarProvider>
    </BlueprintLeftSidebarProvider>
  );
}
