import { CommandCenter } from "@/components/dashboard/command-center";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "WattQuick Command Center",
  description:
    "Interactive energy flow dashboard—map solar, batteries, grid, and loads to instant calculators. Your profile persists across visits.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return <CommandCenter variant="blueprint" />;
}
