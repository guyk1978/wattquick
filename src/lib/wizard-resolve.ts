import { getAllBlogPosts } from "@/lib/blog/posts";
import {
  getCalculatorMeta,
  isCalculatorId,
  type CalculatorId,
} from "@/lib/calculators";
import {
  PATH_TITLES,
  WIZARD_PATH_MAP,
  WIZARD_PLANNED_CALCULATORS,
  wizardCatalogKey,
  type ResolvedWizardStep,
  type WizardExperience,
  type WizardGoal,
  type WizardPathResult,
  type WizardStepRef,
} from "@/lib/wizard-paths";

function resolveStepRef(
  ref: WizardStepRef,
  stepNumber: number,
  postsBySlug: Map<string, { title: string; description: string }>
): ResolvedWizardStep | null {
  const id = `${ref.kind}:${ref.slug}`;

  if (ref.kind === "calculator") {
    if (isCalculatorId(ref.slug)) {
      const meta = getCalculatorMeta(ref.slug as CalculatorId);
      return {
        id,
        kind: ref.kind,
        slug: ref.slug,
        title: meta.title,
        description: meta.description,
        href: meta.href,
        stepNumber,
      };
    }

    const planned = WIZARD_PLANNED_CALCULATORS[ref.slug];
    if (planned) {
      return {
        id,
        kind: ref.kind,
        slug: ref.slug,
        title: planned.title,
        description: planned.description,
        href: "",
        stepNumber,
        planned: true,
      };
    }

    return null;
  }

  const post = postsBySlug.get(ref.slug);
  if (!post) return null;

  return {
    id,
    kind: ref.kind,
    slug: ref.slug,
    title: post.title,
    description: post.description,
    href: `/articles/${ref.slug}/`,
    stepNumber,
  };
}

export function getWizardPath(
  goal: WizardGoal,
  experience: WizardExperience
): WizardPathResult {
  const postsBySlug = new Map(
    getAllBlogPosts().map((post) => [
      post.slug,
      { title: post.title, description: post.description },
    ])
  );

  const refs = WIZARD_PATH_MAP[goal][experience];
  const steps = refs
    .map((ref, index) => resolveStepRef(ref, index + 1, postsBySlug))
    .filter((step): step is ResolvedWizardStep => step !== null);

  const copy = PATH_TITLES[goal][experience];

  return {
    goal,
    experience,
    title: copy.title,
    description: copy.description,
    steps,
  };
}

/** Pre-resolved paths for every goal × experience — passed to the client wizard. */
export function buildWizardCatalog(): Record<string, WizardPathResult> {
  const goals: WizardGoal[] = ["solar", "backup", "mobility", "savings"];
  const levels: WizardExperience[] = ["owner", "pro"];
  const catalog: Record<string, WizardPathResult> = {};

  for (const goal of goals) {
    for (const experience of levels) {
      catalog[wizardCatalogKey(goal, experience)] = getWizardPath(
        goal,
        experience
      );
    }
  }

  return catalog;
}
