import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectProposalView } from "@/components/project-proposal-view";
import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Project Proposal — WattQuick",
  description:
    "Read-only engineering proposal with rollup metrics and materials estimate.",
  path: "/projects/share",
  noIndex: true,
});

export function generateStaticParams() {
  return [{ uuid: "proposal" }];
}

interface ProjectSharePageProps {
  params: Promise<{ uuid: string }>;
}

export default async function ProjectSharePage({ params }: ProjectSharePageProps) {
  const { uuid } = await params;

  return (
    <PageShell className="max-w-4xl">
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading proposal…</p>
        }
      >
        <ProjectProposalView projectId={uuid} />
      </Suspense>
    </PageShell>
  );
}
