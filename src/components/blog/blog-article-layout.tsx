import type { ReactNode } from "react";
import { BlogQuickLaunchWidget } from "@/components/blog/blog-quick-launch-widget";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

interface BlogArticleLayoutProps {
  post: BlogPost;
  children: ReactNode;
}

/**
 * Blog article template: prose column + sticky Quick Launch sidebar (desktop)
 * and footer widget (mobile / end of article).
 */
export function BlogArticleLayout({ post, children }: BlogArticleLayoutProps) {
  const toolId = post.relatedToolId;

  return (
    <div
      className={cn(
        "lg:grid lg:items-start lg:gap-12 lg:justify-center",
        toolId
          ? "lg:grid-cols-[minmax(0,48rem)_minmax(240px,280px)]"
          : "lg:grid-cols-1"
      )}
    >
      <div className="mx-auto min-w-0 max-w-3xl lg:mx-0">
        {children}

        {toolId ? (
          <div className="mt-10 lg:hidden" aria-label="Quick launch calculator">
            <BlogQuickLaunchWidget
              calculatorId={toolId}
              placement="footer"
            />
          </div>
        ) : null}
      </div>

      {toolId ? (
        <aside
          className="mx-auto hidden w-full max-w-sm lg:mx-0 lg:block"
          aria-label="Quick launch calculator sidebar"
        >
          <div className="sticky top-24">
            <BlogQuickLaunchWidget
              calculatorId={toolId}
              placement="sidebar"
            />
          </div>
        </aside>
      ) : null}
    </div>
  );
}
