import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsBlueprintHeaderProps {
  projectCount?: number;
  className?: string;
}

export function ProjectsBlueprintHeader({
  projectCount,
  className,
}: ProjectsBlueprintHeaderProps) {
  return (
    <header
      className={cn(
        "calculator-page-header calculator-page-header--blueprint projects-blueprint-header",
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
            <FolderKanban className="size-3.5" strokeWidth={2.25} />
          </span>
          <h1 className="calculator-page-header__title">My projects</h1>
          {projectCount != null ? (
            <span className="calculator-page-header__tag">
              {projectCount} {projectCount === 1 ? "project" : "projects"}
            </span>
          ) : null}
        </div>
        <div className="calculator-page-header__subrow">
          <p className="calculator-page-header__description">
            Save calculator snapshots, roll up engineering specs, and export
            combined PDF reports—stored locally in this browser.
          </p>
          <span className="projects-blueprint-header__label">Workspace</span>
        </div>
      </div>
    </header>
  );
}
