import Link from "next/link";
import type { ReactNode } from "react";
import { BlueprintHubShell } from "@/components/blueprint/blueprint-hub-shell";
import { BlueprintListNav } from "@/components/blueprint/blueprint-list-nav";
import { getBlogPostsByCategory, type BlogPost } from "@/lib/blog/posts";

interface BlogArticleBlueprintLayoutProps {
  post: BlogPost;
  children: ReactNode;
}

export function BlogArticleBlueprintLayout({
  post,
  children,
}: BlogArticleBlueprintLayoutProps) {
  const navItems = getBlogPostsByCategory(post.category).map((item) => ({
    id: item.slug,
    href: `/blog/${item.slug}/`,
    label: item.title,
    iconKey: "book-open" as const,
  }));

  return (
    <BlueprintHubShell
      statsTrailing={
        <Link href="/blog/" className="calculator-blueprint-stats__link">
          All articles
        </Link>
      }
      rightNav={
        <BlueprintListNav
          title="Articles"
          items={navItems}
          activeId={post.slug}
          emptyMessage="No articles in this category."
        />
      }
    >
      {children}
    </BlueprintHubShell>
  );
}
