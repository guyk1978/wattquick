"use client";

import { BlogPostList } from "@/components/blog/blog-post-list";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { GlobalPageLayout } from "@/components/layout/global-page-layout";
import type { BlogPost } from "@/lib/blog/posts";

interface BlogBlueprintPageProps {
  posts: BlogPost[];
}

export function BlogBlueprintPage({ posts }: BlogBlueprintPageProps) {
  const countLabel =
    posts.length === 1 ? "1 article" : `${posts.length} articles`;

  return (
    <GlobalPageLayout
      breadcrumbs={[{ label: "Blog" }]}
      title="Blog"
      description={`Expert guides on EV charging, solar, batteries, and home energy—${countLabel}, each paired with interactive WattQuick tools.`}
      width="wide"
    >
      <CalculatorAdSlots />

      <div className="blog-hub blog-hub--matte">
        {posts.length === 0 ? (
          <div className="blog-hub__empty" role="status">
            <p className="blog-hub__empty-title">No articles yet</p>
            <p className="blog-hub__empty-text">Check back soon for new guides.</p>
          </div>
        ) : (
          <BlogPostList posts={posts} />
        )}
      </div>
    </GlobalPageLayout>
  );
}
