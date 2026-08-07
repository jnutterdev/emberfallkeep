import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [mdx()],
  output: 'static',
  adapter: cloudflare(),
  // We roll our own cookie-based auth session (src/lib/session.ts) and never
  // touch Astro's built-in Astro.session API. Without an explicit driver here,
  // the Cloudflare adapter auto-wires session storage to a "SESSION" KV
  // binding we don't declare in wrangler.jsonc — this no-op driver avoids
  // that unused dependency entirely.
  session: {
    driver: 'memory',
  },
});