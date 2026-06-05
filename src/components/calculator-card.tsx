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
  variant?: "default" | "compact" | "minimal" | "related";
  className?: string;
}

export function CalculatorCard({
  calculator,
  variant = "default",
  className,
}: CalculatorCardProps) {
  const Icon = calculator.icon;
  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";
  const isRelated = variant === "related";
  const theme = getCategoryTheme(calculator.category);

  if (isRelated) {
    return (
      <Link
        href={calculator.href}
        style={categoryThemeVars(theme)}
        className={cn(
          "calc-card-related group flex items-center gap-2.5 rounded-none px-3 py-2.5",
          "bg-card transition-colors duration-150",
          "hover:bg-muted/50 dark:bg-[rgb(6_10_22/0.72)] dark:hover:bg-[rgb(8_14_28/0.85)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
      >
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-none",
            "bg-[color-mix(in_srgb,var(--cat)_12%,transparent)] text-[var(--cat)]",
            "dark:bg-[color-mix(in_srgb,var(--cat)_18%,transparent)]"
          )}
        >
          <Icon className="size-3.5" strokeWidth={2} aria-hidden />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="truncate text-sm font-medium leading-snug text-foreground">
              {calculator.title}
            </span>
            <span className="shrink-0 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
              {calculator.tag}
            </span>
          </span>
        </span>

        <ArrowUpRight
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          strokeWidth={2}
          aria-hidden
        />
        <span className="sr-only">Open {calculator.title}</span>
      </Link>
    );
  }

  if (isMinimal) {
    return (
      <Link
        href={calculator.href}
        style={categoryThemeVars(theme)}
        className={cn(
          "calc-card group flex h-full flex-col gap-2 rounded-xl border p-3 transition-colors duration-150",
          "border-border/80 bg-card shadow-sm",
          "hover:border-[color-mix(in_srgb,var(--cat)_35%,transparent)] hover:bg-muted/30",
          "dark:border-border dark:bg-card/90",
          "dark:hover:border-[color-mix(in_srgb,var(--cat)_40%,transparent)]",
          "dark:hover:bg-[color-mix(in_srgb,var(--cat)_8%,var(--card))]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg border",
            "border-[color-mix(in_srgb,var(--cat)_25%,transparent)] bg-background text-[var(--cat)]",
            "dark:border-[color-mix(in_srgb,var(--cat)_38%,transparent)]",
            "dark:bg-[color-mix(in_srgb,var(--cat)_14%,var(--card))]"
          )}
        >
          <Icon className="size-4" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 space-y-0.5">
          <h3 className="text-sm font-semibold leading-snug text-foreground">
            {calculator.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>
        </div>
      </Link>
    );
  }

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
