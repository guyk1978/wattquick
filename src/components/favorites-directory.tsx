"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { CalculatorGridCube } from "@/components/calculator-grid-cube";
import { CalculatorInfoModal } from "@/components/calculator-info-modal";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import type { CalculatorMeta } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";

export function FavoritesDirectory() {
  const { ids, hydrated } = useCalculatorFavorites();
  const [selectedCalculator, setSelectedCalculator] =
    useState<CalculatorMeta | null>(null);

  const calculators = useMemo(() => {
    if (!hydrated) return [];
    return ids.map((id) => getCalculatorMeta(id));
  }, [ids, hydrated]);

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground">Loading favorites…</p>
    );
  }

  if (calculators.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-border/60 px-6 py-12 text-center">
        <Star
          className="mx-auto size-8 text-muted-foreground/60"
          strokeWidth={1.5}
          aria-hidden
        />
        <p className="mt-4 text-base font-medium text-foreground">
          No favorites yet
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Star calculators from the{" "}
          <Link
            href="/calculators/"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            all calculators
          </Link>{" "}
          directory—the ones you mark will show up here.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">
        {calculators.length} saved{" "}
        {calculators.length === 1 ? "calculator" : "calculators"}. Tap a tile
        to read the summary or open the tool.
      </p>

      <div
        className="calculators-directory__grid grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Favorite calculators"
      >
        {calculators.map((calc) => (
          <CalculatorGridCube
            key={calc.id}
            calculator={calc}
            onSelect={setSelectedCalculator}
          />
        ))}
      </div>

      <CalculatorInfoModal
        calculator={selectedCalculator}
        onClose={() => setSelectedCalculator(null)}
      />
    </>
  );
}
