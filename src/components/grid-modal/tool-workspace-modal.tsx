"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import { RelatedArticlesWorkspaceProvider } from "@/components/calculator/calculator-modal-wrapper";
import { ToolHeader, type ToolHeaderTab } from "@/components/tool-header";
import { ToolModalReviews } from "@/components/grid-modal/tool-modal-reviews";
import { ToolModalCategories } from "@/components/grid-modal/tool-modal-categories";
import { ToolModalViz } from "@/components/grid-modal/tool-modal-viz";
import type { CalculatorId } from "@/lib/calculators";
import type { RelatedArticleCard } from "@/lib/calculators/related-articles";
import { hasCalculatorViz } from "@/lib/calculator-viz-ids";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { categoryThemeStyle } from "@/lib/category-theme";
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
  /** Initial header tab when the modal opens (client may also read `?view=viz` / `?view=reviews`). */
  initialTab?: ToolHeaderTab;
  /** Guide + SEO article content shown in the documentation pane. */
  documentation?: ReactNode;
  /** Related calculators shown in the RELATED tab. */
  related?: ReactNode;
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
  initialTab = "calc",
  documentation,
  related,
  relatedArticles = [],
}: ToolWorkspaceModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewFromUrl = searchParams.get("view");
  const meta = getCalculatorMeta(calculatorId);
  const categoryHref = getCategoryPageHref(meta.category);
  const [activeTab, setActiveTab] = useState<ToolHeaderTab>(initialTab);
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

  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const hasDocumentation = documentation != null;
  const hasRelated = related != null;
  const hasViz = hasCalculatorViz(calculatorId);

  const close = useCallback(() => {
    router.push(categoryHref, { scroll: false });
  }, [categoryHref, router]);

  useEffect(() => {
    if (!open) {
      setActiveTab("calc");
      return;
    }
    const wantsViz =
      initialTab === "viz" || viewFromUrl === "viz";
    const wantsReviews =
      initialTab === "reviews" || viewFromUrl === "reviews";
    const wantsCategories =
      initialTab === "categories" || viewFromUrl === "categories";
    if (wantsViz && hasCalculatorViz(calculatorId)) {
      setActiveTab("viz");
    } else if (wantsReviews) {
      setActiveTab("reviews");
    } else if (wantsCategories) {
      setActiveTab("categories");
    } else if (initialTab && initialTab !== "calc") {
      setActiveTab(initialTab);
    }
  }, [open, initialTab, viewFromUrl, calculatorId]);

  useEffect(() => {
    if (!open) return;
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
      if (activeTabRef.current !== "calc") {
        setActiveTab("calc");
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

      {/* Category theme color scopes the panel; ToolHeader accents read it. */}
      <motion.div
        className="tool-workspace-modal__panel"
        ref={panelRef}
        style={categoryThemeStyle(meta.category)}
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <ToolHeader
          title={meta.title}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasVizTab={hasViz}
          hasDocTab={hasDocumentation}
          hasRelatedTab={hasRelated}
          hasCategoriesTab
          hasReviewsTab
          calculatorId={calculatorId}
          onSaveProject={onRequestSaveProject}
          fullscreenTargetRef={panelRef}
          shareText={meta.description}
          onClose={close}
          titleId="tool-workspace-modal-title"
        />

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
              activeTab === "calc" && "tool-workspace-modal__view--active"
            )}
            aria-hidden={activeTab !== "calc"}
          >
            <CalculatorPanel
              id={calculatorId}
              variant="modal"
              className="h-full min-h-0 w-full max-w-full"
            />
          </div>

          {hasViz ? (
            <div
              className={cn(
                "tool-workspace-modal__view tool-workspace-modal__view--viz",
                activeTab === "viz" && "tool-workspace-modal__view--active"
              )}
              aria-hidden={activeTab !== "viz"}
            >
              {activeTab === "viz" ? (
                <div className="tool-workspace-modal__docs-scroll">
                  <ToolModalViz id={calculatorId} />
                </div>
              ) : null}
            </div>
          ) : null}

          {hasDocumentation ? (
            <div
              className={cn(
                "tool-workspace-modal__view tool-workspace-modal__view--docs",
                activeTab === "doc" && "tool-workspace-modal__view--active"
              )}
              aria-hidden={activeTab !== "doc"}
            >
              <div className="tool-workspace-modal__docs-scroll">
                {documentation}
              </div>
            </div>
          ) : null}

          {hasRelated ? (
            <div
              className={cn(
                "tool-workspace-modal__view tool-workspace-modal__view--related",
                activeTab === "related" && "tool-workspace-modal__view--active"
              )}
              aria-hidden={activeTab !== "related"}
            >
              <div className="tool-workspace-modal__docs-scroll">
                {related}
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "tool-workspace-modal__view tool-workspace-modal__view--categories",
              activeTab === "categories" && "tool-workspace-modal__view--active"
            )}
            aria-hidden={activeTab !== "categories"}
          >
            {activeTab === "categories" ? (
              <div className="tool-workspace-modal__docs-scroll">
                <ToolModalCategories activeCategory={meta.category} />
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "tool-workspace-modal__view tool-workspace-modal__view--reviews",
              activeTab === "reviews" && "tool-workspace-modal__view--active"
            )}
            aria-hidden={activeTab !== "reviews"}
          >
            {activeTab === "reviews" ? (
              <div className="tool-workspace-modal__docs-scroll">
                <ToolModalReviews id={calculatorId} />
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
    </RelatedArticlesWorkspaceProvider>
  );
}
