import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages project sites are served from /<repo>/. The workflow injects
// VITE_BASE_PATH at build time. Locally and on Lovable it defaults to "/".
const basePath = process.env.VITE_BASE_PATH || "/";

// BUILD_TARGET=github-pages switches Nitro to the static preset and
// prerenders the app to plain HTML/JS/CSS suitable for GitHub Pages.
// Any other value keeps the default Cloudflare Worker build used by Lovable.
const isGithubPages = process.env.BUILD_TARGET === "github-pages";

export default defineConfig({
  vite: {
    base: basePath,
    build: {
      outDir: "dist",
      ssr: false,
    },
  },
  nitro: isGithubPages
    ? ({
        preset: "static",
        prerender: {
          routes: ["/"],
          crawlLinks: true,
          failOnError: false,
        },
      } as never)
    : undefined,
});
