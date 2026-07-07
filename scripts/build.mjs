import { spawnSync } from "node:child_process";

const command = process.env.BUILD_TARGET === "github-pages"
  ? ["vite", "build", "--config", "vite.github-pages.config.ts"]
  : ["vite", "build"];

const result = spawnSync(command[0], command.slice(1), {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);