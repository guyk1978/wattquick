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
        "flat-panel border-l-2 border-l-primary/40 p-3 sm:flex sm:items-center sm:gap-3 sm:p-4",
        className
      )}
      aria-label="Solar and EV financing partner"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-none border border-border/60 bg-muted/40 text-primary">
        <LineChart className="size-4" strokeWidth={2} aria-hidden />
      </span>
      <div className="mt-2 min-w-0 flex-1 sm:mt-0">
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
            "mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
            "underline-offset-4 transition-colors hover:underline",
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
