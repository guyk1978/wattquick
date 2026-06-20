import { BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogBlueprintHeaderProps {
  articleCount?: number;
  className?: string;
}

export function BlogBlueprintHeader({
  articleCount,
  className,
}: BlogBlueprintHeaderProps) {
  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint blog-blueprint-header",
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
            <BookOpen className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">Blog</h1>
          {articleCount != null ? (
            <span className="calculator-page-header__tag">
              {articleCount} {articleCount === 1 ? "article" : "articles"}
            </span>
          ) : null}
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">
            Expert guides on EV charging, solar, batteries, and home energy—each
            paired with interactive WattQuick tools.
          </p>
          <span className="blog-blueprint-header__label">Publication</span>
        </div>
      </div>
    </header>
  );
}
