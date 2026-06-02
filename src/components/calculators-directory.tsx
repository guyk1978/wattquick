"use client";

import { useSearchParams } from "next/navigation";
import { CalculatorExplorer } from "@/components/calculator-explorer";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { isCalculatorCategory } from "@/lib/calculators";

export function CalculatorsDirectory() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const initialCategory =
    categoryParam && isCalculatorCategory(categoryParam)
      ? categoryParam
      : undefined;

  return (
    <CalculatorExplorer
      ids={[...CALCULATOR_SLUGS]}
      initialQuery={initialQuery}
      initialCategory={initialCategory}
    />
  );
}
