"use client";

import { useCallback, useEffect } from "react";
import { Share, X } from "lucide-react";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface InstallAppModalProps {
  open: boolean;
  onClose: () => void;
}

export function InstallAppModal({ open, onClose }: InstallAppModalProps) {
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

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-app-modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/85"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-none border border-border bg-card p-5 shadow-[0_24px_48px_rgb(15_23_42/0.12)]",
          "dark:border-white/10 dark:bg-[var(--matte-section)]"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            id="install-app-modal-title"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Install WattQuick
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

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Add WattQuick to your home screen for one-tap access to calculators.
        </p>

        <ol className="mt-4 space-y-3 text-sm text-foreground">
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-none border border-border bg-[var(--matte-hover)] text-xs font-bold">
              1
            </span>
            <span>
              Tap the <Share className="mx-0.5 inline size-3.5 align-text-bottom" />{" "}
              Share button in Safari&apos;s toolbar.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-none border border-border bg-[var(--matte-hover)] text-xs font-bold">
              2
            </span>
            <span>Scroll down and choose &ldquo;Add to Home Screen&rdquo;.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-none border border-border bg-[var(--matte-hover)] text-xs font-bold">
              3
            </span>
            <span>Tap Add — WattQuick will open like an app.</span>
          </li>
        </ol>

        <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <p className="font-semibold uppercase tracking-wide text-foreground/80">
            Android / Chrome
          </p>
          <p>
            Open the browser menu and choose &ldquo;Install app&rdquo; or
            &ldquo;Add to Home screen&rdquo;. If you see an install banner, tap
            Install.
          </p>
        </div>
      </div>
    </div>
  );
}
