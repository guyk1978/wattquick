import { CalculatorExplorer } from "@/components/calculator-explorer";
import { getAllCalculatorMeta } from "@/lib/calculators";

const calculators = getAllCalculatorMeta();
const calculatorIds = calculators.map((c) => c.id);

export default function HomePage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(520px,75vh)] bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,oklch(0.55_0.16_250/0.18),transparent)]"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <section className="mx-auto max-w-2xl text-center">
          <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-500 text-sm font-medium tracking-wide text-primary">
            Battery &amp; power math, instantly
          </p>
          <h1 className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:delay-75 mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
            Ultra-fast micro-calculators for batteries &amp; power
          </h1>
          <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:delay-150 mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {calculators.length} focused tools. No sign-up, no submit buttons—type
            and get answers in milliseconds.
          </p>
        </section>

        <section id="calculators" className="mt-12 sm:mt-16">
          <div className="mb-6 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              All calculators
            </h2>
            <p className="text-sm text-muted-foreground">
              Search or filter by category
            </p>
          </div>
          <CalculatorExplorer ids={calculatorIds} />
        </section>
      </div>
    </div>
  );
}
