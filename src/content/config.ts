import { defineCollection, z } from "astro:content";

// Use z.coerce.date() throughout so YAML date strings (e.g. 2024-01-15)
// are automatically coerced to Date objects by Astro's content pipeline.
//
// All image fields use z.string() rather than Astro's image() helper.
// TinaCMS stores uploaded images as public URL paths (/uploads/filename.png),
// which are not importable by Astro's image pipeline. Using z.string() lets
// us treat them as plain <img src> values, which is the correct approach for
// CMS-managed media.

const campaigns = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    status: z.enum(["Active", "Archived", "Planned"]).default("Active"),
    tagline: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    lastSession: z.coerce.date().optional(),
    sessionCount: z.number().default(0),
    partySize: z.number().optional(),
    dungeonMaster: z.string().optional(),
    coverImage: z.string().optional(),
    setting: z.string().optional(),
    system: z.string().default("D&D 5e"),
    dmNotes: z.string().optional(),
  }),
});

const characters = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    player: z.string(),
    campaign: z.string(),
    active: z.boolean().default(true),
    portrait: z.string().optional(),
    race: z.string().optional(),
    characterClass: z.string().optional(),
    subclass: z.string().optional(),
    level: z.number().default(1),
    background: z.string().optional(),
    alignment: z.string().optional(),
    stats: z
      .object({
        str: z.number().default(10),
        dex: z.number().default(10),
        con: z.number().default(10),
        int: z.number().default(10),
        wis: z.number().default(10),
        cha: z.number().default(10),
      })
      .optional(),
    combat: z
      .object({
        maxHp: z.number().optional(),
        ac: z.number().optional(),
        speed: z.number().default(30),
        initiative: z.number().default(0),
        hitDice: z.string().optional(),
        proficiencyBonus: z.number().optional(),
      })
      .optional(),
    xpTracking: z.enum(["XP", "Milestone"]).default("Milestone"),
    xp: z.number().default(0),
    personalityTraits: z.string().optional(),
    ideals: z.string().optional(),
    bonds: z.string().optional(),
    flaws: z.string().optional(),
    dmNotes: z.string().optional(),
  }),
});

const sessions = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    sessionNumber: z.number(),
    campaign: z.string(),
    date: z.coerce.date(),
    partyPresent: z
      .array(z.union([z.string(), z.object({ character: z.string() })]))
      .default([]),
    summary: z.string().optional(),
    rewards: z
      .object({
        xp: z.number().optional(),
        gold: z.number().optional(),
        loot: z.array(z.string()).default([]),
      })
      .optional(),
    dmNotes: z.string().optional(),
  }),
});

const npcs = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    campaign: z.string(),
    status: z
      .enum(["Alive", "Deceased", "Unknown", "Missing"])
      .default("Unknown"),
    disposition: z
      .enum(["Friendly", "Neutral", "Hostile", "Unknown"])
      .default("Unknown"),
    portrait: z.string().optional(),
    location: z.string().optional(),
    affiliation: z.string().optional(),
    description: z.string().optional(),
    dmNotes: z.string().optional(),
  }),
});

const factions = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    type: z
      .enum([
        "Guild",
        "Religious Order",
        "Noble House",
        "Criminal",
        "Military",
        "Political",
        "Other",
      ])
      .default("Other"),
    motto: z.string().optional(),
    emblem: z.string().optional(),
    alignment: z.string().optional(),
    partyRelationship: z
      .enum(["Allied", "Friendly", "Neutral", "Tense", "Hostile", "Unknown"])
      .default("Unknown"),
    headquarters: z.string().optional(),
    notableMembers: z.array(z.string()).default([]),
    description: z.string().optional(),
    dmNotes: z.string().optional(),
  }),
});

const items = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    type: z
      .enum([
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
      ])
      .default("Other"),
    rarity: z
      .enum([
        "Common",
        "Uncommon",
        "Rare",
        "Very Rare",
        "Legendary",
        "Artifact",
        "Unknown",
      ])
      .default("Unknown"),
    requiresAttunement: z.boolean().default(false),
    attunementNote: z.string().optional(),
    currentHolder: z.string().optional(),
    foundIn: z.string().optional(),
    image: z.string().optional(),
    campaign: z.string().optional(),
    properties: z.string().optional(),
    dmNotes: z.string().optional(),
  }),
});

const maps = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    tier: z.string(),
    campaign: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    pins: z
      .array(
        z.object({
          name: z.string(),
          type: z.string().optional(),
          status: z.string().default("unexplored"),
          x: z.number(),
          y: z.number(),
          description: z.string().optional(),
          session: z.string().optional(),
        })
      )
      .default([]),
  }),
});

export const collections = {
  campaigns,
  characters,
  sessions,
  npcs,
  factions,
  items,
  maps,
};
