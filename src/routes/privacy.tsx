import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Market Strategy" },
      { name: "description", content: "How Market Strategy collects, uses, and protects personal information." },
      { property: "og:title", content: "Privacy Policy — Market Strategy" },
      { property: "og:description", content: "Our commitment to privacy and data protection." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <main id="main-content" className="bg-navy-deep text-white min-h-screen">
      <div className="container-x max-w-3xl py-24 md:py-32">
        <Link to="/" className="text-xs uppercase tracking-widest text-gold">← Back to home</Link>
        <h1 className="font-display text-4xl md:text-5xl mt-6">Privacy Policy</h1>
        <p className="mt-4 text-white/60 text-sm">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-invert mt-10 space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-white">1. Information we collect</h2>
            <p>We collect information you provide directly to us — such as your name, business email, company, role, and message — when you request a briefing, subscribe to the newsletter, or otherwise contact us. We also collect limited technical data automatically (IP address, browser, device, referring URL, and interactions with the site).</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">2. How we use information</h2>
            <p>We use your information to respond to inquiries, deliver requested materials, operate and secure our website, comply with legal obligations, and — with your consent — to send you occasional insights and updates.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">3. Legal bases</h2>
            <p>Where GDPR applies, we process personal data on the bases of legitimate interest, consent, contractual necessity, and legal obligation.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">4. Sharing</h2>
            <p>We do not sell personal information. We share limited information with vetted service providers (form processing, email delivery, hosting, analytics) under written agreements that require confidentiality and appropriate security.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">5. Retention</h2>
            <p>We retain personal information only as long as necessary for the purposes described, or as required by law.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">6. Your rights</h2>
            <p>Subject to applicable law, you may request access, correction, deletion, portability, or restriction of your personal information. Contact us at <a className="text-gold underline underline-offset-4" href="mailto:privacy@marketstrategy.com">privacy@marketstrategy.com</a>.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">7. Security</h2>
            <p>We use industry-standard technical and organizational measures to protect personal data in transit and at rest. No system is perfectly secure; we work continuously to improve our safeguards.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white">8. Contact</h2>
            <p>Market Strategy Advisory LLC · One Financial Plaza, New York, NY 10005 · <a className="text-gold underline underline-offset-4" href="mailto:privacy@marketstrategy.com">privacy@marketstrategy.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
