"use client";

import { useEffect, useState } from "react";
import { PanelLeft, X } from "lucide-react";
import { CalculatorBlueprintCategorySidebar } from "@/components/calculator/calculator-blueprint-category-sidebar";
import type { CalculatorCategory, CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorToolsDrawerProps {
  calculatorId?: CalculatorId;
  activeCategory?: CalculatorCategory | null;
  className?: string;
}

/** Mobile / tablet: collapsible tools menu matching the desktop sidebar groups. */
export function CalculatorToolsDrawer({
  calculatorId,
  activeCategory,
  className,
}: CalculatorToolsDrawerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={cn("calculator-tools-drawer", className)}>
      <button
        type="button"
        className="calculator-tools-drawer__trigger"
        aria-expanded={open}
        aria-controls="blueprint-categories-drawer"
        onClick={() => setOpen(true)}
      >
        <PanelLeft className="size-4" aria-hidden />
        <span>Tools</span>
      </button>

      {open ? (
        <div className="calculator-tools-drawer__layer" role="presentation">
          <button
            type="button"
            className="calculator-tools-drawer__backdrop"
            aria-label="Close tools menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="calculator-tools-drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Browse tools"
          >
            <div className="calculator-tools-drawer__panel-header">
              <p className="calculator-tools-drawer__panel-title">Browse tools</p>
              <button
                type="button"
                className="calculator-tools-drawer__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <CalculatorBlueprintCategorySidebar
              calculatorId={calculatorId}
              activeCategory={activeCategory}
              variant="drawer"
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
