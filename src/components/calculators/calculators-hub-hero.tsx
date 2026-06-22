import { CalculatorsRecentHistory } from "@/components/calculators/calculators-recent-history";
import { CalculatorsSpotlight } from "@/components/calculators/calculators-spotlight";
import { getWeeklyFeaturedCalculatorId } from "@/lib/calculators-hub-featured";
import { cn } from "@/lib/utils";

interface CalculatorsHubHeroProps {
  className?: string;
}

export function CalculatorsHubHero({ className }: CalculatorsHubHeroProps) {
  const featuredId = getWeeklyFeaturedCalculatorId();

  return (
    <section
      className={cn("calculators-hub-hero", className)}
      aria-labelledby="calculators-hub-hero-heading"
    >
      <h2
        id="calculators-hub-hero-heading"
        className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground"
      >
        Featured &amp; trending tools
      </h2>

      <div className="mt-3 grid gap-3 lg:grid-cols-2 lg:gap-4">
        <CalculatorsSpotlight calculatorId={featuredId} />
        <CalculatorsRecentHistory />
      </div>
    </section>
  );
}
