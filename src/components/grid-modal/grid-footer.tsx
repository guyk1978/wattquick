"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLegalModal } from "@/components/grid-modal/legal-modal-provider";
import type { LegalDocId } from "@/lib/legal-types";
import { cn } from "@/lib/utils";

const FeedbackModal = dynamic(
  () =>
    import("@/components/grid-modal/feedback-modal").then((mod) => ({
      default: mod.FeedbackModal,
    })),
  { ssr: false }
);

const LEGAL_TRIGGERS: { id: LegalDocId; label: string }[] = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
];

type GridFooterProps = {
  className?: string;
};

/** Minimal Industrial Matte footer for Grid-to-Modal pages. */
export function GridFooter({ className }: GridFooterProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { openLegal } = useLegalModal();

  return (
    <>
      <footer className={cn("grid-footer", className)}>
        <div className="grid-footer__inner">
          <p className="grid-footer__copy">© 2026 WattQuick</p>
          <nav className="grid-footer__nav" aria-label="Legal">
            <ul className="grid-footer__list">
              {LEGAL_TRIGGERS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="grid-footer__link grid-footer__link--button"
                    onClick={() => openLegal(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="grid-footer__link grid-footer__link--button"
                  onClick={() => setFeedbackOpen(true)}
                >
                  Feedback
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </footer>

      {feedbackOpen ? (
        <FeedbackModal
          open={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
        />
      ) : null}
    </>
  );
}
