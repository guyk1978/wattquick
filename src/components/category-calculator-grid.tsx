import { CategoryCalculatorCard } from "@/components/category-calculator-list-item";
import type { CalculatorMeta } from "@/lib/calculators";

interface CategoryCalculatorGridProps {
  calculators: CalculatorMeta[];
}

/** Responsive Industrial Matte card grid for category landing pages. */
export function CategoryCalculatorGrid({
  calculators,
}: CategoryCalculatorGridProps) {
  if (calculators.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No calculators in this category yet.</p>
    );
  }

  return (
    <ul
      className="category-calculator-grid m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Calculators in this category"
    >
      {calculators.map((calc) => (
        <CategoryCalculatorCard key={calc.id} calculator={calc} />
      ))}
    </ul>
  );
}
