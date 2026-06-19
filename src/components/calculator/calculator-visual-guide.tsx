"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import {
  CALCULATOR_VISUAL_GUIDES,
  hasCalculatorVisualGuide,
} from "@/lib/calculator-visual-guides";
import { CalculatorVisualGuideModal } from "@/components/calculator/calculator-visual-guide-modal";
import { cn } from "@/lib/utils";

interface CalculatorVisualGuideProps {
  calculatorId: CalculatorId;
  className?: string;
}

export function CalculatorVisualGuide({
  calculatorId,
  className,
}: CalculatorVisualGuideProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!hasCalculatorVisualGuide(calculatorId)) {
    return null;
  }

  const guide = CALCULATOR_VISUAL_GUIDES[calculatorId];
  if (!guide) return null;

  const { calculatorTitle, caption, Illustration } = guide;

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={cn("calculator-visual-guide-btn", className)}
        aria-haspopup="dialog"
        aria-expanded={modalOpen}
      >
        <PencilLine className="size-3.5 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
        <span>Visual Guide</span>
        <span aria-hidden>💡</span>
      </button>

      <CalculatorVisualGuideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={calculatorTitle}
      >
        <div className="calculator-visual-guide-modal__illustration-wrap">
          <Illustration />
        </div>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {caption}
        </p>
      </CalculatorVisualGuideModal>
    </>
  );
}
