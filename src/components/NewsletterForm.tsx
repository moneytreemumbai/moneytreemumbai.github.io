import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot
    if (String(fd.get("company_website") ?? "").trim() !== "") {
      setStatus("success");
      form.reset();
      return;
    }
    const email = String(fd.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setStatus("error");
      return;
    }

    const formspreeId = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID as string | undefined
      ?? (import.meta.env.VITE_FORMSPREE_ID as string | undefined);

    setStatus("submitting");
    setError("");
    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, _subject: "Newsletter signup", source: "footer" }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // fallback: mailto so submission never silently fails
        window.location.href = `mailto:contact@marketstrategy.com?subject=${encodeURIComponent(
          "Newsletter signup",
        )}&body=${encodeURIComponent(`Please add ${email} to the newsletter.`)}`;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="mt-3"
      aria-label="Subscribe to newsletter"
    >
      <div className="flex border-b border-white/20 focus-within:border-gold transition-colors">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          disabled={status === "submitting"}
          className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-white/40 focus:outline-none disabled:opacity-60"
        />
        {/* honeypot */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="text-gold text-xs uppercase tracking-widest px-3 disabled:opacity-60"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </div>
      <div aria-live="polite" className="min-h-[1.25rem] mt-2 text-xs">
        {status === "success" && <span className="text-gold">You're subscribed. Thank you.</span>}
        {status === "error" && <span className="text-red-300">{error}</span>}
      </div>
    </form>
  );
}
