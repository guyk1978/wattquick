import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardBlueprintHeaderProps {
  profileLabel?: string;
  className?: string;
}

export function DashboardBlueprintHeader({
  profileLabel,
  className,
}: DashboardBlueprintHeaderProps) {
  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint dashboard-blueprint-header",
        className
      )}
    >
      <Link
        href="/calculators/"
        className="calculator-page-header__back text-muted-foreground hover:text-foreground"
      >
        ← All calculators
      </Link>

      <div className="calculator-page-header__meta">
        <div className="calculator-page-header__title-row">
          <span className="calculator-page-header__icon" aria-hidden>
            <LayoutDashboard className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">Command center</h1>
          {profileLabel ? (
            <span className="calculator-page-header__tag">{profileLabel}</span>
          ) : null}
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">
            Map solar, batteries, grid, and loads to instant calculators. Your
            profile persists across visits.
          </p>
          <span className="dashboard-blueprint-header__label">Dashboard</span>
        </div>
      </div>
    </header>
  );
}
