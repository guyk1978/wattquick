"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { SaveToProjectModal } from "@/components/save-to-project-modal";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import type { ProjectSavePayload, WattQuickProject } from "@/lib/project-store";
import { cn } from "@/lib/utils";

interface SaveToProjectButtonProps {
  payload: ProjectSavePayload;
  onSaved?: (project: WattQuickProject) => void;
  className?: string;
  compact?: boolean;
}

export function SaveToProjectButton({
  payload,
  onSaved,
  className,
  compact = false,
}: SaveToProjectButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          calculatorCommandBtn,
          "inline-flex items-center gap-2 text-sm font-semibold text-foreground",
          compact ? "h-9 px-3 text-xs" : "h-10 px-4",
          className
        )}
      >
        <FolderPlus className="size-3.5 text-status-success" aria-hidden />
        Save to project
      </button>
      <SaveToProjectModal
        open={open}
        onClose={() => setOpen(false)}
        payload={payload}
        onSaved={onSaved}
      />
    </>
  );
}
