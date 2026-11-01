// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

// Netlify sets NETLIFY=true in its build environment. Only then do we swap Lovable's
// built-in Nitro deploy step for the official Netlify adapter, so Lovable previews and
// Lovable publishing keep their existing (Cloudflare/Nitro) behaviour untouched.
const isNetlifyBuild = process.env.NETLIFY === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite (Lovable) and @netlify/vite-plugin-tanstack-start (Netlify) both build from this.
    server: { entry: "server" },
  },
  // Two deploy adapters must never run together: Nitro would rewrite the output layout
  // that the Netlify adapter expects (dist/client + .netlify/v1/functions).
  ...(isNetlifyBuild ? { nitro: false as const, plugins: [netlify()] } : {}),
});
