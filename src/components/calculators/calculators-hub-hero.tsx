"use client";

import Link from "next/link";
import { CalculatorsRecentHistory } from "@/components/calculators/calculators-recent-history";
import { CategoryCarousel } from "@/components/calculators/category-carousel";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { cn } from "@/lib/utils";

interface CalculatorsHubHeroProps {
  className?: string;
  toolCount: number;
  categoryCount?: number;
}

export function CalculatorsHubHero({
  className,
  toolCount,
  categoryCount = CATEGORY_DISPLAY_ORDER.length,
}: CalculatorsHubHeroProps) {
  return (
    <section
      className={cn("calculators-hub-hero", className)}
      aria-labelledby="calculators-hub-hero-heading"
    >
      <div className="calculators-hub-hero__surface">
        <p className="calculators-hub-hero__eyebrow">WattQuick Tool Suite</p>

        <h1
          id="calculators-hub-hero-heading"
          className="calculators-hub-hero__title"
        >
          Professional power calculators for batteries, solar &amp; EV
        </h1>

        <p className="calculators-hub-hero__subtitle">
          Engineering-grade results with minimal inputs. No sign-up, no submit
          buttons — open a tool, type, and get answers in milliseconds.
        </p>

        <div className="calculators-hub-hero__actions">
          <Link
            href="#calculators-tool-grid"
            className="calculators-hub-hero__cta"
          >
            Browse all {toolCount} tools →
          </Link>
        </div>

        <CategoryCarousel
          variant="hero"
          className="calculators-hub-hero__carousel"
        />
      </div>

      <div className="calculators-hub-hero__below mt-4">
        <CalculatorsRecentHistory />
      </div>
    </section>
  );
}
