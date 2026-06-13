import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogBackLinkProps {
  className?: string;
}

export function BlogBackLink({ className }: BlogBackLinkProps) {
  return (
    <Link
      href="/blog/"
      className={cn(
        "group mb-8 inline-flex items-center gap-2 rounded-none border px-2.5 py-1.5",
        "border-slate-200 bg-white text-sm font-medium text-slate-600",
        "transition-colors duration-150",
        "hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
        "dark:border-border/50 dark:bg-transparent dark:text-muted-foreground",
        "dark:hover:border-border dark:hover:bg-muted/40 dark:hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      <ArrowLeft
        className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
        aria-hidden
      />
      Back to blog
    </Link>
  );
}
