# 🐉 Emberfall Keep

> *A campaign management site for Dungeons & Dragons — built for the fellowship, by the fellowship.*

Emberfall Keep is a self-hosted web platform for tracking D&D campaigns, characters, maps, lore, and session logs. It's designed to feel like the world it documents: dark, dense with history, and built to last.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Astro](https://astro.build) |
| CMS | [TinaCMS](https://tina.io) |
| CI/CD | GitHub Actions |
| Hosting | Self-hosted server |
| Icons | [Font Awesome](https://fontawesome.com) (free) |
| Content | Markdown / MDX |

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- A server with SSH access for deployment
- A GitHub account (for Actions CI/CD)

### Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/emberfall-keep.git
cd emberfall-keep

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:4321`.

### TinaCMS

TinaCMS runs alongside the dev server and provides the browser-based editing UI.

```bash
# Start Astro + Tina together
npm run dev

# Tina admin panel available at:
http://localhost:4321/admin
```

Content is stored as Markdown files in `src/content/` and committed to git — no separate database required.

---

## Project Structure

```
emberfall-keep/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deploy pipeline
├── public/
│   └── fonts/                  # Self-hosted font files (optional)
├── src/
│   ├── content/
│   │   ├── campaigns/          # One .md file per campaign
│   │   ├── characters/         # One .md file per character
│   │   ├── sessions/           # One .md file per session log
│   │   ├── npcs/               # NPC entries
│   │   ├── factions/           # Faction entries
│   │   ├── items/              # Items & artifacts
│   │   └── maps/               # Map metadata + pin data
│   ├── layouts/
│   │   ├── Base.astro          # Root HTML shell
│   │   ├── Campaign.astro      # Campaign detail layout
│   │   └── Character.astro     # Character sheet layout
│   ├── pages/
│   │   ├── index.astro         # The Great Hall (home)
│   │   ├── campaigns/          # Campaign index + detail routes
│   │   ├── characters/         # Character roster + sheet routes
│   │   ├── sessions/           # Session log routes
│   │   ├── lore/               # Compendium routes
│   │   ├── maps/               # Map gallery
│   │   └── about.astro         # The fellowship
│   ├── components/
│   │   ├── CampaignCard.astro
│   │   ├── CharacterCard.astro
│   │   ├── StatBlock.astro
│   │   ├── SessionEntry.astro
│   │   └── MapViewer.astro
│   └── styles/
│       ├── tokens.css          # Design tokens (colors, type, spacing)
│       └── global.css          # Base styles and resets
├── tina/
│   └── config.ts               # TinaCMS schema definition
├── astro.config.mjs
├── package.json
└── README.md
```

---

## Content Editing

All content is managed through the TinaCMS admin panel at `/admin`. No code knowledge required.

### What each party member can edit

| Content Type | Who Can Edit |
|---|---|
| Campaign details | DM |
| Session logs | DM |
| Character sheets | Each player (their own) |
| NPC entries | DM |
| Lore / compendium | DM |
| Map pins | DM |

> **DM-only fields** — certain fields (DM notes, hidden plot hooks, secret NPC details) are flagged `dmOnly: true` in the Tina schema and are not rendered on public-facing pages.

---

## Deployment

Deployment is handled automatically via GitHub Actions on every push to `main`.

### GitHub Actions Pipeline

```
Push to main
  → Install dependencies
  → Build Astro site (npm run build)
  → SSH into server
  → Sync /dist to server webroot
```

See `.github/workflows/deploy.yml` for the full pipeline configuration.

### Server Setup

1. Point your domain to the server
2. Configure Nginx (or Caddy) to serve the `/dist` output directory
3. Add your server SSH key to GitHub repository secrets as `DEPLOY_KEY`
4. Add your server details to secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`

### Environment Variables

```bash
# .env (local)
TINA_PUBLIC_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token

# Optional: if using TinaCMS Cloud for media
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

---

## Design System

Full design details are documented in [`SITE_BRIEF.md`](./SITE_BRIEF.md). Quick reference:

### Colors

```css
--color-void:        #111010;   /* page background */
--color-surface:     #1a1918;   /* cards, nav */
--color-border:      #2e2c2a;   /* dividers */
--color-gold:        #e8c97a;   /* headings, display text */
--color-gold-mid:    #c8a84a;   /* secondary headings */
--color-gold-muted:  #a88a32;   /* labels, metadata */
--color-cyan:        #34b0c8;   /* active states, accents */
--color-cyan-deep:   #1a6878;   /* accent backgrounds */
```

### Fonts

```css
/* Display */
font-family: 'Cinzel Decorative', serif;

/* Headings */
font-family: 'Cinzel', serif;

/* Body / Lore */
font-family: 'IM Fell English', serif;

/* Stats / Code */
font-family: monospace;
```

All fonts loaded from Google Fonts. See `src/styles/tokens.css` for the full type scale.

---

## Contributing

This is a private project for the fellowship. If you're reading this, you're probably already in the party.

- **Found a bug?** Open an issue or ping the DM.
- **Want to add content?** Use the `/admin` panel — no PRs needed for content changes.
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

*Emberfall Keep · Est. 2026 · In Omnia Paratus*
