import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CalculatorMeta } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintToolGridProps {
  calculators: CalculatorMeta[];
  className?: string;
}

function shortenTitle(title: string): string {
  const trimmed = title.replace(/\s*calculator\s*/gi, "").trim();
  return trimmed.length > 28 ? `${trimmed.slice(0, 25)}…` : trimmed;
}

export function CalculatorBlueprintToolGrid({
  calculators,
  className,
}: CalculatorBlueprintToolGridProps) {
  if (calculators.length === 0) return null;

  return (
    <section
      className={cn("calculator-blueprint-tool-grid", className)}
      aria-label="Related tools"
    >
      <ul className="calculator-blueprint-tool-grid__list" role="list">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <li key={calc.id} className="calculator-blueprint-tool-grid__cell">
              <Link href={calc.href} className="calculator-blueprint-tool-card">
                <span className="calculator-blueprint-tool-card__icon" aria-hidden>
                  <Icon className="size-3" strokeWidth={2} />
                </span>
                <span className="calculator-blueprint-tool-card__body">
                  <span className="calculator-blueprint-tool-card__title">
                    {shortenTitle(calc.title)}
                  </span>
                  <span className="calculator-blueprint-tool-card__desc">
                    {calc.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="calculator-blueprint-tool-card__arrow size-3"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
