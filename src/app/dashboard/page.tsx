import { CommandCenter } from "@/components/dashboard/command-center";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "WattQuick Command Center",
  description:
    "Interactive energy flow dashboard—map solar, batteries, grid, and loads to instant calculators. Your profile persists across visits.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <div className="command-center-page relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(34,211,238,0.12),transparent),radial-gradient(ellipse_60%_45%_at_90%_80%,rgba(52,211,153,0.1),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <CommandCenter />
      </div>
    </div>
  );
}
