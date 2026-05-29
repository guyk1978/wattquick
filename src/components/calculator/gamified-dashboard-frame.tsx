import type { ReactNode } from "react";
import { glassDashboard, type GlassNeonAccent } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface GamifiedDashboardFrameProps {
  accent: Exclude<GlassNeonAccent, "cat">;
  label: string;
  ambientClassName?: string;
  className?: string;
  children: ReactNode;
}

export function GamifiedDashboardFrame({
  accent,
  label,
  ambientClassName,
  className,
  children,
}: GamifiedDashboardFrameProps) {
  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={cn(glassDashboard(accent), "p-6 sm:p-8", className)}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 size-56 rounded-full blur-3xl",
          ambientClassName
        )}
      />
      <div className="glass-neon__inner relative">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
          {label}
        </p>
        {children}
      </div>
    </section>
  );
}
