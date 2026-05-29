import Link from "next/link";
import { cn } from "@/lib/utils";

interface HomeHeroProps {
  calculatorCount: number;
  className?: string;
}

export function HomeHero({ calculatorCount, className }: HomeHeroProps) {
  return (
    <section
      className={cn(
        "home-hero relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-28 size-[28rem] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-400/15" />
        <div className="absolute -right-20 top-0 size-[24rem] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/20" />
        <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-indigo-500/8 blur-[100px] dark:bg-indigo-500/15" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h1
          className={cn(
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-500",
            "text-4xl font-black leading-none tracking-tight",
            "bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent",
            "dark:from-cyan-400 dark:via-blue-500 dark:to-lime-400",
            "md:text-6xl"
          )}
        >
          Instant answers for batteries, solar &amp; EV
        </h1>

        <p
          className={cn(
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:delay-150",
            "mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl"
          )}
        >
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            {calculatorCount} free calculators.
          </span>{" "}
          No sign-up, no submit buttons—type and get results in milliseconds.
        </p>

        <div
          className={cn(
            "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200",
            "mt-10 flex flex-wrap items-center justify-center gap-3"
          )}
        >
          <Link
            href="/calculators/"
            className={cn(
              "inline-flex h-12 items-center rounded-xl px-6 text-sm font-bold text-white",
              "bg-gradient-to-r from-primary via-blue-600 to-indigo-600",
              "shadow-lg shadow-primary/25",
              "transition-[transform,box-shadow,filter] duration-300",
              "hover:scale-[1.03] hover:shadow-xl hover:brightness-110 active:scale-[0.99]"
            )}
          >
            Browse all calculators
          </Link>
          <Link
            href="#calculators"
            className={cn(
              "inline-flex h-12 items-center rounded-xl border border-slate-200/80 bg-white/70 px-6 text-sm font-semibold text-slate-800",
              "backdrop-blur-md shadow-sm",
              "transition-all duration-300",
              "hover:scale-[1.03] hover:border-primary/30 hover:shadow-md",
              "dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-100"
            )}
          >
            Explore below ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
