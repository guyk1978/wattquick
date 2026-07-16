"use client";

import { useEffect, useId, useMemo } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, X } from "lucide-react";
import { useArticlePortal } from "@/components/article-portal/article-portal-provider";
import { cn } from "@/lib/utils";

/**
 * Site-wide Article Portal — sidebar index + article body.
 * Matches calculator modal Industrial Matte styling.
 */
export function ArticlePortal() {
  const titleId = useId();
  const {
    articles,
    isOpen,
    activeArticleId,
    openArticle,
    closeArticlePortal,
  } = useArticlePortal();

  const activeArticle = useMemo(
    () => articles.find((article) => article.id === activeArticleId) ?? null,
    [articles, activeArticleId]
  );

  useEffect(() => {
    if (!isOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeArticlePortal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeArticlePortal, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="article-portal tool-workspace-modal tool-workspace-modal--open"
    >
      <button
        type="button"
        className="tool-workspace-modal__backdrop"
        aria-label="Close articles"
        onClick={closeArticlePortal}
      />

      <motion.div
        className="tool-workspace-modal__panel article-portal__panel"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="tool-workspace-modal__header article-portal__header">
          <div className="article-portal__title-block">
            <p className="tool-workspace-modal__eyebrow">
              <BookOpen className="article-portal__eyebrow-icon" aria-hidden />
              Articles
            </p>
            <h2 id={titleId} className="tool-workspace-modal__title">
              {activeArticle?.title ?? "Article Portal"}
            </h2>
          </div>
          <button
            type="button"
            className="tool-workspace-modal__close"
            onClick={closeArticlePortal}
            aria-label="Close articles"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="article-portal__layout">
          <aside className="article-portal__sidebar" aria-label="Article index">
            <p className="article-portal__sidebar-label">Index</p>
            <div className="article-portal__sidebar-scroll scroll-container">
              <ul className="article-portal__index" role="list">
                {articles.map((article) => {
                  const active = article.id === activeArticleId;
                  return (
                    <li key={article.id}>
                      <button
                        type="button"
                        className={cn(
                          "article-portal__index-item",
                          active && "article-portal__index-item--active"
                        )}
                        aria-current={active ? "true" : undefined}
                        onClick={() => openArticle(article.id)}
                      >
                        <span className="article-portal__index-title">
                          {article.title}
                        </span>
                        {article.category ? (
                          <span className="article-portal__index-meta">
                            {article.category}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="article-portal__content scroll-container">
            {activeArticle ? (
              <article
                className="tool-modal-docs tool-modal-docs--article"
                aria-label={activeArticle.title}
              >
                <header className="tool-modal-docs__intro">
                  {activeArticle.category || activeArticle.readMinutes ? (
                    <p className="tool-modal-docs__article-meta">
                      {[activeArticle.category, activeArticle.readMinutes
                        ? `${activeArticle.readMinutes} min read`
                        : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                  <h3 className="tool-modal-docs__title">{activeArticle.title}</h3>
                  {activeArticle.snippet ? (
                    <p className="tool-modal-docs__paragraph">
                      {activeArticle.snippet}
                    </p>
                  ) : null}
                </header>
                <div className="tool-modal-docs__prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {activeArticle.content}
                  </ReactMarkdown>
                </div>
              </article>
            ) : (
              <p className="article-portal__empty">
                Select an article from the index.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
