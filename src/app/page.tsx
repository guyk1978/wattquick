import { CalnexAppCallout } from "@/components/CalnexAppCallout";
import { HomeCalculatorSection } from "@/components/home-calculator-section";
import { HomeHero } from "@/components/home-hero";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { getAllCalculatorMeta } from "@/lib/calculators";

const calculators = getAllCalculatorMeta();

export default function HomePage() {
  return (
    <div className="relative bg-background">
      <HomeHero calculatorCount={calculators.length} />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <section
          id="calculators"
          className="scroll-mt-20 border-t border-border/60 pt-10 dark:border-white/10 sm:pt-12"
        >
          <div className="mb-8 space-y-2 text-center sm:mb-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Interactive powerhouse
            </h2>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Find the right calculator
            </p>
            <p className="mx-auto max-w-xl text-base text-muted-foreground">
              Search or filter {calculators.length} tools—start with the most used,
              then open the full directory when you need more.
            </p>
          </div>

          <HomeCalculatorSection
            allIds={[...CALCULATOR_SLUGS]}
            totalCount={calculators.length}
          />
        </section>

        <CalnexAppCallout className="mt-12 sm:mt-14" />
      </div>
    </div>
  );
}
