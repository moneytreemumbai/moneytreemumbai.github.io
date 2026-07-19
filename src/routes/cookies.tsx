import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Cookie Policy — Market Strategy" },
      { name: "description", content: "How Market Strategy uses cookies and similar technologies, and how to manage your preferences." },
      { property: "og:title", content: "Cookie Policy — Market Strategy" },
      { property: "og:description", content: "Details about cookies used on marketstrategy.com and your choices." },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
});

function CookiesPage() {
  const reset = () => {
    try {
      localStorage.removeItem("ms_cookie_consent_v1");
      location.reload();
    } catch {
      /* ignore */
    }
  };
  return (
    <main id="main-content" className="bg-navy-deep text-white min-h-screen">
      <div className="container-x max-w-3xl py-24 md:py-32">
        <Link to="/" className="text-xs uppercase tracking-widest text-gold">← Back to home</Link>
        <h1 className="font-display text-4xl md:text-5xl mt-6">Cookie Policy</h1>
        <p className="mt-4 text-white/60 text-sm">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-10 space-y-6 text-white/80 leading-relaxed">
          <p>We use a small number of cookies and similar technologies to operate this site, remember your preferences, and — with your consent — to measure how visitors interact with our content.</p>

          <h2 className="font-display text-2xl text-white">Categories</h2>
          <ul className="space-y-3 list-disc pl-6">
            <li><strong className="text-white">Strictly necessary</strong> — required for the site to function. Always on.</li>
            <li><strong className="text-white">Analytics</strong> — help us understand aggregate usage. Off by default; enabled only with your consent.</li>
          </ul>

          <h2 className="font-display text-2xl text-white">Managing your preferences</h2>
          <p>You can change or withdraw consent at any time by clicking the button below. You can also block or delete cookies via your browser settings.</p>

          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center bg-gold px-5 text-sm font-medium text-navy-deep hover:bg-gold-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            Review cookie preferences
          </button>
        </div>
      </div>
    </main>
  );
}
