/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="../worker-configuration.d.ts" />

import type { SessionPayload } from './lib/session';

declare global {
  // `wrangler types` only generates Env fields for bindings declared in
  // wrangler.jsonc (d1_databases, vars). Secrets set only via
  // `wrangler secret put` aren't picked up automatically — merge them in here.
  interface Env {
    DISCORD_CLIENT_SECRET: string;
    SESSION_SECRET: string;
  }
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare global {
  namespace App {
    interface Locals extends Runtime {
      player: SessionPayload | null;
    }
  }
}
