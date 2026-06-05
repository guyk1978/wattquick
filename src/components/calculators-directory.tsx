"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CalculatorExplorer } from "@/components/calculator-explorer";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { isCalculatorCategory } from "@/lib/calculators";
import {
  getCalculatorsForUseCase,
  getUseCaseById,
  isCalculatorUseCase,
  type CalculatorUseCaseId,
} from "@/lib/calculator-use-cases";

export function CalculatorsDirectory() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const useCaseParam = searchParams.get("use-case") ?? "";
  const initialCategory =
    categoryParam && isCalculatorCategory(categoryParam)
      ? categoryParam
      : undefined;
  const initialUseCase: CalculatorUseCaseId | undefined =
    useCaseParam && isCalculatorUseCase(useCaseParam)
      ? useCaseParam
      : undefined;

  const ids = useMemo(() => {
    if (initialUseCase) {
      return getCalculatorsForUseCase(initialUseCase);
    }
    return [...CALCULATOR_SLUGS];
  }, [initialUseCase]);

  const useCaseLabel = initialUseCase
    ? getUseCaseById(initialUseCase).label
    : undefined;

  return (
    <CalculatorExplorer
      ids={ids}
      initialQuery={initialQuery}
      initialCategory={initialCategory}
      useCaseLabel={useCaseLabel}
    />
  );
}
