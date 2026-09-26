import { createFileRoute } from "@tanstack/react-router";

import { SitePage } from "@/components/site/PageChrome";
import { siteHead } from "@/components/site/routeMeta";

export const Route = createFileRoute("/support")({
  head: () =>
    siteHead({
      title: "Customer Support Assistant — Market Strategy",
      description:
        "Ask Market Strategy's AI-powered customer support assistant about our services, industries, process, and next steps.",
      path: "/support",
    }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <SitePage>
      <section className="bg-navy-deep px-6 py-28 text-primary-foreground sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">Customer support</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-7xl">
            Clarity, whenever you need it.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-primary-foreground/70 sm:text-lg">
            Ask Meridian about Market Strategy’s services, industries, process, and how to begin a
            conversation with our advisory team.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              className="inline-flex h-11 items-center justify-center bg-gold px-6 text-sm font-medium text-navy-deep transition-colors hover:bg-gold-soft"
              href="#support-assistant"
            >
              Open the assistant
            </a>
            <a
              className="text-sm text-primary-foreground/70 underline-offset-4 hover:text-gold hover:underline"
              href="/contact"
            >
              Speak with our team
            </a>
          </div>
        </div>
      </section>
      <section className="container-x py-20" id="support-assistant">
        <div className="mx-auto max-w-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <p className="eyebrow">Meridian</p>
          <h2 className="mt-3 text-4xl">How can we help?</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Use the support button in the lower corner to ask a question. Voice input and spoken
            answers are available when your browser supports them.
          </p>
        </div>
      </section>
    </SitePage>
  );
}
