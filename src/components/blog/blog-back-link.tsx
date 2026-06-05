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
        "group mb-8 inline-flex items-center gap-2 rounded-none border border-border/50 px-2.5 py-1.5",
        "text-sm font-medium text-muted-foreground",
        "transition-colors duration-150",
        "hover:border-border hover:bg-muted/40 hover:text-foreground",
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
