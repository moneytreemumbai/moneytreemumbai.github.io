import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { Process, Services, WhyUs } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/services")({
  head: () => siteHead({
    title: "Strategic Consulting Services — Market Strategy",
    description: "Explore Market Strategy's integrated services across corporate strategy, investment advisory, growth, transformation, and M&A.",
    path: "/services",
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SitePage>
      <Services />
      <Process />
      <WhyUs />
    </SitePage>
  );
}