"use client";

import { useEffect, useId, useMemo, useRef, isValidElement, type ReactNode } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { X } from "lucide-react";
import { slugifyHeading, type LegalDocument } from "@/lib/legal-types";
import { cn } from "@/lib/utils";

type LegalModalProps = {
  open: boolean;
  document: LegalDocument | null;
  onClose: () => void;
  className?: string;
};

function childrenToText(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return childrenToText(children.props.children);
  }
  return "";
}

function buildMarkdownComponents(
  onHeading: (id: string, node: HTMLHeadingElement | null) => void
): Components {
  return {
    h2: ({ children }) => {
      const id = slugifyHeading(childrenToText(children));
      return (
        <h2
          id={id}
          ref={(node) => onHeading(id, node)}
          className="legal-modal__heading"
        >
          {children}
        </h2>
      );
    },
    p: ({ children }) => <p className="legal-modal__paragraph">{children}</p>,
    ul: ({ children }) => <ul className="legal-modal__list">{children}</ul>,
    ol: ({ children }) => (
      <ol className="legal-modal__list legal-modal__list--ordered">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong>{children}</strong>,
    a: ({ href, children }) => (
      <a href={href} className="legal-modal__link">
        {children}
      </a>
    ),
  };
}

/** Industrial Matte legal document overlay with sticky TOC + scrollable body. */
export function LegalModal({
  open,
  document: doc,
  onClose,
  className,
}: LegalModalProps) {
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<Map<string, HTMLHeadingElement>>(new Map());

  useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = window.document.body.style.overflow;
    const prevHtmlOverflow = window.document.documentElement.style.overflow;
    window.document.body.style.overflow = "hidden";
    window.document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.document.body.style.overflow = prevBodyOverflow;
      window.document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open, doc?.id]);

  const markdownComponents = useMemo(
    () =>
      buildMarkdownComponents((id, node) => {
        if (node) headingRefs.current.set(id, node);
        else headingRefs.current.delete(id);
      }),
    []
  );

  if (!open || !doc) return null;

  const jumpTo = (sectionId: string) => {
    const target =
      headingRefs.current.get(sectionId) ??
      scrollRef.current?.querySelector(`#${CSS.escape(sectionId)}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "tool-workspace-modal tool-workspace-modal--open legal-modal",
        className
      )}
    >
      <button
        type="button"
        className="tool-workspace-modal__backdrop"
        aria-label="Close legal document"
        onClick={onClose}
      />

      <motion.div
        className="tool-workspace-modal__panel legal-modal__panel"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <header className="tool-workspace-modal__header legal-modal__header">
          <div className="min-w-0">
            <p className="tool-workspace-modal__eyebrow">{doc.eyebrow}</p>
            <h2 id={titleId} className="tool-workspace-modal__title">
              {doc.title}
            </h2>
            {doc.updated ? (
              <p className="legal-modal__updated">
                Last updated: {doc.updated}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className="tool-workspace-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="legal-modal__layout">
          {doc.sections.length > 0 ? (
            <nav className="legal-modal__toc" aria-label="Table of contents">
              <p className="legal-modal__toc-label">Contents</p>
              <ul className="legal-modal__toc-list">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className="legal-modal__toc-link"
                      onClick={() => jumpTo(section.id)}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div ref={scrollRef} className="legal-modal__scroll">
            <div className="legal-modal__prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {doc.markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
