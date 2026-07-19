import { useEffect, useState } from "react";

const STORAGE_KEY = "ms_cookie_consent_v1";

type Consent = { necessary: true; analytics: boolean; ts: number };

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("ms:consent", { detail: c }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);
    else setAnalytics(existing.analytics);
  }, []);

  if (!visible) return null;

  const persist = (analyticsChoice: boolean) => {
    writeConsent({ necessary: true, analytics: analyticsChoice, ts: Date.now() });
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-4xl border border-white/15 bg-navy-deep/95 text-white backdrop-blur-md shadow-2xl">
        <div className="p-5 sm:p-6">
          <h2 className="font-display text-lg">Your privacy matters</h2>
          <p className="mt-2 text-sm text-white/70">
            We use strictly necessary cookies to run this site. With your consent, we also use analytics cookies to
            understand how visitors engage with our content so we can improve it. See our{" "}
            <a href="/privacy" className="text-gold underline underline-offset-4">Privacy Policy</a> and{" "}
            <a href="/cookies" className="text-gold underline underline-offset-4">Cookie Policy</a>.
          </p>

          {showPrefs && (
            <div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm">
              <label className="flex items-start gap-3 opacity-70">
                <input type="checkbox" checked readOnly className="mt-1 accent-gold" />
                <span>
                  <span className="block font-medium">Strictly necessary</span>
                  <span className="text-white/60">Required for security, session, and preferences. Always on.</span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 accent-gold"
                />
                <span>
                  <span className="block font-medium">Analytics</span>
                  <span className="text-white/60">Anonymous usage metrics to improve the experience.</span>
                </span>
              </label>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => persist(true)}
              className="inline-flex min-h-11 items-center justify-center bg-gold px-5 text-sm font-medium text-navy-deep hover:bg-gold-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              Accept all
            </button>
            <button
              onClick={() => persist(false)}
              className="inline-flex min-h-11 items-center justify-center border border-white/25 px-5 text-sm text-white hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              Reject non-essential
            </button>
            {showPrefs ? (
              <button
                onClick={() => persist(analytics)}
                className="inline-flex min-h-11 items-center justify-center border border-gold/60 px-5 text-sm text-gold hover:bg-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                Save preferences
              </button>
            ) : (
              <button
                onClick={() => setShowPrefs(true)}
                className="inline-flex min-h-11 items-center justify-center px-2 text-sm text-white/70 underline underline-offset-4 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                Preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
