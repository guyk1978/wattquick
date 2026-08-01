"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import { RelatedArticlesWorkspaceProvider } from "@/components/calculator/calculator-modal-wrapper";
import { ToolHeader, type ToolHeaderTab } from "@/components/tool-header";
import { ToolModalReviews } from "@/components/grid-modal/tool-modal-reviews";
import { ToolModalViz } from "@/components/grid-modal/tool-modal-viz";
import { ToolWorkspaceNav } from "@/components/grid-modal/tool-workspace-nav";
import type { CalculatorId } from "@/lib/calculators";
import type { RelatedArticleCard } from "@/lib/calculators/related-articles";
import { hasCalculatorViz } from "@/lib/calculator-viz-ids";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { categoryThemeStyle } from "@/lib/category-theme";
import {
  addSnapshotToProject,
  createProject,
  listProjects,
  type ProjectSavePayload,
} from "@/lib/project-store";
import { cn } from "@/lib/utils";

type ToolWorkspacePageProps = {
  calculatorId: CalculatorId;
  className?: string;
  initialTab?: ToolHeaderTab;
  /** Permanent SEO documentation rendered below the workspace (always in the DOM). */
  documentation?: ReactNode;
  related?: ReactNode;
  relatedArticles?: RelatedArticleCard[];
};

function readViewParam(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get("view");
  } catch {
    return null;
  }
}

function resolveInitialTab(
  initialTab: ToolHeaderTab,
  viewFromUrl: string | null,
  calculatorId: CalculatorId
): ToolHeaderTab {
  if (
    (initialTab === "viz" || viewFromUrl === "viz") &&
    hasCalculatorViz(calculatorId)
  ) {
    return "viz";
  }
  if (initialTab === "reviews" || viewFromUrl === "reviews") return "reviews";
  if (initialTab === "related" || viewFromUrl === "related") return "related";
  if (initialTab && initialTab !== "calc" && initialTab !== "doc") {
    return initialTab;
  }
  return "calc";
}

/**
 * Standalone full-page tool workspace: site chrome stays visible, vertical
 * section nav switches Calculator / Viz / Related / Reviews, and documentation
 * is always open below for crawlers and readers.
 */
