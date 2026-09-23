import type { ReactNode } from "react";

import { CookieConsent } from "@/components/CookieConsent";
import { Footer, Navbar } from "@/components/site/sections";

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}