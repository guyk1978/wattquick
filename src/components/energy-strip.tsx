"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type EnergySpeed = "eco" | "regular" | "xpower";

const SPEED_BUTTON_STYLES: Record<
  EnergySpeed,
  { active: string; hover: string }
> = {
  eco: {
    active:
      "border-emerald-500/70 bg-emerald-100 text-emerald-900 shadow-[0_0_12px_rgba(16,185,129,0.35)] dark:border-emerald-400/60 dark:bg-emerald-500/30 dark:text-white",
    hover:
      "hover:border-emerald-400/50 hover:bg-emerald-50 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-500/15",
  },
  regular: {
    active:
      "border-amber-500/70 bg-amber-100 text-amber-900 shadow-[0_0_12px_rgba(245,158,11,0.35)] dark:border-amber-400/60 dark:bg-amber-500/30 dark:text-white",
    hover:
      "hover:border-amber-400/50 hover:bg-amber-50 dark:hover:border-amber-400/40 dark:hover:bg-amber-500/15",
  },
  xpower: {
    active:
      "border-orange-500/70 bg-orange-100 text-orange-900 shadow-[0_0_12px_rgba(249,115,22,0.4)] dark:border-orange-400/60 dark:bg-orange-500/30 dark:text-white",
    hover:
      "hover:border-orange-400/50 hover:bg-orange-50 dark:hover:border-orange-400/40 dark:hover:bg-orange-500/15",
  },
};

const SPEED_OPTIONS: {
  id: EnergySpeed;
  label: string;
  duration: string;
  statusCopy: string;
  shortLabel: string;
}[] = [
  {
    id: "eco",
    label: "🌱 Eco",
    shortLabel: "Eco",
    duration: "8s",
    statusCopy: "ENERGY FLOW: ECO MODE",
  },
  {
    id: "regular",
    label: "⚡ Regular",
    shortLabel: "Regular",
    duration: "4s",
    statusCopy: "ENERGY FLOW: REGULAR",
  },
  {
    id: "xpower",
    label: "🔥 X-Power",
    shortLabel: "X-Power",
    duration: "1s",
    statusCopy: "SYSTEM SPEED: X-POWER",
  },
];

interface EnergyStripProps {
  className?: string;
}

/** Interactive full-width energy dashboard — flush under the site header */
export function EnergyStrip({ className }: EnergyStripProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<EnergySpeed>("regular");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const active = SPEED_OPTIONS.find((o) => o.id === speed) ?? SPEED_OPTIONS[1];
  const chargeDuration = active.duration;

  const chargeStyle = {
    "--charge-duration": chargeDuration,
  } as React.CSSProperties;

  const animationControl: React.CSSProperties = {
    animationPlayState: isPlaying ? "running" : "paused",
  };

  return (
    <div
      className={cn(
        "energy-dashboard group/energy relative h-8 w-full shrink-0",
        "bg-slate-100 dark:bg-slate-900",
        className
      )}
      role="region"
      aria-label="Energy control dashboard"
      style={chargeStyle}
    >
      <div
        className="energy-strip-glow pointer-events-none absolute inset-0 overflow-hidden"
        style={animationControl}
        aria-hidden
      >
        <div
          className="energy-strip-fill energy-strip-gradient absolute inset-y-0 left-0 h-full min-w-0 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
          style={animationControl}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5" />
      </div>

      <div className="relative z-10 flex h-full items-center gap-2 px-2 sm:px-3">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md backdrop-blur-md",
            "border border-slate-300 bg-slate-200/90 text-slate-800",
            "transition-[transform,box-shadow,background] duration-200",
            "hover:scale-105 hover:bg-slate-300/90 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80",
            "dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          )}
          aria-label={isPlaying ? "Pause energy flow" : "Resume energy flow"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <Pause className="size-3.5" strokeWidth={2.5} aria-hidden />
          ) : (
            <Play className="size-3.5" strokeWidth={2.5} aria-hidden />
          )}
        </button>

        <p
          className={cn(
            "min-w-0 flex-1 truncate text-center text-[10px] font-black uppercase tracking-[0.2em]",
            "text-slate-900 mix-blend-difference sm:text-[11px] sm:tracking-[0.25em]",
            "dark:text-white"
          )}
        >
          {active.statusCopy}
          {!isPlaying ? " · PAUSED" : ""}
        </p>

        <div
          className={cn(
            "flex shrink-0 items-center gap-1",
            "opacity-0 transition-opacity duration-200",
            "group-hover/energy:opacity-100 group-focus-within/energy:opacity-100",
            "max-sm:opacity-100"
          )}
        >
          {SPEED_OPTIONS.map((option) => {
            const selected = speed === option.id;
            const modeStyle = SPEED_BUTTON_STYLES[option.id];
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSpeed(option.id)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-bold",
                  "border transition-[transform,box-shadow,background,border-color,color] duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80",
                  selected
                    ? modeStyle.active
                    : cn(
                        "border-slate-300 bg-slate-200/90 text-slate-800",
                        "dark:border-white/15 dark:bg-white/10 dark:text-white",
                        modeStyle.hover
                      )
                )}
                aria-pressed={selected}
                aria-label={`Set speed to ${option.shortLabel}`}
              >
                <span className="hidden sm:inline">{option.label}</span>
                <span className="sm:hidden">{option.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
