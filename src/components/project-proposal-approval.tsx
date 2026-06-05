"use client";

import { useCallback, useState } from "react";
import { CheckCircle2, CircleCheck } from "lucide-react";
import { ProjectApprovalModal } from "@/components/project-approval-modal";
import { buildApprovalNotificationUrl } from "@/lib/project-approval";
import {
  appendApprovalToSharePayload,
  readShareHashPayload,
  updateShareUrlHash,
  type ProjectShareApproval,
} from "@/lib/project-share";
import type { WattQuickProject } from "@/lib/project-store";
import { calculatorCommandBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface ProjectProposalApprovalProps {
  project: WattQuickProject;
  initialApproval: ProjectShareApproval | null;
  technicianContact: string | null;
}

export function ProjectProposalApproval({
  project,
  initialApproval,
  technicianContact,
}: ProjectProposalApprovalProps) {
  const [approval, setApproval] = useState<ProjectShareApproval | null>(
    initialApproval
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleConfirm = useCallback(
    (clientName: string) => {
      const encoded = appendApprovalToSharePayload(
        clientName,
        readShareHashPayload()
      );
      if (!encoded) {
        setNotice("Could not save approval. Please refresh and try again.");
        setModalOpen(false);
        return;
      }

      updateShareUrlHash(encoded);

      const nextApproval: ProjectShareApproval = {
        clientName,
        approvedAt: new Date().toISOString(),
      };
      setApproval(nextApproval);
      setModalOpen(false);

      const shareUrl = window.location.href;
      const contact = technicianContact ?? project.technicianContact ?? "";
      const notificationUrl = buildApprovalNotificationUrl(
        contact,
        project.name,
        clientName,
        shareUrl
      );

      if (notificationUrl) {
        window.location.href = notificationUrl;
        setNotice(null);
      } else if (!contact.trim()) {
        setNotice(
          "Your approval is saved. Automatic notification isn't available — please contact your technician directly."
        );
      } else {
        setNotice(
          "Your approval is saved. We couldn't open email or WhatsApp — please contact your technician directly."
        );
      }
    },
    [project.name, project.technicianContact, technicianContact]
  );

  if (approval) {
    return (
      <section
        className="rounded-none border border-emerald-500/40 bg-emerald-500/10 px-4 py-4 sm:px-5"
        aria-live="polite"
      >
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="size-5 shrink-0" aria-hidden />
          Approved by {approval.clientName}
        </p>
        <p className="mt-1 text-xs text-emerald-800/80 dark:text-emerald-200/80">
          {new Date(approval.approvedAt).toLocaleString()}
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-none border border-primary/30 bg-primary/5 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CircleCheck className="size-4 text-primary" aria-hidden />
              Ready to move forward?
            </p>
            <p className="text-sm text-muted-foreground">
              Click to notify your technician that you approve this proposal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={cn(
              calculatorCommandBtn,
              "inline-flex h-11 shrink-0 items-center justify-center border-primary/40 bg-primary/10 px-5 text-sm font-semibold text-primary"
            )}
          >
            Approve Proposal
          </button>
        </div>
        {notice ? (
          <p className="mt-3 text-xs text-muted-foreground" role="status">
            {notice}
          </p>
        ) : null}
      </section>

      <ProjectApprovalModal
        open={modalOpen}
        projectName={project.name}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
