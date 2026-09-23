import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import {
  About,
  Careers,
  CaseStudies,
  Contact,
  FAQ,
  GlobalOffices,
  Hero,
  Industries,
  Insights,
  Leadership,
  Process,
  Services,
  Testimonials,
  WhyUs,
} from "@/components/site/sections";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/")({
  head: () => siteHead({
    title: "Market Strategy — Strategic Consulting and Investment Advisory",
    description: "Market Strategy is a global strategic consulting, investment advisory, and business transformation firm helping enterprises unlock sustainable growth.",
    path: "/",
  }),
  component: MarketStrategyHome,
});

function MarketStrategyHome() {
  return (
    <SitePage>
      <Hero />
      <About />
      <Services />
      <Industries />
      <WhyUs />
      <Process />
      <Insights />
      <CaseStudies />
      <Leadership />
      <Testimonials />
      <Careers />
      <GlobalOffices />
      <FAQ />
      <Contact />
    </SitePage>
  );
}