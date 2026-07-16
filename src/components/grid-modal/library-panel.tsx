"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FolderKanban, Library, Trash2, X } from "lucide-react";
import { ProjectModal } from "@/components/grid-modal/project-modal";
import { useCalculatorFavorites } from "@/hooks/use-calculator-favorites";
import { useProjects } from "@/hooks/use-projects";
import { clearAllCalculatorFavorites, removeCalculatorFavorite } from "@/lib/calculator-favorites";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import {
  clearAllProjects,
  deleteProject,
  type WattQuickProject,
} from "@/lib/project-store";
import { cn } from "@/lib/utils";

type LibraryTab = "favorites" | "projects";

type LibraryPanelProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

/** Right-side drawer for favorites and saved projects (localStorage). */
export function LibraryPanel({ open, onClose, className }: LibraryPanelProps) {
  const [tab, setTab] = useState<LibraryTab>("favorites");
  const [editing, setEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<WattQuickProject | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const { ids: favoriteIds, hydrated: favoritesHydrated, refresh: refreshFavorites } =
    useCalculatorFavorites();
  const { projects, hydrated: projectsHydrated, refresh: refreshProjects } =
    useProjects();

  const hydrated = favoritesHydrated && projectsHydrated;

  useEffect(() => {
    if (!open) {
      setEditing(false);
      setProjectModalOpen(false);
      setSelectedProject(null);
      return;
    }
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (projectModalOpen) return;
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open, projectModalOpen]);

  const handleClear = useCallback(() => {
    if (tab === "favorites") {
      if (favoriteIds.length === 0) return;
      if (!window.confirm("Remove all favorite tools?")) return;
      clearAllCalculatorFavorites();
      refreshFavorites();
      return;
    }
    if (projects.length === 0) return;
    if (!window.confirm("Delete all saved projects? This cannot be undone.")) return;
    clearAllProjects();
    refreshProjects();
  }, [favoriteIds.length, projects.length, refreshFavorites, refreshProjects, tab]);

  const handleRemoveFavorite = useCallback(
    (id: (typeof favoriteIds)[number]) => {
      removeCalculatorFavorite(id);
      refreshFavorites();
    },
    [refreshFavorites]
  );

  const handleDeleteProject = useCallback(
    (projectId: string) => {
      deleteProject(projectId);
      refreshProjects();
      if (selectedProject?.id === projectId) {
        setProjectModalOpen(false);
        setSelectedProject(null);
      }
    },
    [refreshProjects, selectedProject?.id]
  );

  const handleOpenProject = useCallback((project: WattQuickProject) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setProjectModalOpen(false);
    setSelectedProject(null);
  }, []);

  if (!open) return null;

  const favorites = favoriteIds.map((id) => getCalculatorMeta(id));
  const itemCount = tab === "favorites" ? favorites.length : projects.length;

  return (
    <div className={cn("library-panel", className)} role="presentation">
      <button
        type="button"
        className="library-panel__backdrop"
        aria-label="Close library"
        onClick={onClose}
      />

      <aside
        id="library-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="library-panel-title"
        className="library-panel__drawer"
      >
        <header className="library-panel__header">
          <div className="library-panel__title-wrap">
            <Library className="size-4 text-[#a3e635]" aria-hidden />
            <h2 id="library-panel-title" className="library-panel__title">
              Library
            </h2>
          </div>
          <button
            type="button"
            className="library-panel__close"
            onClick={onClose}
            aria-label="Close library"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="library-panel__tabs" role="tablist" aria-label="Library sections">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "favorites"}
            className={cn(
              "library-panel__tab",
              tab === "favorites" && "library-panel__tab--active"
            )}
            onClick={() => setTab("favorites")}
          >
            Favorites
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "projects"}
            className={cn(
              "library-panel__tab",
              tab === "projects" && "library-panel__tab--active"
            )}
            onClick={() => setTab("projects")}
          >
            Projects
          </button>
        </div>

        <div className="library-panel__toolbar">
          <button
            type="button"
            className="library-panel__toolbar-btn"
            onClick={handleClear}
            disabled={!hydrated || itemCount === 0}
          >
            Clear
          </button>
          <button
            type="button"
            className={cn(
              "library-panel__toolbar-btn",
              editing && "library-panel__toolbar-btn--active"
            )}
            onClick={() => setEditing((value) => !value)}
            aria-pressed={editing}
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>

        <div className="library-panel__body" role="tabpanel">
          {!hydrated ? (
            <p className="library-panel__empty">Loading…</p>
          ) : tab === "favorites" ? (
            favorites.length === 0 ? (
              <p className="library-panel__empty">
                No favorites yet. Star a calculator to save it here.
              </p>
            ) : (
              <ul className="library-panel__list" role="list">
                {favorites.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <li key={tool.id} className="library-panel__item">
                      <Link
                        href={tool.href}
                        className="library-panel__row"
                        onClick={onClose}
                      >
                        <span className="library-panel__row-icon" aria-hidden>
                          <Icon strokeWidth={1.75} className="size-4" />
                        </span>
                        <span className="library-panel__row-text">
                          <span className="library-panel__row-title">{tool.title}</span>
                          <span className="library-panel__row-meta">{tool.tag}</span>
                        </span>
                      </Link>
                      {editing ? (
                        <button
                          type="button"
                          className="library-panel__remove"
                          aria-label={`Remove ${tool.title} from favorites`}
                          onClick={() => handleRemoveFavorite(tool.id)}
                        >
                          <Trash2 className="size-3.5" aria-hidden />
                        </button>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )
          ) : projects.length === 0 ? (
            <p className="library-panel__empty">
              No saved projects yet. Save calculator results to a project from any tool.
            </p>
          ) : (
            <ul className="library-panel__list" role="list">
              {projects.map((project) => (
                <li key={project.id} className="library-panel__item">
                  <button
                    type="button"
                    className="library-panel__row"
                    onClick={() => handleOpenProject(project)}
                  >
                    <span className="library-panel__row-icon" aria-hidden>
                      <FolderKanban strokeWidth={1.75} className="size-4" />
                    </span>
                    <span className="library-panel__row-text">
                      <span className="library-panel__row-title">{project.name}</span>
                      <span className="library-panel__row-meta">
                        {project.snapshots.length}{" "}
                        {project.snapshots.length === 1 ? "snapshot" : "snapshots"}
                      </span>
                    </span>
                  </button>
                  {editing ? (
                    <button
                      type="button"
                      className="library-panel__remove"
                      aria-label={`Delete project ${project.name}`}
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <ProjectModal
        open={projectModalOpen}
        project={selectedProject}
        onClose={handleCloseProjectModal}
      />
    </div>
  );
}
