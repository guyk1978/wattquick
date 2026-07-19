import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import type { CalculatorMeta } from "@/lib/calculators";
import { getCategoryTheme } from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface CalculatorBlueprintToolGridProps {
  calculators: CalculatorMeta[];
  className?: string;
  /** Bold tech-forward cards for the calculators hub (light mode). */
  variant?: "default" | "tech-hub";
}

function shortenTitle(title: string): string {
  const trimmed = title.replace(/\s*calculator\s*/gi, "").trim();
  return trimmed.length > 28 ? `${trimmed.slice(0, 25)}…` : trimmed;
}

export function CalculatorBlueprintToolGrid({
  calculators,
  className,
  variant = "default",
}: CalculatorBlueprintToolGridProps) {
  if (calculators.length === 0) return null;

  const isTechHub = variant === "tech-hub";

  return (
    <section
      className={cn(
        isTechHub
          ? "calculator-blueprint-tool-grid-tech"
          : "calculator-blueprint-tool-grid",
        className
      )}
      aria-label={isTechHub ? "All calculators" : "Related tools"}
    >
      <ul
        className={cn(
          isTechHub
            ? "grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3"
            : "calculator-blueprint-tool-grid__list"
        )}
        role="list"
      >
        {calculators.map((calc) => {
          const Icon = calc.icon;
          const theme = getCategoryTheme(calc.category);

          if (isTechHub) {
            return (
              <li key={calc.id}>
                <div
                  className={cn(
                    "calculator-tech-card group relative flex h-full flex-col rounded-xl border bg-white p-4 shadow-sm dark:bg-black",
                    "transition-all hover:-translate-y-0.5 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/35 focus-visible:ring-offset-2"
                  )}
                  style={{
                    borderColor: theme.color,
                  }}
                >
                  <Link
                    href={calc.href}
                    className="absolute inset-0 z-[1]"
                    aria-label={`Open ${calc.title}`}
                  />
                  <span className="flex items-start gap-2">
                    <span
                      className="calculator-tech-card__icon mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border bg-transparent"
                      style={{ borderColor: `${theme.color}55`, color: theme.color }}
                      aria-hidden
                    >
                      <Icon className="size-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="block text-sm font-bold leading-snug text-black">
                      {shortenTitle(calc.title)}
                    </span>
                  </span>
                  <span className="mt-2 line-clamp-2 pl-9 text-xs leading-relaxed text-black dark:text-white">
                    {calc.description}
                  </span>
                  <CalculatorRatingSummary
                    calculatorId={calc.id}
                    color={theme.color}
                    className="relative z-10 mt-2 pl-9"
                  />
                </div>
              </li>
            );
          }

          return (
            <li key={calc.id} className="calculator-blueprint-tool-grid__cell">
              <div className="calculator-blueprint-tool-card relative">
                <Link
                  href={calc.href}
                  className="absolute inset-0 z-[1]"
                  aria-label={`Open ${calc.title}`}
                />
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
                  <CalculatorRatingSummary
                    calculatorId={calc.id}
                    color={theme.color}
                    className="relative z-10 mt-1"
                    showCount={false}
                  />
                </span>
                <ArrowUpRight
                  className="calculator-blueprint-tool-card__arrow size-3"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
