import { BlogPostList } from "@/components/blog/blog-post-list";
import { GridShell } from "@/components/grid-modal/grid-shell";
import type { BlogPost } from "@/lib/blog/posts";

type ArticlesHubPageProps = {
  posts: BlogPost[];
};

/** Articles index — GridNav/Footer chrome, central container width. */
export function ArticlesHubPage({ posts }: ArticlesHubPageProps) {
  const countLabel =
    posts.length === 1 ? "1 article" : `${posts.length} articles`;

  return (
    <GridShell
      breadcrumbs={[{ label: "Articles" }]}
      title="Articles"
      description={`Expert guides on EV charging, solar, batteries, and home energy—${countLabel}, each paired with interactive WattQuick tools.`}
    >
      <div className="articles-page articles-page--hub">
        <div className="blog-hub blog-hub--matte">
          {posts.length === 0 ? (
            <div className="blog-hub__empty" role="status">
              <p className="blog-hub__empty-title">No articles yet</p>
              <p className="blog-hub__empty-text">
                Check back soon for new guides.
              </p>
            </div>
          ) : (
            <BlogPostList posts={posts} />
          )}
        </div>
      </div>
    </GridShell>
  );
}
