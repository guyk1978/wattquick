"use client";

import Link from "next/link";
import { CalnexAppCallout } from "@/components/CalnexAppCallout";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { CalculatorBlueprintCategoryNav } from "@/components/calculator/calculator-blueprint-category-nav";
import { CalculatorBlueprintToolGrid } from "@/components/calculator/calculator-blueprint-tool-grid";
import { CalculatorsHubHero } from "@/components/calculators/calculators-hub-hero";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { useMemo } from "react";

interface CalculatorsBlueprintPageProps {
  allIds: CalculatorId[];
}

export function CalculatorsBlueprintPage({
  allIds,
}: CalculatorsBlueprintPageProps) {
  const calculators = useMemo(
    () => allIds.map((id) => getCalculatorMeta(id)),
    [allIds]
  );

  return (
    <BlueprintHubShell
      techHub
      statsTrailing={
        <Link
          href="/dashboard/"
          className="rounded-md border border-black/12 bg-white px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-white dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/5"
        >
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
      <div className="calculators-hub calculators-hub--blueprint bg-white text-black dark:bg-black dark:text-white">
        <CalculatorsHubHero toolCount={calculators.length} />

        <div
          id="calculators-tool-grid"
          className="mt-5 border-t border-black/8 pt-5 dark:border-white/10"
        >
          <h2 className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-black/55 dark:text-white/55">
            Available Calculators
          </h2>
          <CalculatorBlueprintToolGrid calculators={calculators} variant="tech-hub" />
        </div>
      </div>

      <CalnexAppCallout className="calculators-hub__partner" />
    </BlueprintHubShell>
  );
}
