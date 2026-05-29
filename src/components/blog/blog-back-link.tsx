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
        "group mb-8 inline-flex items-center gap-2 rounded-full px-3 py-2",
        "text-sm font-medium text-slate-600 dark:text-slate-400",
        "transition-[color,transform,background] duration-200",
        "hover:-translate-x-1 hover:bg-slate-100 hover:text-slate-900",
        "dark:hover:bg-slate-800/60 dark:hover:text-slate-100",
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
