import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SiteBlueprintHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  label?: string;
  className?: string;
}

export function SiteBlueprintHeader({
  icon: Icon,
  title,
  description,
  backHref = "/",
  backLabel = "← Home",
  label = "Site",
  className,
}: SiteBlueprintHeaderProps) {
  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint site-blueprint-header",
        className
      )}
    >
      <Link
        href={backHref}
        className="calculator-page-header__back text-muted-foreground hover:text-foreground"
      >
        {backLabel}
      </Link>

      <div className="calculator-page-header__meta">
        <div className="calculator-page-header__title-row">
          <span className="calculator-page-header__icon" aria-hidden>
            <Icon className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">{title}</h1>
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">{description}</p>
          <span className="site-blueprint-header__label">{label}</span>
        </div>
      </div>
    </header>
  );
}
