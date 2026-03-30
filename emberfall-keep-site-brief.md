# Emberfall Keep — Site Brief

> *"Where campaigns are forged and legends remembered"*

**Version:** 1.1
**Date:** March 2026
**Stack:** Astro · TinaCMS · Self-Hosted · GitHub Actions

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Audience](#2-audience)
3. [Visual Direction](#3-visual-direction)
4. [Color Palette](#4-color-palette)
5. [Typography](#5-typography)
6. [Site Structure & Pages](#6-site-structure--pages)
7. [Core Features](#7-core-features)
8. [Technology Stack](#8-technology-stack)
9. [Tone & UX Principles](#9-tone--ux-principles)
10. [Icons](#10-icons)

---

## 1. Project Overview

Emberfall Keep is a private web platform for managing Dungeons & Dragons campaigns, characters, lore, maps, and session notes. The site should feel like an artifact in itself — a living tome that grows richer with every session. It is not a generic SaaS tool; it is a crafted space with a strong identity rooted in medieval print aesthetics.

---

## 2. Audience

**Primary:** A trusted circle of friends who play together regularly. The experience should feel personal and owned, not like a product they stumbled onto.

**Secondary:** Curious visitors who may encounter public-facing content (lore entries, character pages) and want to explore the world.

---

## 3. Visual Direction

### Aesthetic Identity

The site draws from the visual language of **CROM-era fantasy illustration** — the kind found on D&D sourcebook covers and vintage pulp art. References include:

- Warm charcoal grounds with cream line art (think aged illustration board)
- Muted steel-blue armour and shadow tones
- Salmon/ember fire accents
- The weight and density of old illustration print — not UI-flat, not photorealistic

The interface should feel like entering a keep's library at night — **dark, dense with history, lit by candlelight and firelight**. Every element earns its place like a detail on a piece of armor.

### Lithotone Treatment

Images and illustrations should be treated as near-grayscale with a warm cream-teal tint applied via CSS `mix-blend-mode`. This mimics the aged-print quality of old two-ink illustration and gives all imagery a cohesive, worn quality.

### Identity Mark

The site uses an **EK monogram** in place of a traditional logo — the initials rendered in Almendra Display at 700 weight. In the hero, the letterform is accompanied by cardinal diamond ornaments and a thin horizontal rule. In the nav, it appears as a compact wordmark alongside the site name.

---

## 4. Color Palette

Derived from CROM fantasy illustration: warm charcoal grounds, cream line art, muted steel blue, ember salmon, and aged gold. Three neutrals, three accents. Nothing outside these values without strong justification.

### I — Void Charcoal *(Base & Ground)*

| Token | Hex | Usage |
|---|---|---|
| `--void-deep` | `#272524` | True page background |
| `--void-surface` | `#302e2c` | Navigation bar, card fills |
| `--void-raised` | `#3a3836` | Elevated card surfaces |
| `--void-border` | `#4a4845` | Dividers, card borders |

Warm charcoal — pulled from the illustration background, not pure black.

### II — Mist Cream *(Type & Line Art)*

| Token | Hex | Usage |
|---|---|---|
| `--mist-bright` | `#ddd4b0` | Primary headings, display text |
| `--mist-mid` | `#b8b098` | Secondary headings, body text |
| `--mist-deep` | `#807868` | Muted labels, metadata |

The cream of aged illustration board. Soft against the charcoal ground.

### III — Teal Steel *(Accent & Illustration)*

| Token | Hex | Usage |
|---|---|---|
| `--teal-bright` | `#a0c0c8` | Highlights, hover states |
| `--teal-mid` | `#6898a8` | Active nav, callout borders, image tint |
| `--teal-deep` | `#3a6070` | Accent backgrounds, stat panel borders |
| `--teal-tint` | `#141e22` | Subtle callout panel fill |

Muted steel blue from armour and shadow tones in the illustration palette.

### IV — Mauve Ember *(Fire & Danger)*

| Token | Hex | Usage |
|---|---|---|
| `--mauve-bright` | `#c88878` | Highlights, featured accents |
| `--mauve-mid` | `#905848` | Secondary ember tone |

Salmon/ember — the fire and warmth color in the palette. Used sparingly.

### V — Gold *(Ornament)*

| Token | Hex | Usage |
|---|---|---|
| `--gold` | `#c8b878` | Monogram ornaments, ruled lines, decorative accents |

### Color Roles at a Glance

```
Background layers:   #272524 → #302e2c → #3a3836
Text primary:        #ddd4b0  (cream)
Text secondary:      #b8b098  (mist mid)
Text muted:          #807868  (mist deep)
Accent / active:     #6898a8  (teal mid)
Borders default:     #4a4845
Borders accent:      rgba(104, 152, 168, 0.4)
Borders mist:        rgba(221, 212, 176, 0.2)
```

---

## 5. Typography

Four typefaces. All free via **Bunny Fonts** (`fonts.bunny.net`) — a privacy-friendly, GDPR-compliant mirror of Google Fonts.

```html
<link href="https://fonts.bunny.net/css?family=cinzel:400,600,700|cinzel-decorative:700|almendra-display:700|im-fell-english:400,400i|texturina:400,400i&display=swap" rel="stylesheet">
```

### Identity — Almendra Display

```
font-family: 'Almendra Display', serif;
font-weight: 700;
color: var(--mist-bright);
```

Use for: the **EK monogram** (nav and hero SVG). Heavy, ornate, ceremonial. Not used for navigation labels or body text.

### Display — Cinzel Decorative

```
font-family: 'Cinzel Decorative', serif;
font-weight: 700;
color: var(--mist-bright);
```

Use for: site name in the nav, page-level hero headings. Heavy, Roman, ceremonial.

### Heading — Cinzel

```
font-family: 'Cinzel', serif;
font-weight: 400 / 600;
letter-spacing: 0.08em;
color: var(--mist-bright);
```

Use for: section headers, navigation labels, card titles, stat block headings, all-caps metadata. Works at smaller sizes where Cinzel Decorative becomes too heavy.

### Body — IM Fell English

```
font-family: 'IM Fell English', serif;
font-size: 15–16px;
font-style: italic / normal;
color: var(--mist-mid);
line-height: 1.75;
```

Use for: campaign notes, character backstories, lore entries, session logs, NPC descriptions. Digitized from 17th-century type specimens — carries genuine historical texture. Use italic liberally.

### Decorative — UnifrakturMaguntia *(optional)*

```
font-family: 'UnifrakturMaguntia', cursive;
```

Use for: drop caps at the start of lore entries and session logs only. Never for navigation, UI labels, or body text. One per page maximum.

### Monospace — System

```
font-family: monospace;
font-size: 13px;
color: var(--teal-mid);
```

Use for: stat blocks (`STR 18 · DEX 14`), dice notation (`2d6 + 4`), map coordinates, code snippets, and any tabular game data.

### Type Scale

| Element | Family | Size | Weight | Color |
|---|---|---|---|---|
| EK monogram | Almendra Display | SVG-scaled | 700 | `--mist-bright` |
| Site name | Cinzel Decorative | 32–48px | 700 | `--mist-bright` |
| Page title | Cinzel Decorative | 24–32px | 700 | `--mist-bright` |
| Section heading | Cinzel | 18–22px | 600 | `--mist-bright` |
| Card title | Cinzel | 14–16px | 600 | `--mist-bright` |
| Nav label | Cinzel | 11px | 400 | `--mist-deep` |
| Body text | IM Fell English | 15–16px | 400 | `--mist-mid` |
| Caption / meta | Cinzel | 10–11px | 400 | `--text-dim` |
| Stat / code | Monospace | 13px | 400 | `--teal-mid` |

---

## 6. Site Structure & Pages

```
/                           The Great Hall
├── /campaigns              Campaign index
│   └── /campaigns/[slug]   Campaign detail (sessions, party, maps)
├── /characters             Character roster
│   └── /characters/[slug]  Full character sheet
├── /lore                   World compendium
│   ├── /lore/npcs          NPC database
│   ├── /lore/factions      Factions & relations
│   └── /lore/items         Items & artifacts
├── /maps                   Map gallery (zoomable)
├── /sessions               Session log index
│   └── /sessions/[slug]    Individual session recap
└── /about                  The fellowship
```

### Page Descriptions

**`/` — The Great Hall**
Landing page. Highlights the active campaign with a featured card, recent session summary, and quick links to party characters. Sets the full visual tone of the site.

**`/campaigns` — Campaign Index**
Cards for each campaign — active, archived, planned. Shows campaign name, player count, session count, date of last session, and a short description.

**`/campaigns/[slug]` — Campaign Detail**
The richest page. Tabs or sections for: Session Log, Party Members, Maps, Notable NPCs, Items Found, Timeline. This is where most time is spent during active play.

**`/characters/[slug]` — Character Sheet**
Full 5e stat block. Portrait (duotone-treated), backstory, inventory, spell slots, ability scores, proficiencies, level history. Editable via TinaCMS by the player.

**`/lore` — World Compendium**
A browsable encyclopedia of the campaign world. NPCs with relationship notes, factions with allegiance maps, items with lore descriptions.

**`/maps` — Map Gallery**
Uploaded maps displayed full-width with zoomable regions. Named location pins. World map, region maps, and dungeon maps as separate tiers.

**`/sessions/[slug]` — Session Recap**
A narrative log of each session. Written in IM Fell English italic. Includes: date played, party present, key events, loot found, XP gained.

---

## 7. Core Features

### Campaign Management
- Multiple simultaneous campaigns
- Session log with dates and summaries
- Campaign status: Active / Archived / Planned
- DM-only notes vs. player-visible notes
- XP and milestone tracking

### Character Sheets
- Full D&D 5e stat blocks
- Inventory and equipment lists
- Spell slots and ability tracking
- Character portrait (duotone-treated image)
- Backstory and personality fields
- Level-up history log

### Maps & Locations
- Upload and display campaign maps
- Named location pins with descriptions
- Region lore entries linked from pins
- World map → region map → dungeon map hierarchy

### Lore & Compendium
- NPC database with relationship notes
- Faction registry with allegiance descriptions
- Items and artifacts catalog
- Bestiary entries
- World timeline / history

### Session Logs
- Narrative session recaps
- Linked to characters present
- Loot and XP records per session
- DM notes (hidden from players)

---

## 8. Technology Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro | Static-first, content collections, island architecture for interactive components |
| CMS | TinaCMS | Git-backed content editing; friends can update characters/notes in a browser UI |
| Hosting | Self-hosted server | Full data ownership, no vendor lock-in |
| CI/CD | GitHub Actions | Push to `main` triggers build + deploy automatically |
| Content format | Markdown + MDX | Lore and session logs authored in markdown, stored in git |
| Icons | Font Awesome (free tier) | fa-dragon, fa-scroll, fa-dungeon, fa-shield-halved, fa-map, fa-skull, fa-dice-d20, fa-brands fa-discord |
| Fonts | Bunny Fonts | Privacy-friendly Google Fonts mirror (`fonts.bunny.net`) — GDPR-compliant, no tracking |
| Images | Sharp (Astro built-in) | Automatic WebP conversion, duotone filter via CSS mix-blend-mode |

### Astro Content Collections

Suggested collection structure:

```
src/content/
├── campaigns/        # One .md per campaign
├── characters/       # One .md per character
├── sessions/         # One .md per session
├── npcs/             # NPC entries
├── factions/         # Faction entries
├── items/            # Item/artifact entries
└── maps/             # Map metadata (image paths + pin data)
```

### TinaCMS Schema Notes

- Characters, sessions, and campaign entries should all be editable via Tina
- DM-only fields should be gated behind a `dmOnly: true` flag in the schema and hidden via a layout check
- Image fields should accept uploads and store paths for duotone treatment at render time

---

## 9. Tone & UX Principles

### Tone
The site should feel like entering a keep's library — warm, dense with history, slightly dark. Every page should have a sense of weight and permanence. Records within feel like they matter.

Writing style in UI labels and headings leans toward the archaic without being inaccessible. Prefer "Chronicles" over "Blog", "Fellowship" over "Team", "Compendium" over "Database".

### UX Principles

- **Lore-first, utility second.** The narrative experience matters as much as the data.
- **Dark mode is the primary mode.** There is no light mode.
- **Medium contrast.** Readable without being harsh — atmospheric, not clinical.
- **Desktop-rich, mobile-readable.** The main experience is a laptop at a game table. Mobile is secondary but must work.
- **Content editable by non-developers.** TinaCMS handles all content updates. No one should need to touch code to add a session log or update a character sheet.
- **Images look like prints.** All portraits and maps get a warm cream-teal duotone treatment via CSS `mix-blend-mode: multiply`, or via a server-side Sharp pipeline.
- **No jarring transitions.** Page loads and navigation feel measured and deliberate, not snappy.
- **Accessibility for all party members.** Sufficient color contrast on all interactive elements. Keyboard navigable. Screen reader friendly heading structure.

---

## 10. Icons

Font Awesome free tier. Key icons for the project:

| Icon | FA Class | Use |
|---|---|---|
| Dragon | `fa-dragon` | Site logo accent, campaign type |
| Scroll | `fa-scroll` | Session logs, lore entries |
| Dungeon | `fa-dungeon` | Campaign cards |
| Shield | `fa-shield-halved` | Character pages, defense stats |
| Map | `fa-map` | Maps section |
| Skull | `fa-skull` | Deceased characters, fallen foes |
| D20 | `fa-dice-d20` | Dice rolls, random elements |
| Book | `fa-book-open` | Compendium, lore |
| Users | `fa-users` | Party / fellowship |
| Star | `fa-star` | Favorites, featured campaigns |
| Lock | `fa-lock` | DM-only content |
| Compass | `fa-compass` | Navigation, world maps |
| Discord | `fa-brands fa-discord` | Discord server link |

---

*Emberfall Keep · Site Brief · v1.1 · March 2026*
*In Omnia Paratus*
