"use client";

import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FEEDBACK_TOPICS = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "general", label: "General" },
] as const;

type FeedbackTopic = (typeof FEEDBACK_TOPICS)[number]["value"];

type FeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

/** Minimal Industrial Matte feedback dialog for Grid-to-Modal pages. */
export function FeedbackModal({ open, onClose, className }: FeedbackModalProps) {
  const titleId = useId();
  const topicId = useId();
  const messageId = useId();
  const [topic, setTopic] = useState<FeedbackTopic>("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = useCallback(() => {
    setTopic("general");
    setMessage("");
    setSubmitted(false);
  }, []);

  const close = useCallback(() => {
    onClose();
    // Reset after close animation frame so success state does not flash on reopen
    window.setTimeout(reset, 200);
  }, [onClose, reset]);

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  if (!open) return null;

  const canSubmit = message.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "tool-workspace-modal tool-workspace-modal--open feedback-modal",
        className
      )}
    >
      <button
        type="button"
        className="tool-workspace-modal__backdrop"
        aria-label="Close feedback"
        onClick={close}
      />

      <motion.div
        className="tool-workspace-modal__panel feedback-modal__panel"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <header className="tool-workspace-modal__header">
          <div className="min-w-0">
            <p className="tool-workspace-modal__eyebrow">Contact</p>
            <h2 id={titleId} className="tool-workspace-modal__title">
              Feedback
            </h2>
          </div>
          <button
            type="button"
            className="tool-workspace-modal__close"
            onClick={close}
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="tool-workspace-modal__body feedback-modal__body">
          {submitted ? (
            <div className="feedback-modal__success" role="status">
              <p className="feedback-modal__success-text">
                Thank you for your feedback!
              </p>
              <button
                type="button"
                className="feedback-modal__button"
                onClick={close}
              >
                Close
              </button>
            </div>
          ) : (
            <form className="feedback-modal__form" onSubmit={handleSubmit}>
              <div className="feedback-modal__field">
                <label htmlFor={topicId} className="feedback-modal__label">
                  Topic
                </label>
                <select
                  id={topicId}
                  className="feedback-modal__select"
                  value={topic}
                  onChange={(event) =>
                    setTopic(event.target.value as FeedbackTopic)
                  }
                >
                  {FEEDBACK_TOPICS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="feedback-modal__field feedback-modal__field--grow">
                <label htmlFor={messageId} className="feedback-modal__label">
                  Message
                </label>
                <textarea
                  id={messageId}
                  className="feedback-modal__textarea"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us what you think…"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="feedback-modal__button"
                disabled={!canSubmit}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
