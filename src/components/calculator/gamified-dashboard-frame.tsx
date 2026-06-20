import type { ReactNode } from "react";
import { calculatorCommandResult, type GlassNeonAccent } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface GamifiedDashboardFrameProps {
  accent: Exclude<GlassNeonAccent, "cat">;
  label: string;
  ambientClassName?: string; // legacy — command panels no longer use ambient glow
  className?: string;
  children: ReactNode;
}

export function GamifiedDashboardFrame({
  accent,
  label,
  ambientClassName: _ambientClassName,
  className,
  children,
}: GamifiedDashboardFrameProps) {
  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={cn(calculatorCommandResult(), className)}
      data-accent={accent}
    >
      <div className="relative min-w-0">
        {label ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        ) : null}
        <div className={cn(label ? "mt-3" : undefined)}>{children}</div>
      </div>
    </section>
  );
}
