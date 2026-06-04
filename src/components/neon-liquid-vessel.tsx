"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BUBBLES: {
  left: string;
  size: string;
  delay: string;
  duration: string;
  drift: string;
}[] = [
  { left: "12%", size: "6px", delay: "0s", duration: "2.8s", drift: "-3px" },
  { left: "28%", size: "4px", delay: "0.6s", duration: "3.2s", drift: "4px" },
  { left: "42%", size: "8px", delay: "1.1s", duration: "2.4s", drift: "-2px" },
  { left: "55%", size: "5px", delay: "0.3s", duration: "3.6s", drift: "5px" },
  { left: "68%", size: "7px", delay: "1.8s", duration: "2.6s", drift: "-4px" },
  { left: "78%", size: "4px", delay: "0.9s", duration: "3.1s", drift: "2px" },
  { left: "88%", size: "6px", delay: "2.2s", duration: "2.9s", drift: "-3px" },
  { left: "36%", size: "3px", delay: "2.6s", duration: "3.4s", drift: "3px" },
  { left: "18%", size: "5px", delay: "1.4s", duration: "3s", drift: "2px" },
  { left: "62%", size: "4px", delay: "2s", duration: "2.7s", drift: "-2px" },
  { left: "48%", size: "6px", delay: "0.5s", duration: "3.3s", drift: "3px" },
];

interface NeonLiquidVesselProps {
  className?: string;
}

/** Glass vessel with neon blue liquid and rising bubbles — homepage hero accent */
export function NeonLiquidVessel({ className }: NeonLiquidVesselProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div
      className={cn(
        "neon-liquid-vessel mx-auto mb-8 flex justify-center sm:mb-10",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-500",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "neon-liquid-vessel__shell relative h-[5.5rem] w-[14rem] overflow-hidden rounded-2xl sm:h-24 sm:w-[16.5rem]",
          reducedMotion && "neon-liquid-vessel--static"
        )}
      >
        <div className="neon-liquid-vessel__glass absolute inset-0 rounded-2xl" />
        <div className="neon-liquid-vessel__liquid absolute inset-x-2.5 bottom-2 top-2 overflow-hidden rounded-xl">
          <div className="neon-liquid-vessel__body absolute inset-x-0 bottom-0 h-[92%] overflow-hidden rounded-lg">
            <div className="neon-liquid-vessel__fill absolute inset-0" />
            <div className="neon-liquid-vessel__caustics pointer-events-none absolute inset-0" />
            <div className="neon-liquid-vessel__surface absolute inset-x-0 top-0 h-4" />
            {BUBBLES.map((bubble, i) => (
              <span
                key={i}
                className="neon-liquid-vessel__bubble absolute bottom-0 rounded-full"
                style={
                  {
                    left: bubble.left,
                    width: bubble.size,
                    height: bubble.size,
                    "--bubble-delay": bubble.delay,
                    "--bubble-duration": bubble.duration,
                    "--bubble-drift": bubble.drift,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
        <div className="neon-liquid-vessel__rim pointer-events-none absolute inset-0 rounded-2xl" />
        <div className="neon-liquid-vessel__specular pointer-events-none absolute inset-0 rounded-2xl" />
      </div>
    </div>
  );
}
