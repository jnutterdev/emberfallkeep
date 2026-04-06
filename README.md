# Emberfall Keep

> _A campaign management site for Dungeons & Dragons — built for the fellowship, by the fellowship._

Emberfall Keep is a self-hosted web platform for tracking D&D campaigns, characters, maps, lore, and session logs. It's designed to feel like the world it documents: dark, dense with history, and built to last.

---

## Tech Stack

| Layer     | Tool                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| Framework | [Astro 5](https://astro.build) — static output                                |
| CMS       | [TinaCMS](https://tina.io) — git-backed, browser-based editing                |
| CI/CD     | GitHub Actions                                                                |
| Hosting   | Self-hosted Apache server                                                     |
| Icons     | [Font Awesome 6.5](https://fontawesome.com) (free tier)                       |
| Fonts     | [Bunny Fonts](https://fonts.bunny.net) — privacy-friendly Google Fonts mirror |
| Content   | Markdown + JSON, stored in git                                                |

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- A server with SSH access for deployment
- A GitHub account (for Actions CI/CD)
- A [TinaCMS Cloud](https://tina.io) account (for the production admin panel)

### Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/emberfall-keep.git
cd emberfall-keep

# Install dependencies
npm install

# Start Astro + TinaCMS together
npm run dev
```

The site will be available at `http://localhost:4321`.
The TinaCMS admin panel will be available at `http://localhost:4321/admin/index.html`.

Content is stored as Markdown and JSON files in `src/content/` and committed to git — no separate database required.

### Available Scripts

| Command           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start TinaCMS dev server + Astro dev server        |
| `npm run build`   | Build TinaCMS admin + Astro static site to `dist/` |
| `npm run preview` | Preview the production build locally               |
| `npm run astro`   | Run Astro CLI directly                             |

---

## Project Structure

```
emberfall-keep/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deploy pipeline
├── public/
│   ├── .htaccess                   # Apache config — clean URLs, caching, security headers
│   ├── favicon.svg
│   ├── hero-image.jpg
│   └── uploads/                    # TinaCMS media uploads
├── src/
│   ├── content/
│   │   ├── config.ts               # Astro content collection schemas (Zod)
│   │   ├── campaigns/              # One .md per campaign
│   │   ├── characters/             # One .md per character
│   │   ├── sessions/               # One .md per session log
│   │   ├── npcs/                   # NPC entries
│   │   ├── factions/               # Faction entries
│   │   ├── items/                  # Items & artifacts
│   │   ├── maps/                   # Map metadata + pin data (.json)
│   │   └── gamemasters/            # Gamemaster profiles
│   ├── layouts/
│   │   └── Base.astro              # Root HTML shell (nav, fonts, footer)
│   ├── pages/
│   │   ├── index.astro             # The Great Hall — homepage
│   │   ├── 404.astro               # Not found page
│   │   ├── about.astro             # About Emberfall Keep
│   │   ├── admin/
│   │   │   └── [...all].astro      # TinaCMS admin catch-all
│   │   ├── campaigns/
│   │   │   └── [slug].astro        # Campaign detail — tabs for overview, party, chronicles, compendium, maps
│   │   ├── characters/
│   │   │   ├── index.astro         # Fellowship roster
│   │   │   └── [slug].astro        # Character sheet — stats, backstory tabs
│   │   ├── gamemasters/
│   │   │   └── index.astro         # Gamemaster profiles
│   │   ├── sessions/
│   │   │   ├── index.astro         # Chronicles — full session list with sidebar
│   │   │   └── [slug].astro        # Individual session recap
│   │   ├── lore/
│   │   │   └── index.astro         # Compendium — NPCs, factions, items tabs
│   │   └── maps/
│   │       └── index.astro         # Map gallery — world, region, dungeon tiers
│   ├── components/
│   │   ├── Nav.astro               # Fixed top nav with active route detection
│   │   ├── Footer.astro            # Site footer
│   │   ├── PageHeader.astro        # Reusable inner-page header
│   │   ├── CampaignCard.astro      # Campaign listing card
│   │   ├── CharacterCard.astro     # Character portrait card
│   │   └── SessionEntry.astro      # Session list row
│   └── styles/
│       ├── tokens.css              # Design tokens — colors, spacing, layout vars
│       └── global.css              # Reset, base styles, shared utilities
├── tina/
│   └── config.ts                   # TinaCMS schema — all collections and fields
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Content Collections

All content is managed through the TinaCMS admin panel at `/admin/index.html`. No code knowledge required for day-to-day editing.

| Collection  | Path                       | Format  | Description                                    |
| ----------- | -------------------------- | ------- | ---------------------------------------------- |
| Campaigns   | `src/content/campaigns/`   | `.md`   | Campaign overview, stats, DM notes             |
| Characters  | `src/content/characters/`  | `.md`   | Full character sheets with stats and backstory |
| Sessions    | `src/content/sessions/`    | `.md`   | Session recaps, rewards, party present         |
| NPCs        | `src/content/npcs/`        | `.md`   | Named figures with disposition and affiliation |
| Factions    | `src/content/factions/`    | `.md`   | Organisations with relationship tracking       |
| Items       | `src/content/items/`       | `.md`   | Weapons, artifacts, and loot                   |
| Maps        | `src/content/maps/`        | `.json` | Map metadata with named location pins          |
| Gamemasters | `src/content/gamemasters/` | `.md`   | GM profiles with bio and campaigns run         |

### Who Can Edit What

| Content               | Who                     |
| --------------------- | ----------------------- |
| Campaign details      | DM                      |
| Session logs          | DM                      |
| Character sheets      | Each player (their own) |
| NPCs, Factions, Items | DM                      |
| Map pins              | DM                      |
| Gamemaster profiles   | DM                      |

> **DM-only fields** — `dmNotes` fields exist on campaigns, sessions, characters, NPCs, factions, and items. These are never rendered on public-facing pages.

### Images

All images uploaded through the TinaCMS admin are stored in `public/uploads/` and referenced as plain URL strings (e.g. `/uploads/portrait.jpg`). Astro's `<Image>` component is used for rendering with appropriate `width`/`height` hints for optimisation.

---

## Deployment

Deployment is handled automatically via GitHub Actions on every push to `main`. You can also trigger it manually from the Actions tab.

### Pipeline

```
Push to main
  → Checkout code
  → Install dependencies (npm ci)
  → Build: tinacms build && astro build
  → Write SSH key, scan host fingerprint
  → rsync dist/ to server webroot
  → Remove SSH key from runner
```

### GitHub Secrets Required

Add these in **Settings → Secrets and variables → Actions**:

| Secret            | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `SSH_PRIVATE_KEY` | SSH private key for server access                                           |
| `HOST`            | Server hostname or IP address                                               |
| `USERNAME`        | SSH username                                                                |
| `DEPLOY_PATH`     | Absolute path to the webroot on the server (e.g. `/var/www/emberfall-keep`) |
| `TINA_CLIENT_ID`  | TinaCMS Cloud client ID                                                     |
| `TINA_TOKEN`      | TinaCMS Cloud token                                                         |

### Server Setup (Apache)

1. Point your domain to the server
2. Create the webroot directory at your `DEPLOY_PATH`
3. Configure an Apache virtual host pointing to that directory
4. Ensure `mod_rewrite`, `mod_deflate`, `mod_expires`, and `mod_headers` are enabled:
   ```bash
   sudo a2enmod rewrite deflate expires headers
   sudo systemctl restart apache2
   ```
5. The `public/.htaccess` file is included in the build and handles clean URLs, caching, and security headers automatically

### Local Environment Variables

Create a `.env` file in the project root for local development:

```bash
# TinaCMS Cloud (required for production admin; not needed for local-only editing)
TINA_PUBLIC_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token
```

---

## Design System

### Colors

Palette derived from CROM fantasy illustration — warm charcoal, cream line art, muted steel blue, ember salmon.

```css
--void-deep: #272524; /* page background */
--void-surface: #302e2c; /* cards, panels */
--void-raised: #3a3836; /* elevated surfaces */
--void-border: #4a4845; /* borders */
--mist-bright: #ddd4b0; /* headings, display text */
--mist-mid: #b8b098; /* secondary text */
--teal-bright: #a0c0c8; /* active states */
--teal-mid: #6898a8; /* accents, icons */
--teal-deep: #3a6070; /* buttons, highlights */
--mauve-bright: #c88878; /* danger, fire, ember */
--gold: #c8b878; /* ornament, artifacts */
```

Full token reference: `src/styles/tokens.css`

### Fonts

All loaded via [Bunny Fonts](https://fonts.bunny.net) — GDPR-compliant, no tracking.

| Role                                      | Font                 |
| ----------------------------------------- | -------------------- |
| Identity / Monogram                       | Almendra SC          |
| Display headings                          | Cinzel Decorative    |
| UI headings & labels                      | Cinzel               |
| Body / lore prose                         | IM Fell English      |
| Stats / code                              | System monospace     |
| General prose (backstory, session recaps) | System UI sans-serif |

---

## Contributing

This is a private project for the fellowship. If you're reading this, you're probably already in the party.

- **Found a bug?** Open an issue or ping the DM.
- **Want to add content?** Use the `/admin/index.html` panel — no PRs needed for content changes.
- **Want to change the site itself?** Branch off `main`, make your changes, open a PR.

### Commit Style

```
feat: add character portrait duotone treatment
fix: session log dates not sorting correctly
chore: update dependencies
content: add Session XIV recap
```

---

## License

Private repository. All rights reserved.

---

_Emberfall Keep · Est. 2026 · In Omnia Paratus_
