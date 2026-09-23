import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { FAQ, Insights } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/insights")({
  head: () => siteHead({
    title: "Insights and Research — Market Strategy",
    description: "Read Market Strategy's research, briefings, and long-form thinking on strategy, capital, transformation, and markets.",
    path: "/insights",
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <SitePage>
      <Insights />
      <FAQ />
    </SitePage>
  );
}