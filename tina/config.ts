import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  // See docs on content modeling for more info on how to setup new content models:
  // https://tina.io/docs/schema/
  schema: {
    collections: [
      // ── Campaigns ───────────────────────────────────────────────
      {
        name: "campaigns",
        label: "Campaigns",
        path: "src/content/campaigns",
        format: "md",

        fields: [
          {
            type: "string",
            name: "title",
            label: "Campaign Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["Active", "Archived", "Planned"],
          },
          { type: "string", name: "tagline", label: "Tagline" },
          {
            type: "string",
            name: "system",
            label: "System",
            ui: { defaultValue: "D&D 5e" },
          },
          { type: "string", name: "setting", label: "World / Setting" },
          { type: "string", name: "dungeonMaster", label: "Dungeon Master" },
          { type: "number", name: "sessionCount", label: "Session Count" },
          { type: "number", name: "partySize", label: "Party Size" },
          { type: "datetime", name: "startDate", label: "Start Date" },
          { type: "datetime", name: "lastSession", label: "Last Session" },
          { type: "image", name: "coverImage", label: "Cover Image" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Campaign Notes",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "dmNotes",
            label: "DM Notes (private)",
            description: "Never displayed on public-facing pages.",
          },
        ],
      },

      // ── Characters (Fellowship) ──────────────────────────────────
      {
        name: "characters",
        label: "Fellowship",
        path: "src/content/characters",
        format: "md",

        fields: [
          {
            type: "string",
            name: "name",
            label: "Character Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "player",
            label: "Player Name",
            required: true,
          },
          {
            type: "string",
            name: "campaign",
            label: "Campaign Slug",
            required: true,
          },
          {
            type: "boolean",
            name: "active",
            label: "Active",
            ui: { defaultValue: true },
          },
          { type: "image", name: "portrait", label: "Portrait" },
          { type: "string", name: "race", label: "Race" },
          { type: "string", name: "characterClass", label: "Class" },
          { type: "string", name: "subclass", label: "Subclass" },
          { type: "number", name: "level", label: "Level" },
          { type: "string", name: "background", label: "Background" },
          {
            type: "string",
            name: "alignment",
            label: "Alignment",
            options: [
              "Lawful Good",
              "Neutral Good",
              "Chaotic Good",
              "Lawful Neutral",
              "True Neutral",
              "Chaotic Neutral",
              "Lawful Evil",
              "Neutral Evil",
              "Chaotic Evil",
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Ability Scores",
            fields: [
              { type: "number", name: "str", label: "STR" },
              { type: "number", name: "dex", label: "DEX" },
              { type: "number", name: "con", label: "CON" },
              { type: "number", name: "int", label: "INT" },
              { type: "number", name: "wis", label: "WIS" },
              { type: "number", name: "cha", label: "CHA" },
            ],
          },
          {
            type: "object",
            name: "combat",
            label: "Combat Stats",
            fields: [
              { type: "number", name: "maxHp", label: "Max HP" },
              { type: "number", name: "ac", label: "Armour Class" },
              { type: "number", name: "speed", label: "Speed (ft)" },
              { type: "number", name: "initiative", label: "Initiative Bonus" },
              { type: "string", name: "hitDice", label: "Hit Dice (e.g. 3d8)" },
              {
                type: "number",
                name: "proficiencyBonus",
                label: "Proficiency Bonus",
              },
            ],
          },
          {
            type: "string",
            name: "xpTracking",
            label: "XP Tracking",
            options: ["XP", "Milestone"],
          },
          { type: "number", name: "xp", label: "Current XP" },
          {
            type: "string",
            name: "personalityTraits",
            label: "Personality Traits",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "ideals",
            label: "Ideals",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "bonds",
            label: "Bonds",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "flaws",
            label: "Flaws",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Backstory & Notes",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "dmNotes",
            label: "DM Notes (private)",
            description: "Never displayed on public-facing pages.",
          },
        ],
      },

      // ── Sessions (Chronicles) ────────────────────────────────────
      {
        name: "sessions",
        label: "Chronicles",
        path: "src/content/sessions",
        format: "md",

        fields: [
          {
            type: "string",
            name: "title",
            label: "Session Title",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "sessionNumber",
            label: "Session Number",
            required: true,
          },
          {
            type: "string",
            name: "campaign",
            label: "Campaign Slug",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date Played",
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Short Summary",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "partyPresent",
            label: "Party Present",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.character
                  ? item.character
                      .split("/")
                      .pop()
                      ?.replace(/\.mdx?$/, "")
                      .replace(/-/g, " ")
                  : "Select character…",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "character",
                label: "Character",
                collections: ["characters"],
              },
            ],
          },
          {
            type: "object",
            name: "rewards",
            label: "Rewards",
            fields: [
              { type: "number", name: "xp", label: "XP Awarded" },
              { type: "number", name: "gold", label: "Gold Awarded" },
              {
                type: "string",
                name: "loot",
                label: "Notable Loot",
                list: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Session Recap",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "dmNotes",
            label: "DM Notes (private)",
            description: "Never displayed on public-facing pages.",
          },
        ],
      },

      // ── NPCs ─────────────────────────────────────────────────────
      {
        name: "npcs",
        label: "Compendium — NPCs",
        path: "src/content/npcs",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "title", label: "Title / Role" },
          {
            type: "string",
            name: "campaign",
            label: "Campaign Slug",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["Alive", "Deceased", "Unknown", "Missing"],
          },
          {
            type: "string",
            name: "disposition",
            label: "Disposition",
            options: ["Friendly", "Neutral", "Hostile", "Unknown"],
          },
          { type: "image", name: "portrait", label: "Portrait" },
          { type: "string", name: "location", label: "Last Known Location" },
          {
            type: "string",
            name: "affiliation",
            label: "Faction / Organisation",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "History & Interactions",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "dmNotes",
            label: "DM Notes (private)",
            description: "Never displayed on public-facing pages.",
          },
        ],
      },

      // ── Factions ─────────────────────────────────────────────────
      {
        name: "factions",
        label: "Compendium — Factions",
        path: "src/content/factions",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Faction Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: [
              "Guild",
              "Religious Order",
              "Noble House",
              "Criminal",
              "Military",
              "Political",
              "Other",
            ],
          },
          { type: "string", name: "motto", label: "Motto" },
          {
            type: "string",
            name: "campaign",
            label: "Campaign Slug",
            required: true,
          },
          {
            type: "string",
            name: "alignment",
            label: "Alignment",
            options: [
              "Lawful Good",
              "Neutral Good",
              "Chaotic Good",
              "Lawful Neutral",
              "True Neutral",
              "Chaotic Neutral",
              "Lawful Evil",
              "Neutral Evil",
              "Chaotic Evil",
            ],
          },
          {
            type: "string",
            name: "partyRelationship",
            label: "Relationship to Party",
            options: [
              "Allied",
              "Friendly",
              "Neutral",
              "Tense",
              "Hostile",
              "Unknown",
            ],
          },
          { type: "string", name: "headquarters", label: "Headquarters" },
          {
            type: "string",
            name: "notableMembers",
            label: "Notable Members",
            list: true,
          },
          { type: "image", name: "emblem", label: "Emblem" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "History & Lore",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "dmNotes",
            label: "DM Notes (private)",
            description: "Never displayed on public-facing pages.",
          },
        ],
      },

      // ── Items ─────────────────────────────────────────────────────
      {
        name: "items",
        label: "Compendium — Items",
        path: "src/content/items",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Item Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: [
              "Weapon",
              "Armor",
              "Wondrous Item",
              "Ring",
              "Rod",
              "Staff",
              "Wand",
              "Potion",
              "Scroll",
              "Artifact",
              "Other",
            ],
          },
          {
            type: "string",
            name: "rarity",
            label: "Rarity",
            options: [
              "Common",
              "Uncommon",
              "Rare",
              "Very Rare",
              "Legendary",
              "Artifact",
              "Unknown",
            ],
          },
          {
            type: "boolean",
            name: "requiresAttunement",
            label: "Requires Attunement",
          },
          { type: "string", name: "attunementNote", label: "Attunement Note" },
          { type: "string", name: "currentHolder", label: "Current Holder" },
          {
            type: "string",
            name: "foundIn",
            label: "Found In (session/location)",
          },
          { type: "image", name: "image", label: "Item Image" },
          {
            type: "string",
            name: "campaign",
            label: "Campaign Slug",
            required: true,
          },
          {
            type: "string",
            name: "properties",
            label: "Properties & Effects",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Lore & History",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "dmNotes",
            label: "DM Notes (private)",
            description: "Never displayed on public-facing pages.",
          },
        ],
      },

      // ── Gamemasters ───────────────────────────────────────────────────────
      {
        name: "gamemasters",
        label: "Gamemasters",
        path: "src/content/gamemasters",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          { type: "image", name: "portrait", label: "Portrait" },
          {
            type: "string",
            name: "bio",
            label: "Short Bio",
            ui: { component: "textarea" },
          },
          {
            type: "boolean",
            name: "active",
            label: "Currently Active",
            ui: { defaultValue: true },
          },
          {
            type: "string",
            name: "favoriteSystem",
            label: "Favourite System",
          },
          {
            type: "object",
            name: "campaigns",
            label: "Campaigns Run",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.campaign
                  ? item.campaign
                      .split("/")
                      .pop()
                      ?.replace(/\.mdx?$/, "")
                      .replace(/-/g, " ")
                  : "Select campaign…",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "campaign",
                label: "Campaign",
                collections: ["campaigns"],
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Full Bio",
            isBody: true,
          },
        ],
      },

      // ── Maps ─────────────────────────────────────────────────────────────
      {
        name: "maps",
        label: "Maps",
        path: "src/content/maps",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Map Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "tier",
            label: "Tier",
            options: ["World", "Region", "Dungeon"],
          },
          {
            type: "string",
            name: "campaign",
            label: "Campaign Slug",
            required: true,
          },
          { type: "image", name: "image", label: "Map Image" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "pins",
            label: "Location Pins",
            list: true,
            ui: { itemProps: (item) => ({ label: item.name }) },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Location Name",
                required: true,
              },
              {
                type: "string",
                name: "type",
                label: "Type (e.g. City, Dungeon)",
              },
              {
                type: "string",
                name: "status",
                label: "Status",
                options: ["explored", "unexplored", "secret", "danger"],
              },
              {
                type: "number",
                name: "x",
                label: "X Position (%)",
                required: true,
              },
              {
                type: "number",
                name: "y",
                label: "Y Position (%)",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "session",
                label: "First visited (session title)",
              },
            ],
          },
        ],
      },
    ],
  },
});
