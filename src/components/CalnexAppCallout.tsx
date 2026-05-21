import { ExternalLink, LineChart } from "lucide-react";
import { CALNEX_APP_URL } from "@/lib/partners";
import { cn } from "@/lib/utils";

interface CalnexAppCalloutProps {
  className?: string;
}

export function CalnexAppCallout({ className }: CalnexAppCalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-primary/25 bg-card/60 p-4 shadow-[0_0_24px_-8px_rgba(59,130,246,0.35)]",
        "sm:flex sm:items-center sm:gap-4 sm:p-5",
        className
      )}
      aria-label="Solar and EV financing partner"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
        <LineChart className="size-5" strokeWidth={2} aria-hidden />
      </span>
      <div className="mt-3 min-w-0 flex-1 sm:mt-0">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Calculate ROI &amp; Financing:
          </span>{" "}
          See how your solar or EV setup affects your monthly loan payments using{" "}
          <span className="font-medium text-foreground">CalnexApp</span>.
        </p>
        <a
          href={CALNEX_APP_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6]",
            "underline-offset-4 transition-colors hover:text-primary hover:underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          Open CalnexApp
          <ExternalLink className="size-3.5 shrink-0 opacity-80" aria-hidden />
        </a>
      </div>
    </aside>
  );
}