export function ToolWorkspacePage({
  calculatorId,
  className,
  initialTab = "calc",
  documentation,
  related,
  relatedArticles = [],
}: ToolWorkspacePageProps) {
  const meta = getCalculatorMeta(calculatorId);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastCalculatorIdRef = useRef(calculatorId);

  /**
   * Local tab state is the source of truth. Avoid `useSearchParams` +
   * `router.replace` here — that pair remounts the Suspense boundary and can
   * reset the active section so sidebar clicks look dead.
   */
  const [activeTab, setActiveTab] = useState<ToolHeaderTab>(() =>
    resolveInitialTab(initialTab, readViewParam(), calculatorId)
  );
  const [savePromptOpen, setSavePromptOpen] = useState(false);
  const [projectNameDraft, setProjectNameDraft] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const hasRelated = related != null;
  const hasViz = hasCalculatorViz(calculatorId);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const syncTabToUrl = useCallback((tab: ToolHeaderTab) => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      if (tab === "calc") url.searchParams.delete("view");
      else url.searchParams.set("view", tab);
      const next = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next === current) return;
      window.history.replaceState(window.history.state, "", next);
    } catch {
      /* ignore malformed URL edge cases */
    }
  }, []);

  const handleTabChange = useCallback((tab: ToolHeaderTab) => {
    setActiveTab(tab);
    syncTabToUrl(tab);
  }, [syncTabToUrl]);

  // Reset section when navigating to a different tool — not on every URL tweak.
  useEffect(() => {
    if (lastCalculatorIdRef.current === calculatorId) return;
    lastCalculatorIdRef.current = calculatorId;
    setActiveTab(resolveInitialTab(initialTab, readViewParam(), calculatorId));
  }, [calculatorId, initialTab]);

  // Keep section in sync with browser back/forward on ?view=.
  useEffect(() => {
    const onPopState = () => {
      setActiveTab(resolveInitialTab(initialTab, readViewParam(), calculatorId));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [calculatorId, initialTab]);

  const extractProjectPayload = useCallback((): ProjectSavePayload | null => {
    const root = panelRef.current;
    if (!root) return null;

    const calcView = root.querySelector(
      ".tool-workspace-page__view--calc"
    ) as HTMLElement | null;
    if (!calcView) return null;

    const values: Record<string, string> = {};
    const fieldLabels: Record<string, string> = {};

    const formEls = calcView.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input[id], select[id], textarea[id]");

    for (const el of Array.from(formEls)) {
      if (el.disabled) continue;
      const id = el.id;
      if (!id) continue;

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
        values[id] =
          input.type === "checkbox"
            ? input.checked
              ? "true"
              : "false"
            : input.value;
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

    return {
      calculatorSlug: calculatorId,
      calculatorTitle: meta.title,
      values,
      fieldLabels,
      results,
      summary: summary || meta.title,
    };
  }, [calculatorId, meta.title]);

  const handleConfirmSave = useCallback(() => {
    const name = projectNameDraft.trim();
    if (!name) return;

    const payload = extractProjectPayload();
    if (!payload) return;

    const existing = listProjects().find((p) => p.name === name);
    const project = existing ?? createProject(name);
    addSnapshotToProject(project.id, payload);

    setSavePromptOpen(false);
    setProjectNameDraft("");
    showToast("Saved!");
  }, [extractProjectPayload, projectNameDraft, showToast]);

  return (
    <RelatedArticlesWorkspaceProvider articles={relatedArticles}>
      <div
        className={cn("tool-workspace-page", className)}
        style={categoryThemeStyle(meta.category)}
      >
        <div className="tool-workspace-page__container">
          <div className="tool-workspace-page__frame" ref={panelRef}>
            <ToolHeader
              title={meta.title}
              showTabs={false}
              titleAs="h1"
              calculatorId={calculatorId}
              onSaveProject={() => {
                setProjectNameDraft("");
                setSavePromptOpen(true);
              }}
              fullscreenTargetRef={panelRef}
              shareText={meta.description}
              titleId="tool-workspace-page-title"
            />

            {savePromptOpen ? (
              <div
                className="tool-workspace-modal__saveprompt-backdrop"
                role="dialog"
                aria-modal="true"
              >
                <div className="tool-workspace-modal__saveprompt">
                  <p className="tool-workspace-modal__saveprompt-title">
                    Project Name
                  </p>
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

            {toast ? (
              <div className="tool-workspace-modal__toast">{toast}</div>
            ) : null}

            <div className="tool-workspace-page__layout">
              <ToolWorkspaceNav
                activeTab={activeTab}
                onTabChange={handleTabChange}
                hasVizTab={hasViz}
                hasRelatedTab={hasRelated}
                hasReviewsTab
              />

              <div className="tool-workspace-page__main">
                <div
                  id="tool-section-panel-calc"
                  role="tabpanel"
                  aria-labelledby="tool-section-tab-calc"
                  hidden={activeTab !== "calc"}
                  className={cn(
                    "tool-workspace-page__view tool-workspace-page__view--calc",
                    activeTab === "calc" && "tool-workspace-page__view--active"
                  )}
                >
                  <CalculatorPanel
                    id={calculatorId}
                    variant="modal"
                    className="h-full min-h-0 w-full max-w-full"
                  />
                </div>

                {hasViz ? (
                  <div
                    id="tool-section-panel-viz"
                    role="tabpanel"
                    aria-labelledby="tool-section-tab-viz"
                    hidden={activeTab !== "viz"}
                    className={cn(
                      "tool-workspace-page__view tool-workspace-page__view--viz",
                      activeTab === "viz" && "tool-workspace-page__view--active"
                    )}
                  >
                    {activeTab === "viz" ? (
                      <div className="tool-workspace-page__scroll">
                        <ToolModalViz id={calculatorId} />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {hasRelated ? (
                  <div
                    id="tool-section-panel-related"
                    role="tabpanel"
                    aria-labelledby="tool-section-tab-related"
                    hidden={activeTab !== "related"}
                    className={cn(
                      "tool-workspace-page__view tool-workspace-page__view--related",
                      activeTab === "related" &&
                        "tool-workspace-page__view--active"
                    )}
                  >
                    <div className="tool-workspace-page__scroll">{related}</div>
                  </div>
                ) : null}

                <div
                  id="tool-section-panel-reviews"
                  role="tabpanel"
                  aria-labelledby="tool-section-tab-reviews"
                  hidden={activeTab !== "reviews"}
                  className={cn(
                    "tool-workspace-page__view tool-workspace-page__view--reviews",
                    activeTab === "reviews" &&
                      "tool-workspace-page__view--active"
                  )}
                >
                  {activeTab === "reviews" ? (
                    <div className="tool-workspace-page__scroll">
                      <ToolModalReviews id={calculatorId} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {documentation ? (
            <section
              className="tool-workspace-page__seo"
              aria-labelledby="tool-workspace-seo-heading"
            >
              <h2
                id="tool-workspace-seo-heading"
                className="tool-workspace-page__seo-title"
              >
                How this calculator works
              </h2>
              {documentation}
            </section>
          ) : null}
        </div>
      </div>
    </RelatedArticlesWorkspaceProvider>
  );
}
