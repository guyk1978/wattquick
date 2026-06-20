import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function PageShell({ children, className, narrow }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 py-10 sm:px-6 sm:py-14",
        narrow ? "max-w-2xl" : "max-w-3xl",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("page-header mb-10 space-y-3 sm:mb-12", className)}>
      <h1 className="page-header__title text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="page-header__description text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
