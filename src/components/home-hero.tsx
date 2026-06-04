import Link from "next/link";
import { NeonLiquidVessel } from "@/components/neon-liquid-vessel";
import { cn } from "@/lib/utils";

interface HomeHeroProps {
  calculatorCount: number;
  className?: string;
}

export function HomeHero({ calculatorCount, className }: HomeHeroProps) {
  return (
    <section
      className={cn(
        "home-hero relative z-[1] overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-28 size-[28rem] rounded-full bg-emerald-400/10 blur-[120px] dark:hidden" />
        <div className="absolute -right-20 top-0 size-[24rem] rounded-full bg-blue-500/10 blur-[120px] dark:hidden" />
        <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-indigo-500/8 blur-[100px] dark:hidden" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <NeonLiquidVessel />

        <h1
          className={cn(
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-500",
            "text-4xl font-black leading-none tracking-tight",
            "bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent",
            "dark:from-cyan-300 dark:via-sky-400 dark:to-lime-400",
            "md:text-6xl"
          )}
        >
          Instant answers for batteries, solar &amp; EV
        </h1>

        <p
          className={cn(
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:delay-150",
            "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          )}
        >
          <span className="font-semibold text-foreground">
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
            href="#calculators"
            className={cn(
              "inline-flex h-12 items-center rounded-xl px-6 text-sm font-bold text-primary-foreground",
              "bg-gradient-to-r from-primary via-blue-600 to-indigo-600",
              "shadow-lg shadow-primary/25",
              "dark:shadow-[0_0_36px_-4px_rgb(59_130_246/0.7),0_0_72px_-16px_rgb(34_211_238/0.45)]",
              "transition-[transform,box-shadow,filter] duration-300",
              "hover:scale-[1.03] hover:shadow-xl hover:brightness-110",
              "dark:hover:shadow-[0_0_44px_-2px_rgb(59_130_246/0.8),0_0_88px_-12px_rgb(34_211_238/0.55)]",
              "active:scale-[0.99]"
            )}
          >
            Search calculators ↓
          </Link>
          <Link
            href="/calculators/"
            className={cn(
              "inline-flex h-12 items-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground",
              "shadow-sm transition-all duration-300",
              "hover:border-primary/30 hover:bg-muted/50",
              "dark:border-white/12 dark:bg-slate-950/55 dark:backdrop-blur-md",
              "dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.1)]",
              "dark:hover:border-white/20 dark:hover:bg-slate-900/65"
            )}
          >
            View all {calculatorCount}
          </Link>
        </div>
      </div>
    </section>
  );
}
