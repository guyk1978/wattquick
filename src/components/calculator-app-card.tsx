import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CalculatorAppCardProps {
  calculator: CalculatorMeta;
  /** Hub directory uses larger type and taller cards */
  variant?: "default" | "hub";
  /** Override the footer action label */
  actionLabel?: string;
  className?: string;
}

export function CalculatorAppCard({
  calculator,
  variant = "default",
  actionLabel,
  className,
}: CalculatorAppCardProps) {
  const Icon = calculator.icon;
  const theme = getCategoryTheme(calculator.category);
  const isHub = variant === "hub";

  return (
    <div
      style={categoryThemeVars(theme)}
      className={cn(
        "calculator-app-card group",
        isHub && "calculator-app-card--hub",
        className
      )}
    >
      <Link
        href={calculator.href}
        className="calculator-app-card__overlay-link"
        aria-label={`Open ${calculator.title}`}
      />
      <div className="calculator-app-card__header">
        <span className="calculator-app-card__icon" aria-hidden>
          <Icon
            className={cn(isHub ? "size-5" : "size-[1.125rem]")}
            strokeWidth={2}
          />
        </span>
        <span className="calculator-app-card__category">
          {CALCULATOR_CATEGORY_LABELS[calculator.category]}
        </span>
      </div>

      <div className="calculator-app-card__body">
        <h3 className="calculator-app-card__title">{calculator.title}</h3>
        <p className="calculator-app-card__description">{calculator.description}</p>
        <CalculatorRatingSummary calculatorId={calculator.id} />
      </div>

      <span className="calculator-app-card__action">
        {actionLabel ?? (isHub ? "Open app" : "Open tool")}
        <ArrowUpRight className="size-3.5" strokeWidth={2.5} aria-hidden />
      </span>
      <span className="sr-only">Open {calculator.title}</span>
    </div>
  );
}
