"use client";

import { useCallback, useState } from "react";
import { Check, Link2 } from "lucide-react";
import {
  buildProjectShareUrl,
  cacheSharePayload,
} from "@/lib/project-share";
import type { WattQuickProject } from "@/lib/project-store";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectShareLinkButtonProps {
  project: WattQuickProject;
  className?: string;
}

export function ProjectShareLinkButton({
  project,
  className,
}: ProjectShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = useCallback(async () => {
    setError(null);
    try {
      cacheSharePayload(project);
      const url = buildProjectShareUrl(project);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Could not copy link. Try again or export PDF instead.");
    }
  }, [project]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <button
        type="button"
        onClick={() => void handleCopy()}
        disabled={project.snapshots.length === 0}
        className={cn(
          calculatorCommandBtn,
          "inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold text-foreground",
          copied && "border-primary/40"
        )}
      >
        {copied ? (
          <Check className="size-4 text-primary" aria-hidden />
        ) : (
          <Link2 className="size-4 text-primary" aria-hidden />
        )}
        {copied ? "Link copied" : "Copy share link"}
      </button>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
