import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

// Must be set before the router renders: it stops the root layout from rendering
// <html>/<body> inside #root, which freezes the page on the first click.
(window as { __MS_STATIC_SPA__?: boolean }).__MS_STATIC_SPA__ = true;

const router = getRouter();

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
