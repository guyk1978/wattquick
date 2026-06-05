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
    <div className="command-center-page relative min-h-[calc(100vh-3.5rem)] bg-transparent">
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <CommandCenter />
      </div>
    </div>
  );
}
