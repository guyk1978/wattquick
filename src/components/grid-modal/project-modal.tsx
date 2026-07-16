"use client";

import { useEffect, useId } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ProjectDetail } from "@/components/project-detail";
import type { WattQuickProject } from "@/lib/project-store";
import { cn } from "@/lib/utils";

type ProjectModalProps = {
  open: boolean;
  project: WattQuickProject | null;
  onClose: () => void;
  className?: string;
};

/** Full-viewport project workspace overlay — keeps users on the current grid/tool page. */
export function ProjectModal({
  open,
  project,
  onClose,
  className,
}: ProjectModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  if (!open || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "project-modal tool-workspace-modal tool-workspace-modal--open",
        className
      )}
    >
      <button
        type="button"
        className="tool-workspace-modal__backdrop"
        aria-label="Close project"
        onClick={onClose}
      />

      <motion.div
        className="tool-workspace-modal__panel project-modal__panel"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="tool-workspace-modal__header project-modal__header">
          <div className="project-modal__title-block">
            <p className="tool-workspace-modal__eyebrow">Saved project</p>
            <h2 id={titleId} className="tool-workspace-modal__title">
              {project.name}
            </h2>
          </div>
          <button
            type="button"
            className="tool-workspace-modal__close"
            onClick={onClose}
            aria-label="Close project"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="project-modal__body">
          <ProjectDetail projectId={project.id} variant="modal" />
        </div>
      </motion.div>
    </div>
  );
}
