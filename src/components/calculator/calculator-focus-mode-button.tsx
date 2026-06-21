"use client";

import { Maximize2 } from "lucide-react";
import { useCalculatorFocusMode } from "@/components/calculator/calculator-focus-mode-context";
import { cn } from "@/lib/utils";

interface CalculatorFocusModeButtonProps {
  className?: string;
}

export function CalculatorFocusModeButton({
  className,
}: CalculatorFocusModeButtonProps) {
  const { isOpen, open } = useCalculatorFocusMode();

  return (
    <button
      type="button"
      onClick={open}
      className={cn("calculator-focus-mode-btn", className)}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label="Open focus view — inputs and results only"
    >
      <Maximize2 className="size-3.5 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
      <span>Focus View</span>
    </button>
  );
}
