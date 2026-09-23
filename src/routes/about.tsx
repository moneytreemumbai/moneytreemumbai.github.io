import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { About, GlobalOffices, Leadership, Testimonials } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/about")({
  head: () => siteHead({
    title: "About Market Strategy — Global Strategic Advisory",
    description: "Meet Market Strategy, an independent global advisory firm helping boards and executive teams make consequential decisions.",
    path: "/about",
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SitePage>
      <About />
      <Leadership />
      <Testimonials />
      <GlobalOffices />
    </SitePage>
  );
}