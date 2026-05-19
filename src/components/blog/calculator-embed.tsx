import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { calculators } from "@/data/calculators";
import { cn } from "@/lib/utils";

interface CalculatorEmbedProps {
  slug: string;
  className?: string;
}

export function CalculatorEmbed({ slug, className }: CalculatorEmbedProps) {
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) return null;

  const href = calc.href.endsWith("/") ? calc.href : `${calc.href}/`;

  return (
    <aside
      className={cn(
        "not-prose my-8 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card/90 to-card/60 p-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)] sm:p-6",
        className
      )}
    >
      <Link
        href={href}
        className="group flex items-center gap-4 transition-opacity hover:opacity-95"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
          <Zap className="size-5" strokeWidth={2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary/90">
            Interactive tool
          </span>
          <span className="mt-0.5 block text-base font-semibold leading-snug text-foreground group-hover:text-primary sm:text-lg">
            Try our {calc.title}
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Instant results — no sign-up, updates as you type
          </span>
        </span>
        <ArrowRight
          className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </aside>
  );
}
