"use client";

import { useCallback, useEffect, useState } from "react";
import { FolderPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculatorCommandBtn, calculatorCommandInput } from "@/lib/glass-ui";
import {
  addSnapshotToProject,
  createProject,
  listProjects,
  type ProjectSavePayload,
  type WattQuickProject,
} from "@/lib/project-store";
import { cn } from "@/lib/utils";

interface SaveToProjectModalProps {
  open: boolean;
  onClose: () => void;
  payload: ProjectSavePayload;
  onSaved?: (project: WattQuickProject) => void;
}

export function SaveToProjectModal({
  open,
  onClose,
  payload,
  onSaved,
}: SaveToProjectModalProps) {
  const [projects, setProjects] = useState<WattQuickProject[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [newName, setNewName] = useState("");
  const [mode, setMode] = useState<"select" | "create">("select");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const existing = listProjects();
    setProjects(existing);
    setSelectedId(existing[0]?.id ?? "");
    setNewName("");
    setMode(existing.length > 0 ? "select" : "create");
    setError(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      let projectId = selectedId;
      if (mode === "create") {
        const created = createProject(newName);
        projectId = created.id;
      }
      if (!projectId) {
        setError("Select or create a project first.");
        return;
      }
      const updated = addSnapshotToProject(projectId, payload);
      if (!updated) {
        setError("Could not save to project. Try again.");
        return;
      }
      onSaved?.(updated);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save project.");
    } finally {
      setSaving(false);
    }
  }, [mode, newName, onClose, onSaved, payload, selectedId]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-project-title"
      className="fixed inset-0 z-[110] flex items-end justify-center p-0 sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm dark:bg-slate-950/75" />
      <div className="relative z-10 w-full max-w-md rounded-none border border-border/60 bg-background p-5 shadow-xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2
              id="save-project-title"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Save to project
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {payload.calculatorTitle} — {payload.summary}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className={cn(
              "flex-1 rounded-none border px-3 py-2 text-xs font-semibold uppercase tracking-wider",
              mode === "select"
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border/60 text-muted-foreground"
            )}
            onClick={() => setMode("select")}
            disabled={projects.length === 0}
          >
            Existing
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 rounded-none border px-3 py-2 text-xs font-semibold uppercase tracking-wider",
              mode === "create"
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border/60 text-muted-foreground"
            )}
            onClick={() => setMode("create")}
          >
            New project
          </button>
        </div>

        {mode === "select" ? (
          <ul className="mb-4 max-h-40 space-y-1 overflow-y-auto" role="listbox">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedId === project.id}
                  className={cn(
                    "w-full rounded-none border px-3 py-2 text-left text-sm transition-colors",
                    selectedId === project.id
                      ? "border-primary/40 bg-primary/10"
                      : "border-border/60 hover:bg-muted/30"
                  )}
                  onClick={() => setSelectedId(project.id)}
                >
                  <span className="font-medium text-foreground">{project.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {project.snapshots.length} saved calculation
                    {project.snapshots.length === 1 ? "" : "s"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-4">
            <label
              htmlFor="new-project-name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Project name
            </label>
            <Input
              id="new-project-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Aviv home — solar plan"
              className={cn(
                calculatorCommandInput,
                "h-11 rounded-none border-0 px-3 text-sm shadow-none focus-visible:ring-0"
              )}
            />
          </div>
        )}

        {error ? (
          <p className="mb-3 text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              calculatorCommandBtn,
              "h-10 px-4 text-sm font-medium text-muted-foreground"
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving || (mode === "create" && !newName.trim())}
            className={cn(
              calculatorCommandBtn,
              "inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold text-foreground",
              saving && "cursor-wait opacity-80"
            )}
          >
            <FolderPlus className="size-4 text-primary" aria-hidden />
            {saving ? "Saving…" : "Save snapshot"}
          </button>
        </div>
      </div>
    </div>
  );
}
