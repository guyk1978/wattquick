import Link from "next/link";
import { CalculatorExplorer } from "@/components/calculator-explorer";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
import type { CalculatorCategory } from "@/lib/calculators";

const calculators = getAllCalculatorMeta();

export default function HomePage() {
  const featuredCategories = (
    ["solar", "ev", "battery", "appliance"] as CalculatorCategory[]
  ).map((cat) => ({
    category: cat,
    label: CALCULATOR_CATEGORY_LABELS[cat],
    href: `/category/${cat}`,
  }));

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(520px,75vh)] bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,oklch(0.55_0.16_250/0.18),transparent)]"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <section className="mx-auto max-w-2xl text-center">
          <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-500 text-sm font-medium tracking-wide text-primary">
            Battery &amp; power micro-tools
          </p>
          <h1 className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:delay-75 mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
            Instant answers for batteries, solar &amp; EV
          </h1>
          <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:delay-150 mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {calculators.length} free calculators. No sign-up, no submit buttons—type
            and get results in milliseconds.
          </p>
          <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/calculators"
              className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse all calculators
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-11 items-center rounded-xl border border-border/60 bg-card/50 px-5 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              Read the blog
            </Link>
          </div>
        </section>

        <section className="mt-12 sm:mt-14">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Browse by category
          </h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {featuredCategories.map(({ category, label, href }) => (
              <li key={category}>
                <Link
                  href={href}
                  className="inline-flex rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="calculators" className="mt-14 sm:mt-16">
          <div className="mb-6 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Popular calculators
            </h2>
            <p className="text-sm text-muted-foreground">
              Search or filter—all tools update live
            </p>
          </div>
          <CalculatorExplorer ids={[...CALCULATOR_SLUGS]} />
        </section>
      </div>
    </div>
  );
}
