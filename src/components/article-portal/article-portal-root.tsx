import { getArticles } from "@/data/articles";
import { ArticlePortalProvider } from "@/components/article-portal/article-portal-provider";

/** Server wrapper — loads the article catalog once for the whole app. */
export function ArticlePortalRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = getArticles();
  return (
    <ArticlePortalProvider articles={articles}>{children}</ArticlePortalProvider>
  );
}
