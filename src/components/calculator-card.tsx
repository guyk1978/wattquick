import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { glassNeon, glassNeonAccent, glassSurface } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  variant?: "default" | "compact";
  className?: string;
}

export function CalculatorCard({
  calculator,
  variant = "default",
  className,
}: CalculatorCardProps) {
  const Icon = calculator.icon;
  const isCompact = variant === "compact";
  const theme = getCategoryTheme(calculator.category);

  return (
    <Link
      href={calculator.href}
      style={categoryThemeVars(theme)}
      className={cn(
        "calc-card group relative flex flex-col overflow-hidden rounded-2xl",
        glassSurface,
        glassNeon,
        glassNeonAccent("cat"),
        "transition-[transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.99]",
        isCompact ? "p-4" : "p-5",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-[color-mix(in_srgb,var(--cat)_10%,transparent)] opacity-90 dark:from-white/[0.04] dark:to-[color-mix(in_srgb,var(--cat)_14%,transparent)]"
      />

      <div
        className={cn(
          "glass-neon__inner relative flex flex-1 flex-col",
          isCompact ? "gap-3" : "gap-4"
        )}
      >
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-2xl shadow-lg",
            "ring-1 ring-white/25 transition-[transform,box-shadow] duration-300",
            "group-hover:scale-105 group-hover:shadow-xl group-hover:rotate-[-2deg]",
            isCompact ? "size-12" : "size-16"
          )}
          style={{
            background: `linear-gradient(145deg, var(--cat), var(--cat-dark))`,
            boxShadow:
              "0 10px 28px -10px color-mix(in srgb, var(--cat) 65%, transparent)",
          }}
        >
          <Icon
            className={cn("text-white drop-shadow-sm", isCompact ? "size-6" : "size-8")}
            strokeWidth={2.25}
          />
        </span>

        <span
          className="shrink-0 rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide"
          style={{
            borderColor: "color-mix(in srgb, var(--cat) 35%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--cat) 14%, transparent)",
            color: "var(--cat)",
          }}
        >
          {isCompact ? calculator.tag : CALCULATOR_CATEGORY_LABELS[calculator.category]}
        </span>
      </div>

      <div className={cn("relative space-y-1", isCompact && "space-y-0.5")}>
        <h3
          className={cn(
            "font-semibold tracking-tight text-foreground",
            isCompact ? "text-sm" : "text-base"
          )}
        >
          {calculator.title}
        </h3>
        {!isCompact && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>
        )}
      </div>

      <span
        className={cn(
          "relative mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl font-bold",
          "shadow-md transition-[transform,box-shadow,filter] duration-300",
          "group-hover:scale-[1.02] group-hover:shadow-lg group-hover:brightness-110",
          isCompact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
        )}
        style={{
          color: "var(--cat-cta-text)",
          background: "linear-gradient(135deg, var(--cat), var(--cat-dark))",
          boxShadow:
            "0 6px 20px -6px color-mix(in srgb, var(--cat) 70%, transparent)",
        }}
      >
        {isCompact ? "Open" : "Open calculator"}
        <ArrowUpRight
          className={cn(
            "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            isCompact ? "size-3" : "size-4"
          )}
          strokeWidth={2.5}
        />
      </span>
      </div>
    </Link>
  );
}
