import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorsBlueprintHeaderProps {
  calculatorCount: number;
  categoryCount: number;
  className?: string;
}

export function CalculatorsBlueprintHeader({
  calculatorCount,
  categoryCount,
  className,
}: CalculatorsBlueprintHeaderProps) {
  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint calculators-blueprint-header",
        className
      )}
    >
      <Link
        href="/"
        className="calculator-page-header__back text-muted-foreground hover:text-foreground"
      >
        ← Home
      </Link>

      <div className="calculator-page-header__meta">
        <div className="calculator-page-header__title-row">
          <span className="calculator-page-header__icon" aria-hidden>
            <LayoutGrid className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">All calculators</h1>
          <span className="calculator-page-header__tag">
            {calculatorCount} tools
          </span>
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">
            {categoryCount} categories—battery, solar, EV, and power
            micro-calculators with instant results. Pick a spotlight tool or browse
            the full directory below.
          </p>
          <span className="calculators-blueprint-header__label">Directory</span>
        </div>
      </div>
    </header>
  );
}
