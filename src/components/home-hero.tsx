import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeHeroProps {
  calculatorCount: number;
  className?: string;
}

export function HomeHero({ calculatorCount, className }: HomeHeroProps) {
  return (
    <section
      className={cn(
        "home-hero relative z-[1] px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12",
        className
      )}
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-none border border-border/60 bg-card text-primary">
          <Zap className="size-7" strokeWidth={2} aria-hidden />
        </div>

        <h1 className="text-4xl font-black leading-none tracking-tight text-foreground md:text-6xl">
          Instant answers for batteries, solar &amp; EV
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
          <span className="font-semibold text-foreground">
            {calculatorCount} free calculators.
          </span>{" "}
          No sign-up, no submit buttons—type and get results in milliseconds.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="#calculators"
            className="flat-inline-action inline-flex h-11 items-center px-5 text-sm font-semibold"
          >
            Search calculators ↓
          </Link>
          <Link
            href="/calculators/"
            className="inline-flex h-11 items-center rounded-none border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-white dark:border-white/12 dark:bg-[rgb(6_10_22/0.72)] dark:hover:bg-[rgb(8_14_28/0.85)]"
          >
            View all {calculatorCount}
          </Link>
        </div>
      </div>
    </section>
  );
}
