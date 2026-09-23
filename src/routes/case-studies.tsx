import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { CaseStudies, Testimonials } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/case-studies")({
  head: () => siteHead({
    title: "Case Studies — Market Strategy",
    description: "Selected examples of how Market Strategy helps leaders navigate growth, transformation, investment, and complex strategic decisions.",
    path: "/case-studies",
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <SitePage>
      <CaseStudies />
      <Testimonials />
    </SitePage>
  );
}