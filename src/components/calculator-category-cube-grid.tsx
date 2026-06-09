"use client";

import { CalculatorGridCube } from "@/components/calculator-grid-cube";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
  type CalculatorMeta,
} from "@/lib/calculators";
import { cn } from "@/lib/utils";

function groupByCategory(calculators: CalculatorMeta[]) {
  const order: CalculatorCategory[] = [];
  const map = new Map<CalculatorCategory, CalculatorMeta[]>();

  for (const calc of calculators) {
    if (!map.has(calc.category)) {
      map.set(calc.category, []);
      order.push(calc.category);
    }
    map.get(calc.category)!.push(calc);
  }

  return order.map((category) => ({
    category,
    label: CALCULATOR_CATEGORY_LABELS[category],
    calculators: map.get(category)!,
  }));
}

interface CalculatorCategoryCubeGridProps {
  calculators: CalculatorMeta[];
  onSelect: (calculator: CalculatorMeta) => void;
  groupByCategory?: boolean;
  className?: string;
  gridClassName?: string;
}

export function CalculatorCategoryCubeGrid({
  calculators,
  onSelect,
  groupByCategory: grouped = true,
  className,
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: CalculatorCategoryCubeGridProps) {
  if (calculators.length === 0) {
    return (
      <p className="px-1 py-4 text-center text-xs text-muted-foreground">
        No calculators in this group.
      </p>
    );
  }

  const renderGrid = (items: CalculatorMeta[]) => (
    <div
      className={cn(
        "calculators-directory__grid calculators-mega-menu__grid grid gap-1",
        gridClassName
      )}
      role="list"
    >
      {items.map((calc) => (
        <CalculatorGridCube
          key={calc.id}
          calculator={calc}
          onSelect={onSelect}
        />
      ))}
    </div>
  );

  if (!grouped) {
    return <div className={className}>{renderGrid(calculators)}</div>;
  }

  const sections = groupByCategory(calculators);

  return (
    <div className={cn("space-y-3", className)}>
      {sections.map(({ category, label, calculators: items }) => (
        <section key={category} aria-label={label}>
          <h3 className="mb-1.5 px-0.5 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </h3>
          {renderGrid(items)}
        </section>
      ))}
    </div>
  );
}
