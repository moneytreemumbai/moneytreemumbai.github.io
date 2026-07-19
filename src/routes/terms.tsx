import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Use — Market Strategy" },
      { name: "description", content: "Terms that govern your use of the Market Strategy website." },
      { property: "og:title", content: "Terms of Use — Market Strategy" },
      { property: "og:description", content: "Terms governing use of marketstrategy.com." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <main id="main-content" className="bg-navy-deep text-white min-h-screen">
      <div className="container-x max-w-3xl py-24 md:py-32">
        <Link to="/" className="text-xs uppercase tracking-widest text-gold">← Back to home</Link>
        <h1 className="font-display text-4xl md:text-5xl mt-6">Terms of Use</h1>
        <p className="mt-4 text-white/60 text-sm">Last updated: {new Date().getFullYear()}</p>
        <div className="mt-10 space-y-6 text-white/80 leading-relaxed">
          <p>These terms govern your access to and use of the Market Strategy website. By using the site, you agree to these terms.</p>
          <h2 className="font-display text-2xl text-white">Informational content</h2>
          <p>Content on this site is for general informational purposes only and does not constitute investment, legal, tax, or accounting advice, and does not create an advisory relationship.</p>
          <h2 className="font-display text-2xl text-white">Intellectual property</h2>
          <p>All content, marks, and materials are owned by Market Strategy Advisory LLC or its licensors and are protected by applicable laws.</p>
          <h2 className="font-display text-2xl text-white">Disclaimers</h2>
          <p>The site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Market Strategy disclaims all liability arising from your use of the site.</p>
          <h2 className="font-display text-2xl text-white">Governing law</h2>
          <p>These terms are governed by the laws of the State of New York, USA, without regard to conflict-of-laws principles.</p>
        </div>
      </div>
    </main>
  );
}
