import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritesBlueprintHeaderProps {
  toolCount?: number;
  className?: string;
}

export function FavoritesBlueprintHeader({
  toolCount,
  className,
}: FavoritesBlueprintHeaderProps) {
  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint favorites-blueprint-header",
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
          <span className="calculator-page-header__icon favorites-blueprint-header__icon" aria-hidden>
            <Star className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">Favorite calculators</h1>
          {toolCount != null ? (
            <span className="calculator-page-header__tag">
              {toolCount} saved
            </span>
          ) : null}
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">
            Your starred tools—saved in this browser for quick access. No account
            required.
          </p>
          <span className="favorites-blueprint-header__label">Personal</span>
        </div>
      </div>
    </header>
  );
}
