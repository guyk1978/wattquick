import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
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
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
          "calc-card calc-card-flat group flex h-full flex-col gap-2 rounded-none border p-3 transition-colors duration-150",
          "border-slate-200 bg-white",
          "dark:border-border dark:bg-card/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-none border",
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
        "calc-card calc-card-flat group flex h-full flex-col gap-3 rounded-none border p-4 transition-colors duration-150",
        "border-slate-200 bg-white",
        "dark:border-border dark:bg-card/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isCompact ? "p-3" : "p-4",
        className
      )}
    >
      <div className={cn("flex flex-1 flex-col", isCompact ? "gap-2.5" : "gap-3")}>
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-none border",
              "border-[color-mix(in_srgb,var(--cat)_25%,transparent)] bg-[color-mix(in_srgb,var(--cat)_10%,transparent)] text-[var(--cat)]",
              "dark:bg-[color-mix(in_srgb,var(--cat)_16%,transparent)]",
              isCompact ? "size-10" : "size-11"
            )}
          >
            <Icon
              className={cn(isCompact ? "size-5" : "size-5")}
              strokeWidth={2}
              aria-hidden
            />
          </span>

          <span
            className="shrink-0 rounded-none border px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide"
            style={{
              borderColor: "color-mix(in srgb, var(--cat) 30%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--cat) 10%, transparent)",
              color: "var(--cat)",
            }}
          >
            {isCompact ? calculator.tag : CALCULATOR_CATEGORY_LABELS[calculator.category]}
          </span>
        </div>

        <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
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
          <CalculatorRatingSummary calculatorId={calculator.id} />
        </div>

        <span
          className={cn(
            "mt-auto inline-flex w-full items-center justify-center gap-2 rounded-none border font-semibold",
            "border-border/60 bg-[var(--matte-hover)] text-foreground",
            "transition-colors group-hover:bg-[var(--matte-hover-strong)] group-hover:border-[var(--matte-hover-border)]",
            isCompact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
          )}
        >
          {isCompact ? "Open" : "Open calculator"}
          <ArrowUpRight className={cn(isCompact ? "size-3" : "size-4")} strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}
