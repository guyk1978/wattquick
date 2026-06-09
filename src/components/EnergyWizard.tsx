"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  ChevronRight,
  Compass,
  RotateCcw,
} from "lucide-react";
import {
  isWizardExperience,
  isWizardGoal,
  wizardCatalogKey,
  WIZARD_EXPERIENCE,
  WIZARD_GOALS,
  WIZARD_STORAGE_KEY,
  type WizardExperience,
  type WizardGoal,
  type WizardPathResult,
  type WizardProgressState,
} from "@/lib/wizard-paths";
import { WizardLegend } from "@/components/wizard-legend";
import { cn } from "@/lib/utils";

interface EnergyWizardProps {
  catalog: Record<string, WizardPathResult>;
}

type WizardPhase = "goal" | "experience" | "path";

function loadProgress(): WizardProgressState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WizardProgressState;
    if (
      !isWizardGoal(parsed.goal) ||
      !isWizardExperience(parsed.experience) ||
      !Array.isArray(parsed.completedStepIds)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveProgress(state: WizardProgressState): void {
  window.localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(state));
}

function clearProgress(): void {
  window.localStorage.removeItem(WIZARD_STORAGE_KEY);
}

export function EnergyWizard({ catalog }: EnergyWizardProps) {
  const [phase, setPhase] = useState<WizardPhase>("goal");
  const [goal, setGoal] = useState<WizardGoal | null>(null);
  const [experience, setExperience] = useState<WizardExperience | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setGoal(saved.goal);
      setExperience(saved.experience);
      setCompletedStepIds(saved.completedStepIds);
      setPhase("path");
    }
    setHydrated(true);
  }, []);

  const path = useMemo(() => {
    if (!goal || !experience) return null;
    return catalog[wizardCatalogKey(goal, experience)] ?? null;
  }, [catalog, goal, experience]);

  const persistProgress = useCallback(
    (
      nextGoal: WizardGoal,
      nextExperience: WizardExperience,
      completed: string[]
    ) => {
      saveProgress({
        goal: nextGoal,
        experience: nextExperience,
        completedStepIds: completed,
        updatedAt: new Date().toISOString(),
      });
    },
    []
  );

  const handleGoalSelect = (nextGoal: WizardGoal) => {
    setGoal(nextGoal);
    setExperience(null);
    setCompletedStepIds([]);
    setPhase("experience");
  };

  const handleExperienceSelect = (nextExperience: WizardExperience) => {
    if (!goal) return;
    setExperience(nextExperience);
    setCompletedStepIds([]);
    persistProgress(goal, nextExperience, []);
    setPhase("path");
  };

  const toggleStepComplete = (stepId: string) => {
    if (!goal || !experience) return;
    setCompletedStepIds((prev) => {
      const next = prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId];
      persistProgress(goal, experience, next);
      return next;
    });
  };

  const handleRestart = () => {
    clearProgress();
    setGoal(null);
    setExperience(null);
    setCompletedStepIds([]);
    setPhase("goal");
  };

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground">Loading your planner…</p>
    );
  }

  const completedCount = path
    ? path.steps.filter((step) => completedStepIds.includes(step.id)).length
    : 0;
  const progressPercent = path
    ? Math.round((completedCount / path.steps.length) * 100)
    : 0;

  return (
    <div className="energy-wizard space-y-8">
      <div className="energy-wizard__intro rounded-none border border-border/60 bg-muted/15 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Compass
            className="mt-0.5 size-5 shrink-0 text-primary"
            aria-hidden
          />
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              WattQuick Wizard
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Answer two questions and get a step-by-step planning path—calculators
              and guides in the order pros actually use them.
            </p>
          </div>
        </div>
      </div>

      <WizardLegend />

      {phase === "goal" ? (
        <section aria-labelledby="wizard-goal-heading">
          <h2
            id="wizard-goal-heading"
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Step 1 — What is your goal?
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {WIZARD_GOALS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="energy-wizard__choice group w-full rounded-none border border-border/60 bg-background p-4 text-left"
                  onClick={() => handleGoalSelect(item.id)}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-foreground">
                      {item.label}
                    </span>
                    <ChevronRight
                      className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {phase === "experience" && goal ? (
        <section aria-labelledby="wizard-experience-heading">
          <button
            type="button"
            className="mb-4 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => setPhase("goal")}
          >
            ← Change goal
          </button>
          <h2
            id="wizard-experience-heading"
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Step 2 — Your experience level
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {WIZARD_EXPERIENCE.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="energy-wizard__choice group w-full rounded-none border border-border/60 bg-background p-4 text-left"
                  onClick={() => handleExperienceSelect(item.id)}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-foreground">
                      {item.label}
                    </span>
                    <ChevronRight
                      className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {phase === "path" && path && goal && experience ? (
        <section aria-labelledby="wizard-path-heading" className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <button
                type="button"
                className="mb-2 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() => setPhase("experience")}
              >
                ← Change experience level
              </button>
              <h2
                id="wizard-path-heading"
                className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                {path.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {path.description}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-none border border-border/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={handleRestart}
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Start over
            </button>
          </div>

          <div className="energy-wizard__progress rounded-none border border-border/60 p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>
                {completedCount} of {path.steps.length} steps complete
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div
              className="energy-wizard__progress-track h-1.5 w-full bg-muted/80"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Planning path progress"
            >
              <div
                className="energy-wizard__progress-fill h-full bg-primary transition-[width] duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <ol
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Path steps overview"
            >
              {path.steps.map((step) => {
                const done = completedStepIds.includes(step.id);
                return (
                  <li key={step.id}>
                    <span
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-none border text-xs font-semibold",
                        done
                          ? "border-[var(--matte-selected-border)] bg-[var(--matte-selected)] text-foreground"
                          : "border-border/60 text-muted-foreground"
                      )}
                      aria-label={`Step ${step.stepNumber}${done ? " complete" : ""}`}
                    >
                      {done ? (
                        <Check className="size-3.5" aria-hidden />
                      ) : (
                        step.stepNumber
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <ol className="energy-wizard__steps list-none space-y-3" role="list">
            {path.steps.map((step) => {
              const done = completedStepIds.includes(step.id);
              const Icon = step.kind === "calculator" ? Calculator : BookOpen;

              return (
                <li key={step.id}>
                  <article
                    className={cn(
                      "energy-wizard__step rounded-none border border-border/60 p-4 sm:p-5",
                      step.kind === "calculator" &&
                        "energy-wizard__step--calculator",
                      step.kind === "article" && "energy-wizard__step--article",
                      done && "energy-wizard__step--complete"
                    )}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex size-6 items-center justify-center rounded-none border border-border/60 text-[0.6875rem] font-bold text-muted-foreground">
                            {step.stepNumber}
                          </span>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-none border px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider",
                              step.kind === "calculator"
                                ? "energy-wizard__badge--tool border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100"
                                : "energy-wizard__badge--guide border-violet-500/30 bg-violet-500/10 text-violet-950 dark:text-violet-100"
                            )}
                          >
                            <Icon className="size-3.5" aria-hidden />
                            {step.kind === "calculator" ? "Tool" : "Guide"}
                          </span>
                          {step.planned ? (
                            <span className="rounded-none border border-border/60 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                              Soon
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                        {step.planned ? (
                          <p className="mt-3 text-sm font-medium text-muted-foreground">
                            Coming soon — reserved in your Pro backup path
                          </p>
                        ) : (
                          <Link
                            href={step.href}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                          >
                            Open {step.kind === "calculator" ? "tool" : "article"}
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        )}
                      </div>
                      <button
                        type="button"
                        className={cn(
                          "shrink-0 rounded-none border px-3 py-2 text-xs font-semibold transition-colors",
                          done
                            ? "energy-wizard__choice--selected border text-foreground"
                            : "border-border/60 text-foreground hover:bg-[var(--matte-hover)] hover:border-[var(--matte-hover-border)]"
                        )}
                        onClick={() => toggleStepComplete(step.id)}
                        aria-pressed={done}
                      >
                        {done ? "Completed" : "Mark complete"}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
