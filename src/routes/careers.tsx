import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { Careers, FAQ } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/careers")({
  head: () => siteHead({
    title: "Careers at Market Strategy — Do Consequential Work",
    description: "Join Market Strategy and work alongside senior advisors on the decisions shaping global markets, companies, and communities.",
    path: "/careers",
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <SitePage>
      <Careers />
      <FAQ />
    </SitePage>
  );
}