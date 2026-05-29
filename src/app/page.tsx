import { CalnexAppCallout } from "@/components/CalnexAppCallout";
import { CalculatorExplorer } from "@/components/calculator-explorer";
import { HomeHero } from "@/components/home-hero";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { getAllCalculatorMeta } from "@/lib/calculators";

const calculators = getAllCalculatorMeta();

export default function HomePage() {
  return (
    <div className="relative">
      <HomeHero calculatorCount={calculators.length} />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <section
          id="calculators"
          className="scroll-mt-20 border-t border-slate-200/60 pt-10 dark:border-slate-800/80 sm:pt-12"
        >
          <div className="mb-8 space-y-2 text-center sm:mb-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Interactive powerhouse
            </h2>
            <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Browse by category
            </p>
            <p className="mx-auto max-w-xl text-base text-slate-600 dark:text-slate-400">
              Search, filter, and open any of {calculators.length} live calculators—results
              update as you type.
            </p>
          </div>

          <CalculatorExplorer ids={[...CALCULATOR_SLUGS]} />
        </section>

        <CalnexAppCallout className="mt-12 sm:mt-14" />
      </div>
    </div>
  );
}
