"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Star } from "lucide-react";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { CalculatorBlueprintCategoryNav } from "@/components/calculator/calculator-blueprint-category-nav";
import { CalculatorBlueprintCategorySidebar } from "@/components/calculator/calculator-blueprint-category-sidebar";
import { CalculatorBlueprintStatsBar } from "@/components/calculator/calculator-blueprint-stats-bar";
import { CalculatorBlueprintToolGrid } from "@/components/calculator/calculator-blueprint-tool-grid";
import { BlueprintShellFrame } from "@/components/blueprint/blueprint-shell-frame";
import { BlueprintShellWorkspace } from "@/components/blueprint/blueprint-shell-workspace";
import { CategoryToolsFocus } from "@/components/category/category-tools-focus";
import { FavoritesBlueprintHeader } from "@/components/favorites/favorites-blueprint-header";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

export function FavoritesBlueprintPage() {
  const { ids, hydrated } = useCalculatorFavorites();

  const calculators = useMemo(() => {
    if (!hydrated) return [];
    return ids.map((id) => getCalculatorMeta(id));
  }, [ids, hydrated]);

  const focusItems = useMemo(
    () =>
      calculators.map(({ id, href, title, description }) => ({
        id,
        href,
        title,
        description,
      })),
    [calculators]
  );

  return (
    <div className="calculator-route calculator-route--blueprint">
      <BlueprintShellFrame>
        <CalculatorBlueprintStatsBar
          trailing={
            <div className="calculator-blueprint-toolbar">
              <CategoryToolsFocus
                calculators={focusItems}
                categoryLabel="Favorites"
                title="Saved tools"
              />
              <Link href="/calculators/" className="calculator-blueprint-stats__link">
                All tools
              </Link>
            </div>
          }
        />

        <BlueprintShellWorkspace>
          <CalculatorBlueprintCategorySidebar activeCategory={null} />

          <div className="calculator-blueprint-shell__center">
            <FavoritesBlueprintHeader
              toolCount={hydrated ? calculators.length : undefined}
            />

            <CalculatorAdSlots />

            {!hydrated ? (
              <p className="favorites-blueprint__loading">Loading favorites…</p>
            ) : calculators.length === 0 ? (
              <div className="favorites-blueprint__empty" role="status">
                <div className="favorites-blueprint__empty-icon-wrap" aria-hidden>
                  <Star className="favorites-blueprint__empty-icon" strokeWidth={1.75} />
                </div>
                <h2 className="favorites-blueprint__empty-title">No favorites yet</h2>
                <p className="favorites-blueprint__empty-text">
                  Star calculators from any tool page. Your saved tools will appear
                  here as a personal dashboard—stored on this device.
                </p>
                <Link
                  href="/calculators/"
                  className={cn(
                    calculatorCommandBtn,
                    "favorites-blueprint__cta inline-flex h-8 items-center gap-2 px-3 text-xs font-semibold"
                  )}
                >
                  Explore Calculators
                  <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
            ) : (
              <section aria-labelledby="favorites-tools-heading">
                <h2 id="favorites-tools-heading" className="category-blueprint-tools__title">
                  Saved tools
                </h2>
                <CalculatorBlueprintToolGrid calculators={calculators} />
              </section>
            )}
          </div>

          <CalculatorBlueprintCategoryNav
            title="Calculators"
            calculators={hydrated ? calculators : []}
          />
        </BlueprintShellWorkspace>
      </BlueprintShellFrame>
    </div>
  );
}
