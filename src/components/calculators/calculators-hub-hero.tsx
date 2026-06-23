import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { CalculatorsRecentHistory } from "@/components/calculators/calculators-recent-history";
import { CalculatorsSpotlight } from "@/components/calculators/calculators-spotlight";
import { getWeeklyFeaturedCalculatorId } from "@/lib/calculators-hub-featured";
import { cn } from "@/lib/utils";

interface CalculatorsHubHeroProps {
  calculatorCount: number;
  categoryCount: number;
  className?: string;
}

export function CalculatorsHubHero({
  calculatorCount,
  categoryCount,
  className,
}: CalculatorsHubHeroProps) {
  const featuredId = getWeeklyFeaturedCalculatorId();

  return (
    <section
      className={cn("calculators-hub-hero", className)}
      aria-labelledby="calculators-hub-hero-heading"
    >
      <div className="calculators-hub-hero__top">
        <Link href="/" className="calculators-hub-hero__back">
          ← Home
        </Link>
        <span className="calculators-hub-hero__badge">Dashboard</span>
      </div>

      <div className="calculators-hub-hero__intro">
        <div className="calculators-hub-hero__title-row">
          <span className="calculators-hub-hero__icon" aria-hidden>
            <LayoutGrid className="size-4" strokeWidth={2.25} />
          </span>
          <h1 id="calculators-hub-hero-heading" className="calculators-hub-hero__title">
            Featured &amp; trending
          </h1>
          <span className="calculators-hub-hero__count">{calculatorCount} tools</span>
        </div>
        <p className="calculators-hub-hero__description">
          {categoryCount} categories—battery, solar, EV, and power micro-calculators.
          Pick the weekly spotlight or jump back into your recent tools.
        </p>
      </div>

      <div className="calculators-hub-hero__grid">
        <CalculatorsSpotlight calculatorId={featuredId} />
        <CalculatorsRecentHistory />
      </div>
    </section>
  );
}
