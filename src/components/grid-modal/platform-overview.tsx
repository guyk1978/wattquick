import { SEOContentBlock } from "@/components/seo-content-block";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { cn } from "@/lib/utils";

const PLATFORM_OVERVIEW_TITLE =
  "Why WattQuick — free battery, solar, EV, and power calculators";

function buildPlatformOverviewParagraphs(calculatorCount: number): string[] {
  return [
    `WattQuick is a free suite of ${calculatorCount} engineering-grade micro-calculators for batteries, solar arrays, EV charging, home power, and electrical conversions. Every tool is built for fast, defensible answers — enter a few inputs and get watt-hours, amp-hours, cable sizes, payback periods, or runtime estimates without creating an account or installing software.`,
    "The platform covers the full planning stack: unit conversion and power math, battery runtime and charge modeling, solar sizing and yield, EV and e-mobility charging, backup and cost analysis, plus specialty categories like RV & marine, pool pumps, and green-home efficiency. Categories are color-coded so you can scan the catalog quickly and open the right tool for the job.",
    "Unlike generic spreadsheets or one-off widgets, WattQuick keeps formulas consistent across related tools. That means you can size a battery bank, check inverter demand, convert Ah to Wh, and estimate solar array current with the same assumptions — then save snapshots to projects or favorite tools for later. Results are planning estimates, not certified engineering advice, but they are structured so you can iterate as loads and site data change.",
    "Search engines and readers both benefit from clear, crawlable explanations of what each calculator does and how the platform fits together. This overview summarizes WattQuick's value: instant answers, no paywall, and a single place to move from rough energy math to a bill of materials you can discuss with a vendor or installer.",
  ];
}

type PlatformOverviewProps = {
  className?: string;
};

/**
 * Home-page SEO overview of WattQuick's value — always visible so crawlers
 * and readers get the full copy without interaction.
 */
export function PlatformOverview({ className }: PlatformOverviewProps) {
  const count = getAllCalculatorMeta().length;
  const paragraphs = buildPlatformOverviewParagraphs(count);

  return (
    <section
      className={cn("grid-modal-seo-inline platform-overview", className)}
      aria-labelledby="platform-overview-heading"
    >
      <h2 id="platform-overview-heading" className="sr-only">
        About WattQuick
      </h2>
      <SEOContentBlock
        title={PLATFORM_OVERVIEW_TITLE}
        content={paragraphs}
      />
    </section>
  );
}
