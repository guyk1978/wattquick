"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FileText, FolderPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import { RelatedArticlesWorkspaceProvider } from "@/components/calculator/calculator-modal-wrapper";
import { FavoriteCalculatorButton } from "@/components/favorite-calculator-button";
import type { CalculatorId } from "@/lib/calculators";
import type { RelatedArticleCard } from "@/lib/calculators/related-articles";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getCategoryPageHref } from "@/lib/category-routes";
import {
  addSnapshotToProject,
  createProject,
  listProjects,
  type ProjectSavePayload,
} from "@/lib/project-store";
import { cn } from "@/lib/utils";

type ToolWorkspaceModalProps = {
  calculatorId: CalculatorId;
  open?: boolean;
  className?: string;
  /** Guide + SEO article content shown in the documentation pane. */
  documentation?: ReactNode;
  /** Further Reading cards shared with CalculatorModalWrapper + Documentation. */
  relatedArticles?: RelatedArticleCard[];
};

/**
 * Full-viewport glassmorphic tool modal.
 * Framer Motion scale-up on open; Escape / backdrop closes to category URL.
 */
export function ToolWorkspaceModal({
  calculatorId,
  open = true,
  className,
  documentation,
  relatedArticles = [],
}: ToolWorkspaceModalProps) {
  const router = useRouter();
  const meta = getCalculatorMeta(calculatorId);
  const categoryHref = getCategoryPageHref(meta.category);
  const [showDocs, setShowDocs] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [savePromptOpen, setSavePromptOpen] = useState(false);
  const [projectNameDraft, setProjectNameDraft] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const extractProjectPayloadFromModal = useCallback((): ProjectSavePayload | null => {
    const root = panelRef.current;
    if (!root) return null;

    const calcView = root.querySelector(
      ".tool-workspace-modal__view--calc"
    ) as HTMLElement | null;
    if (!calcView) return null;

    const values: Record<string, string> = {};
    const fieldLabels: Record<string, string> = {};

    const formEls = calcView.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input[id], select[id], textarea[id]'
    );

    for (const el of Array.from(formEls)) {
      if (el.disabled) continue;
      const id = el.id;
      if (!id) continue;

      // Skip non-data controls.
      const tag = el.tagName.toLowerCase();
      if (tag === "input") {
        const type = el.type;
        if (
          type === "button" ||
          type === "submit" ||
          type === "reset" ||
          type === "hidden"
        ) {
          continue;
        }
      }

      if (el instanceof HTMLSelectElement) {
        values[id] = el.value;
      } else if (el instanceof HTMLTextAreaElement) {
        values[id] = el.value;
      } else {
        const input = el as HTMLInputElement;
        const type = input.type;
        if (type === "checkbox") {
          values[id] = input.checked ? "true" : "false";
        } else {
          values[id] = input.value;
        }
      }

      const labelEl = calcView.querySelector(`label[for="${CSS.escape(id)}"]`);
      const labelText = (labelEl?.textContent ?? "").trim();
      if (labelText) fieldLabels[id] = labelText;
    }

    const results: Record<string, string> = {};
    let summary = "";

    const metricCards = Array.from(
      calcView.querySelectorAll<HTMLElement>(".calculator-status-board__metric")
    );

    for (const card of metricCards) {
      const label = card
        .querySelector<HTMLElement>(".calculator-status-board__metric-label")
        ?.textContent?.trim();
      const valueText = card
        .querySelector<HTMLElement>(".calculator-status-board__metric-value")
        ?.textContent?.trim();
      const unit = card
        .querySelector<HTMLElement>(".calculator-status-board__metric-unit")
        ?.textContent?.trim();
      const detail = card
        .querySelector<HTMLElement>(".calculator-result-primary__detail")
        ?.textContent?.trim();

      if (!label) continue;

      const value = valueText && valueText !== "—" ? valueText : "";
      const combined = value ? `${value}${unit ? ` ${unit}` : ""}`.trim() : "";
      if (combined) results[label] = combined;
      if (!summary && combined) summary = combined;
      if (detail) results.Notes ??= detail;
    }

    // Always store inputs; results may be empty for calculators that render differently.
    const payload: ProjectSavePayload = {
      calculatorSlug: calculatorId,
      calculatorTitle: meta.title,
      values,
      fieldLabels,
      results,
      summary: summary || meta.title,
    };

    return payload;
  }, [calculatorId, meta.title]);

  const handleConfirmSave = useCallback(() => {
    const name = projectNameDraft.trim();
    if (!name) return;

    const payload = extractProjectPayloadFromModal();
    if (!payload) return;

    const existing = listProjects().find((p) => p.name === name);
    const project = existing ?? createProject(name);
    addSnapshotToProject(project.id, payload);

    setSavePromptOpen(false);
    setProjectNameDraft("");
    showToast("Saved!");
  }, [extractProjectPayloadFromModal, projectNameDraft, showToast]);

  const onRequestSaveProject = useCallback(() => {
    setProjectNameDraft("");
    setSavePromptOpen(true);
  }, []);

  const showDocsRef = useRef(showDocs);
  showDocsRef.current = showDocs;
  const hasDocumentation = documentation != null;

  const close = useCallback(() => {
    router.push(categoryHref, { scroll: false });
  }, [categoryHref, router]);

  useEffect(() => {
    if (!open) {
      setShowDocs(false);
      return;
    }
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (showDocsRef.current) {
        setShowDocs(false);
        return;
      }
      close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, open]);

  if (!open) return null;

  return (
    <RelatedArticlesWorkspaceProvider articles={relatedArticles}>
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-workspace-modal-title"
      className={cn("tool-workspace-modal tool-workspace-modal--open", className)}
    >
      <button
        type="button"
        className="tool-workspace-modal__backdrop"
        aria-label="Close calculator"
        onClick={close}
      />

      <motion.div
        className="tool-workspace-modal__panel"
        ref={panelRef}
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <header className="tool-workspace-modal__header">
          <div className="min-w-0">
            <p className="tool-workspace-modal__eyebrow">
              {showDocs ? "Documentation" : meta.tag}
            </p>
            <h2
              id="tool-workspace-modal-title"
              className="tool-workspace-modal__title"
            >
              {meta.title}
            </h2>
          </div>

          <div className="tool-workspace-modal__actions">
            <button
              type="button"
              className="tool-workspace-modal__save"
              aria-label="Save project"
              onClick={onRequestSaveProject}
              title="Save project"
            >
              <FolderPlus className="size-4" strokeWidth={2} aria-hidden />
            </button>
            <FavoriteCalculatorButton
              calculatorId={calculatorId}
              variant="toolbar"
              className="tool-workspace-modal__favorite"
            />
            {hasDocumentation ? (
              <button
                type="button"
                className={cn(
                  "tool-workspace-modal__doc-toggle",
                  showDocs && "tool-workspace-modal__doc-toggle--active"
                )}
                onClick={() => setShowDocs((value) => !value)}
                aria-pressed={showDocs}
                aria-label={
                  showDocs ? "Show calculator" : "Show documentation"
                }
              >
                <FileText className="size-4" aria-hidden />
                <span className="tool-workspace-modal__doc-toggle-label">
                  {showDocs ? "Calc" : "Doc"}
                </span>
              </button>
            ) : null}
            <button
              type="button"
              className="tool-workspace-modal__close"
              onClick={close}
              aria-label="Close"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </header>

        {savePromptOpen ? (
          <div className="tool-workspace-modal__saveprompt-backdrop" role="dialog" aria-modal="true">
            <div className="tool-workspace-modal__saveprompt">
              <p className="tool-workspace-modal__saveprompt-title">Project Name</p>
              <input
                type="text"
                value={projectNameDraft}
                onChange={(e) => setProjectNameDraft(e.target.value)}
                className="tool-workspace-modal__saveprompt-input"
                placeholder="e.g. My EV estimate"
                autoFocus
              />
              <div className="tool-workspace-modal__saveprompt-actions">
                <button
                  type="button"
                  className="tool-workspace-modal__saveprompt-btn tool-workspace-modal__saveprompt-btn--ghost"
                  onClick={() => {
                    setSavePromptOpen(false);
                    setProjectNameDraft("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="tool-workspace-modal__saveprompt-btn tool-workspace-modal__saveprompt-btn--primary"
                  onClick={handleConfirmSave}
                  disabled={!projectNameDraft.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {toast ? <div className="tool-workspace-modal__toast">{toast}</div> : null}

        <div className="tool-workspace-modal__body">
          <div
            className={cn(
              "tool-workspace-modal__view tool-workspace-modal__view--calc",
              !showDocs && "tool-workspace-modal__view--active"
            )}
            aria-hidden={showDocs}
          >
            <CalculatorPanel
              id={calculatorId}
              variant="modal"
              className="h-full min-h-0 w-full max-w-full"
            />
          </div>

          {hasDocumentation ? (
            <div
              className={cn(
                "tool-workspace-modal__view tool-workspace-modal__view--docs",
                showDocs && "tool-workspace-modal__view--active"
              )}
              aria-hidden={!showDocs}
            >
              <div className="tool-workspace-modal__docs-scroll">
                {documentation}
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
    </RelatedArticlesWorkspaceProvider>
  );
}
