import type { ReactNode } from "react";
import { BlogQuickLaunchWidget } from "@/components/blog/blog-quick-launch-widget";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

interface BlogArticleLayoutProps {
  post: BlogPost;
  children: ReactNode;
}

/**
 * Blog article template: prose column + sticky related-tool sidebar (desktop).
 */
export function BlogArticleLayout({ post, children }: BlogArticleLayoutProps) {
  const toolId = post.relatedToolId;

  return (
    <div
      className={cn(
        "lg:grid lg:items-start lg:gap-12 lg:justify-center",
        toolId
          ? "lg:grid-cols-[minmax(0,48rem)_minmax(260px,300px)]"
          : "lg:grid-cols-1"
      )}
    >
      <div className="mx-auto min-w-0 max-w-3xl lg:mx-0">
        {children}

        {toolId ? (
          <div className="mt-12 lg:hidden" aria-label="Related calculator">
            <BlogQuickLaunchWidget
              calculatorId={toolId}
              articleSlug={post.slug}
              placement="footer"
            />
          </div>
        ) : null}
      </div>

      {toolId ? (
        <aside
          className="mx-auto hidden w-full max-w-sm lg:mx-0 lg:block"
          aria-label="Related calculator sidebar"
        >
          <div className="sticky top-28">
            <BlogQuickLaunchWidget
              calculatorId={toolId}
              articleSlug={post.slug}
              placement="sidebar"
            />
          </div>
        </aside>
      ) : null}
    </div>
  );
}
