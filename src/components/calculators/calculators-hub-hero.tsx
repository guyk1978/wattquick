"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { CalculatorsRecentHistory } from "@/components/calculators/calculators-recent-history";
import { CalculatorsSpotlightAdSlot } from "@/components/calculators/calculators-spotlight-ad-slot";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { cn } from "@/lib/utils";

interface CalculatorsHubHeroProps {
  className?: string;
  toolCount: number;
  categoryCount?: number;
}

export function CalculatorsHubHero({
  className,
  toolCount,
  categoryCount = CATEGORY_DISPLAY_ORDER.length,
}: CalculatorsHubHeroProps) {
  return (
    <section className={cn(className)} aria-labelledby="calculators-hub-hero-heading">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="text-xs font-semibold text-black transition-colors hover:text-black dark:text-white dark:hover:text-white"
        >
          ← Home
        </Link>
        <Link
          href="/dashboard/"
          className="rounded-md border border-black/12 bg-white px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-black/[0.04] dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-white/[0.06]"
        >
          Dashboard
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span
          className="inline-flex size-9 items-center justify-center rounded-lg border border-black/10 bg-white text-black dark:border-white/20 dark:bg-black dark:text-white"
          aria-hidden
        >
          <LayoutGrid className="size-4" strokeWidth={2.25} />
        </span>
        <h1
          id="calculators-hub-hero-heading"
          className="text-lg font-extrabold uppercase tracking-wide text-black dark:text-white sm:text-xl"
        >
          Featured &amp; trending
        </h1>
        <span className="rounded-md border border-black/10 bg-white px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-black dark:border-white/20 dark:bg-black dark:text-white">
          {toolCount} tools
        </span>
      </div>

      <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-black dark:text-white">
        {categoryCount} categories—battery, solar, EV, and power micro-calculators. Jump back
        into your recent tools below.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CalculatorsSpotlightAdSlot />
        <CalculatorsRecentHistory />
      </div>
    </section>
  );
}
