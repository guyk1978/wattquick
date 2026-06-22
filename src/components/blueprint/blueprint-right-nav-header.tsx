"use client";

import { BlueprintRightSidebarToggle } from "@/components/blueprint/blueprint-right-sidebar-toggle";
import { BlueprintRightSidebarWidenToggle } from "@/components/blueprint/blueprint-right-sidebar-widen-toggle";

interface BlueprintRightNavHeaderProps {
  title: string;
}

export function BlueprintRightNavHeader({ title }: BlueprintRightNavHeaderProps) {
  return (
    <div className="calculator-blueprint-nav__header">
      <p className="calculator-blueprint-nav__title">{title}</p>
      <div className="calculator-blueprint-nav__controls">
        <BlueprintRightSidebarWidenToggle className="calculator-blueprint-nav__widen" />
        <BlueprintRightSidebarToggle
          className="calculator-blueprint-nav__collapse"
          showLabel={false}
        />
      </div>
    </div>
  );
}
