"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_INDUSTRIAL = [0.45, 0.05, 0.2, 1] as const;

const CLOSE_DURATION = 0.32;
const OPEN_DURATION = 0.48;

export type SlidingDoorsPhase = "opening" | "closing";

export interface SlidingDoorsProps {
  /** Which animation to run; omit to hide the overlay. */
  phase: SlidingDoorsPhase | null;
  onComplete?: () => void;
  className?: string;
}

/**
 * Industrial Matte sliding doors — two panels meet at center, then slide back out.
 * Fixed overlay: does not affect document flow or cause layout shift.
 */
export function SlidingDoors({ phase, onComplete, className }: SlidingDoorsProps) {
  const completedRef = useRef(false);

  const handleAnimationComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  if (!phase) return null;

  const isOpening = phase === "opening";
  const totalDuration = isOpening
    ? CLOSE_DURATION + OPEN_DURATION
    : CLOSE_DURATION;
  const closeFraction = isOpening ? CLOSE_DURATION / totalDuration : 1;

  const leftKeyframes = isOpening ? ["-100%", "0%", "-100%"] : ["-100%", "0%"];
  const rightKeyframes = isOpening ? ["100%", "0%", "100%"] : ["100%", "0%"];
  const keyframeTimes = isOpening ? [0, closeFraction, 1] : [0, 1];

  return (
    <div
      className={cn("sliding-doors", className)}
      aria-hidden
      data-phase={phase}
    >
      <motion.div
        className="sliding-doors__scrim"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? [1, 1, 0] : 1 }}
        transition={{
          duration: totalDuration,
          times: keyframeTimes,
          ease: "linear",
        }}
      />

      <motion.div
        className="sliding-doors__panel sliding-doors__panel--left"
        initial={false}
        animate={{ x: leftKeyframes }}
        transition={{
          duration: totalDuration,
          times: keyframeTimes,
          ease: EASE_INDUSTRIAL,
        }}
      >
        <div className="sliding-doors__panel-inner">
          <span className="sliding-doors__panel-label">WQ</span>
        </div>
      </motion.div>

      <motion.div
        className="sliding-doors__panel sliding-doors__panel--right"
        initial={false}
        animate={{ x: rightKeyframes }}
        transition={{
          duration: totalDuration,
          times: keyframeTimes,
          ease: EASE_INDUSTRIAL,
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className="sliding-doors__panel-inner">
          <span className="sliding-doors__panel-label">WQ</span>
        </div>
      </motion.div>

      <motion.div
        className="sliding-doors__seam"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? [0, 1, 0] : [0, 1] }}
        transition={{
          duration: totalDuration,
          times: keyframeTimes,
          ease: "linear",
        }}
      />
    </div>
  );
}
