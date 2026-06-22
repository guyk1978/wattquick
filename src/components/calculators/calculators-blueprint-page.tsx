"use client";

import Link from "next/link";
import { CalnexAppCallout } from "@/components/CalnexAppCallout";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { CalculatorBlueprintCategoryNav } from "@/components/calculator/calculator-blueprint-category-nav";
import { CalculatorBlueprintToolGrid } from "@/components/calculator/calculator-blueprint-tool-grid";
import { CalculatorsBlueprintHeader } from "@/components/calculators/calculators-blueprint-header";
import { CalculatorsHubHero } from "@/components/calculators/calculators-hub-hero";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { useMemo } from "react";

interface CalculatorsBlueprintPageProps {
  allIds: CalculatorId[];
  calculatorCount: number;
  categoryCount: number;
}

export function CalculatorsBlueprintPage({
  allIds,
  calculatorCount,
  categoryCount,
}: CalculatorsBlueprintPageProps) {
  const calculators = useMemo(
    () => allIds.map((id) => getCalculatorMeta(id)),
    [allIds]
  );

  return (
    <BlueprintHubShell
      statsTrailing={
        <Link href="/dashboard/" className="calculator-blueprint-stats__link">
          Command center
        </Link>
      }
      rightNav={
        <CalculatorBlueprintCategoryNav
          title="Calculators"
          calculators={calculators}
        />
      }
    >
      <CalculatorsBlueprintHeader
        calculatorCount={calculatorCount}
        categoryCount={categoryCount}
      />

      <div className="calculators-hub calculators-hub--blueprint">
        <CalculatorsHubHero className="mb-4" />

        <CalculatorBlueprintToolGrid calculators={calculators} />
      </div>

      <CalnexAppCallout className="calculators-hub__partner" />
    </BlueprintHubShell>
  );
}
