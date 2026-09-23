import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { Contact, GlobalOffices } from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/contact")({
  head: () => siteHead({
    title: "Contact Market Strategy — Start a Conversation",
    description: "Contact Market Strategy to discuss a strategic decision, investment opportunity, transformation challenge, or advisory need.",
    path: "/contact",
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SitePage>
      <Contact />
      <GlobalOffices />
    </SitePage>
  );
}