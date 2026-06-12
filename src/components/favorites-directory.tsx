"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Star } from "lucide-react";
import { CalculatorAppCard } from "@/components/calculator-app-card";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import { getCalculatorMeta } from "@/lib/calculators/registry";

export function FavoritesDirectory() {
  const { ids, hydrated } = useCalculatorFavorites();

  const calculators = useMemo(() => {
    if (!hydrated) return [];
    return ids.map((id) => getCalculatorMeta(id));
  }, [ids, hydrated]);

  if (!hydrated) {
    return (
      <p className="favorites-hub__loading text-sm text-muted-foreground">
        Loading favorites…
      </p>
    );
  }

  if (calculators.length === 0) {
    return (
      <div className="favorites-hub__empty" role="status">
        <div className="favorites-hub__empty-icon-wrap" aria-hidden>
          <Star className="favorites-hub__empty-icon" strokeWidth={1.75} />
        </div>
        <h2 className="favorites-hub__empty-title">No favorites yet</h2>
        <p className="favorites-hub__empty-text">
          Star calculators from any tool page. Your saved tools will appear here
          as a personal dashboard—stored on this device, no account required.
        </p>
        <Link href="/calculators/" className="favorites-hub__cta">
          Explore Calculators
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-hub">
      <p className="favorites-hub__count">
        {calculators.length} saved{" "}
        {calculators.length === 1 ? "tool" : "tools"}
      </p>

      <div
        className="calculators-hub__grid"
        role="list"
        aria-label="Favorite calculators"
      >
        {calculators.map((calc) => (
          <div key={calc.id} role="listitem" className="calculators-hub__grid-cell">
            <CalculatorAppCard
              calculator={calc}
              variant="hub"
              actionLabel="Open tool"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
