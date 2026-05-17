import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSuggestions, type CalculatorMeta } from "@/lib/calculators";
import { SuggestedCalculators } from "./suggested-calculators";
import { cn } from "@/lib/utils";

interface CalculatorLayoutProps {
  calculator: CalculatorMeta;
  children: React.ReactNode;
  seoContent?: React.ReactNode;
  className?: string;
}

export function CalculatorLayout({
  calculator,
  children,
  seoContent,
  className,
}: CalculatorLayoutProps) {
  const Icon = calculator.icon;
  const suggestions = getSuggestions(calculator.suggestions);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-lg px-4 pb-20 pt-6 sm:max-w-2xl sm:px-6 sm:pb-24 sm:pt-10",
        className
      )}
    >
      <Link
        href="/"
        className={cn(
          "mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground",
          "transition-colors duration-200 hover:text-foreground",
          "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <ArrowLeft className="size-4 shrink-0" aria-hidden />
        All calculators
      </Link>

      <header className="mb-8 space-y-4 sm:mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/20">
            <Icon className="size-5" strokeWidth={2} aria-hidden />
          </span>
          <span className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {calculator.tag}
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl sm:leading-tight">
            {calculator.title}
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>
        </div>
      </header>

      <div className="space-y-10 sm:space-y-12">
        {children}

        {seoContent ? (
          <aside
            className="rounded-2xl border border-border/50 bg-muted/20 p-6 sm:p-8"
            aria-label="Calculator guide"
          >
            {seoContent}
          </aside>
        ) : null}
      </div>

      <div className="mt-12 border-t border-border/50 pt-10 sm:mt-14 sm:pt-12">
        <SuggestedCalculators calculators={suggestions} />
      </div>
    </div>
  );
}
