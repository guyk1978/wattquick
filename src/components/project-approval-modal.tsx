"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { calculatorCommandBtn, calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectApprovalModalProps {
  open: boolean;
  projectName: string;
  onClose: () => void;
  onConfirm: (clientName: string) => void;
}

export function ProjectApprovalModal({
  open,
  projectName,
  onClose,
  onConfirm,
}: ProjectApprovalModalProps) {
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setClientName("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleBackdrop = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = clientName.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    onConfirm(trimmed);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-approval-modal-title"
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      onClick={handleBackdrop}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/85"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-none bg-background shadow-[0_24px_48px_rgb(15_23_42/0.12)]",
          "dark:shadow-[0_32px_64px_rgb(0_0_0/0.55)]"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3 sm:px-5">
          <h2
            id="project-approval-modal-title"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Approve proposal
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              calculatorCommandShareBtn,
              "flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
            )}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-sm text-muted-foreground">
            Confirm approval for{" "}
            <span className="font-medium text-foreground">{projectName}</span>.
            Your technician will be notified.
          </p>

          <label className="block space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Your name
            </span>
            <input
              type="text"
              value={clientName}
              onChange={(event) => {
                setClientName(event.target.value);
                setError(null);
              }}
              autoFocus
              placeholder="Jane Smith"
              className={cn(
                "h-11 w-full rounded-none border border-border/60 bg-background px-3 text-sm text-foreground",
                "placeholder:text-muted-foreground/70",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              )}
            />
          </label>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                calculatorCommandBtn,
                "inline-flex h-11 items-center justify-center px-5 text-sm font-semibold text-foreground"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn(
                calculatorCommandBtn,
                "inline-flex h-11 items-center justify-center border-border bg-[var(--matte-btn)] px-5 text-sm font-semibold text-foreground hover:bg-[var(--matte-btn-hover)]"
              )}
            >
              Approve &amp; notify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
