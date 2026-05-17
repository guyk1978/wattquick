import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorMeta,
} from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  variant?: "default" | "compact";
  className?: string;
}

export function CalculatorCard({
  calculator,
  variant = "default",
  className,
}: CalculatorCardProps) {
  const Icon = calculator.icon;
  const isCompact = variant === "compact";

  return (
    <Link
      href={calculator.href}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border/70 bg-card",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:border-primary/20 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:scale-[0.99]",
        isCompact ? "gap-3 p-4" : "gap-4 p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex items-center justify-center rounded-xl bg-muted text-foreground",
            "transition-[background-color,color] duration-300",
            "group-hover:bg-primary group-hover:text-primary-foreground",
            isCompact ? "size-9" : "size-10"
          )}
        >
          <Icon className={isCompact ? "size-4" : "size-5"} strokeWidth={2} />
        </span>
        <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {isCompact ? calculator.tag : CALCULATOR_CATEGORY_LABELS[calculator.category]}
        </span>
      </div>
      <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
        <h3
          className={cn(
            "font-semibold tracking-tight text-foreground",
            isCompact ? "text-sm" : "text-base"
          )}
        >
          {calculator.title}
        </h3>
        {!isCompact && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>
        )}
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
        {isCompact ? "Open" : "Open calculator"}
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
