import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages project sites are served from /<repo>/. The workflow injects
// VITE_BASE_PATH at build time. Locally and on Lovable it defaults to "/".
const basePath = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  vite: {
    base: basePath,
    build: {
      outDir: "dist",
      ssr: false,
    },
  },
});
