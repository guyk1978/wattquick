"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import {
  updateProjectTechnicianContact,
  type WattQuickProject,
} from "@/lib/project-store";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectTechnicianContactFieldProps {
  project: WattQuickProject;
  onUpdated: (project: WattQuickProject) => void;
  className?: string;
}

export function ProjectTechnicianContactField({
  project,
  onUpdated,
  className,
}: ProjectTechnicianContactFieldProps) {
  const [value, setValue] = useState(project.technicianContact ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(project.technicianContact ?? "");
  }, [project.technicianContact, project.id]);

  const handleSave = useCallback(() => {
    const updated = updateProjectTechnicianContact(project.id, value);
    if (updated) {
      onUpdated(updated);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    }
  }, [onUpdated, project.id, value]);

  const missingContact = !project.technicianContact?.trim();

  return (
    <section
      className={cn(
        "rounded-none border border-border/60 bg-muted/10 p-4 sm:p-5",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-none border border-border/60 bg-background/60 text-primary">
          <Mail className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Client approval contact
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Email or WhatsApp number so clients can notify you when they approve
              this proposal.
            </p>
          </div>

          {missingContact ? (
            <p className="flex items-start gap-2 rounded-none border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                Add your email or phone before sharing — clients won&apos;t be able
                to notify you on approval until this is set.
              </span>
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className="min-w-0 flex-1 space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Phone className="size-3" aria-hidden />
                Email or WhatsApp
              </span>
              <input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="you@company.com or +1 555 123 4567"
                className={cn(
                  "h-11 w-full rounded-none border border-border/60 bg-background px-3 text-sm text-foreground",
                  "placeholder:text-muted-foreground/70",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                )}
              />
            </label>
            <button
              type="button"
              onClick={handleSave}
              className={cn(
                calculatorCommandBtn,
                "inline-flex h-11 shrink-0 items-center justify-center px-5 text-sm font-semibold text-foreground"
              )}
            >
              {saved ? "Saved" : "Save contact"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
