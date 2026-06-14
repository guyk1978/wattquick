import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeToolCard } from "@/components/home-tool-card";
import { POPULAR_CALCULATOR_SLUGS } from "@/data/popular-calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const FEATURED_COUNT = 4;

export function LandingFeaturedTools() {
  const featured = POPULAR_CALCULATOR_SLUGS.slice(0, FEATURED_COUNT).map((id) =>
    getCalculatorMeta(id)
  );

  return (
    <section className="landing-featured" aria-labelledby="landing-featured-title">
      <div className="landing-featured__header">
        <div>
          <p className="landing-featured__eyebrow">Featured tools</p>
          <h2 id="landing-featured-title" className="landing-featured__title">
            Start with the essentials
          </h2>
          <p className="landing-featured__description">
            Four of our most-used calculators — battery runtime, unit conversion,
            EV cost, and solar yield.
          </p>
        </div>
        <Link href="/calculators/" className="landing-featured__link">
          View all tools
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="landing-featured__grid" role="list">
        {featured.map((calc) => (
          <div key={calc.id} role="listitem">
            <HomeToolCard calculator={calc} />
          </div>
        ))}
      </div>
    </section>
  );
}
