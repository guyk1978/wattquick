"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";
import type { CalculatorCategory } from "@/data/calculator-types";
import {
  CATEGORY_VISUAL_GUIDES,
  hasCategoryVisualGuide,
} from "@/lib/category-visual-guides";
import { CalculatorVisualGuideModal } from "@/components/calculator/calculator-visual-guide-modal";
import { cn } from "@/lib/utils";

interface CategoryVisualGuideProps {
  category: CalculatorCategory;
  className?: string;
}

export function CategoryVisualGuide({
  category,
  className,
}: CategoryVisualGuideProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!hasCategoryVisualGuide(category)) {
    return null;
  }

  const guide = CATEGORY_VISUAL_GUIDES[category];
  if (!guide) return null;

  const { categoryTitle, caption, Illustration } = guide;

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
        title={categoryTitle}
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
