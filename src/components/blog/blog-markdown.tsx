import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

const components: Components = {
  h2: ({ children }) => (
    <h2
      className={cn(
        "mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight md:text-3xl",
        "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent",
        "dark:from-white dark:via-slate-100 dark:to-slate-300",
        "first:mt-0"
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 scroll-mt-24 text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-slate-800 dark:text-slate-200">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 pl-6 text-lg leading-relaxed text-slate-800 dark:text-slate-200">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-slate-200 bg-white py-1 pl-5 text-lg leading-relaxed text-slate-700 italic shadow-sm dark:border-white/15 dark:bg-[#1a1a1a] dark:text-[#d4d4d4] dark:shadow-none">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
  ),
};

interface BlogMarkdownProps {
  content: string;
  className?: string;
}

export function BlogMarkdown({ content, className }: BlogMarkdownProps) {
  return (
    <div
      className={cn(
        "blog-prose space-y-6",
        "prose-p:text-lg prose-p:leading-relaxed",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
