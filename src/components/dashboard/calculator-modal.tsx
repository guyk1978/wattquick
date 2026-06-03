"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { recordCalculatorUse } from "@/lib/dashboard-storage";
import { cn } from "@/lib/utils";

interface CalculatorModalProps {
  calculatorId: CalculatorId | null;
  onClose: () => void;
}

export function CalculatorModal({ calculatorId, onClose }: CalculatorModalProps) {
  const meta = calculatorId ? getCalculatorMeta(calculatorId) : null;

  useEffect(() => {
    if (!calculatorId) return;
    recordCalculatorUse(calculatorId);
  }, [calculatorId]);

  useEffect(() => {
    if (!calculatorId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [calculatorId, onClose]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {calculatorId && meta ? (
        <motion.div
          key={calculatorId}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dashboard-calc-modal-title"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdrop}
        >
          <div
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            aria-hidden
          />
          <motion.div
            className={cn(
              "command-center-modal relative z-10 flex max-h-[92vh] w-full flex-col",
              "rounded-t-3xl border border-cyan-500/20 bg-slate-950/90 shadow-[0_0_60px_rgba(34,211,238,0.12)]",
              "sm:max-h-[88vh] sm:max-w-2xl sm:rounded-3xl"
            )}
            initial={{ y: 48, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 32, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/90">
                  Quick launch
                </p>
                <h2
                  id="dashboard-calc-modal-title"
                  className="truncate text-lg font-semibold text-white sm:text-xl"
                >
                  {meta.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-cyan-500/40 hover:bg-white/5 hover:text-white"
                aria-label="Close calculator"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              <CalculatorPanel id={calculatorId} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
