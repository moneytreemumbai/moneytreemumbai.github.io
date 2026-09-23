import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { Industries, WhyUs } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/industries")({
  head: () => siteHead({
    title: "Industries We Advise — Market Strategy",
    description: "Market Strategy brings sector fluency and senior operating experience to clients across the global economy.",
    path: "/industries",
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <SitePage>
      <Industries />
      <WhyUs />
    </SitePage>
  );
}