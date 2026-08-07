export const prerender = false;

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { z } from 'zod';
import type { CharacterStateRow } from '../../../lib/characterState';

const abilityScore = z.number().int().min(1).max(30);

const patchSchema = z
  .object({
    stats: z
      .object({
        str: abilityScore,
        dex: abilityScore,
        con: abilityScore,
        int: abilityScore,
        wis: abilityScore,
        cha: abilityScore,
      })
      .partial(),
    combat: z
      .object({
        maxHp: z.number().int().min(0),
        ac: z.number().int().min(0),
        speed: z.number().int().min(0),
        initiative: z.number().int(),
        hitDice: z.string().max(20),
        proficiencyBonus: z.number().int().min(0),
      })
      .partial(),
    currentHp: z.number().int().min(0),
    personalityTraits: z.string().max(2000),
    ideals: z.string().max(2000),
    bonds: z.string().max(2000),
    flaws: z.string().max(2000),
    backstory: z.string().max(20000),
    inventory: z
      .array(
        z.object({
          name: z.string().min(1).max(200),
          quantity: z.number().int().min(0).max(9999),
          notes: z.string().max(500).optional(),
        }),
      )
      .max(200),
  })
  .partial()
  .strict();

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const player = locals.player;
  if (!player) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  const entry = await getEntry('characters', slug);
  if (!entry) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }
  if (!entry.data.discordId || entry.data.discordId !== player.discordId) {
    return new Response(JSON.stringify({ error: 'forbidden' }), { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'invalid_body', details: parsed.error.flatten() }), {
      status: 400,
    });
  }
  const patch = parsed.data;

  const db = locals.runtime.env.DB;
  const existing = await db
    .prepare('SELECT * FROM character_state WHERE character_slug = ?1')
    .bind(slug)
    .first<CharacterStateRow>();

  const merged = {
    str: patch.stats?.str ?? existing?.str ?? null,
    dex: patch.stats?.dex ?? existing?.dex ?? null,
    con: patch.stats?.con ?? existing?.con ?? null,
    int: patch.stats?.int ?? existing?.int ?? null,
    wis: patch.stats?.wis ?? existing?.wis ?? null,
    cha: patch.stats?.cha ?? existing?.cha ?? null,
    max_hp: patch.combat?.maxHp ?? existing?.max_hp ?? null,
    current_hp: patch.currentHp ?? existing?.current_hp ?? null,
    ac: patch.combat?.ac ?? existing?.ac ?? null,
    speed: patch.combat?.speed ?? existing?.speed ?? null,
    initiative: patch.combat?.initiative ?? existing?.initiative ?? null,
    hit_dice: patch.combat?.hitDice ?? existing?.hit_dice ?? null,
    proficiency_bonus: patch.combat?.proficiencyBonus ?? existing?.proficiency_bonus ?? null,
    personality_traits: patch.personalityTraits ?? existing?.personality_traits ?? null,
    ideals: patch.ideals ?? existing?.ideals ?? null,
    bonds: patch.bonds ?? existing?.bonds ?? null,
    flaws: patch.flaws ?? existing?.flaws ?? null,
    backstory: patch.backstory ?? existing?.backstory ?? null,
    inventory: JSON.stringify(patch.inventory ?? (existing?.inventory ? JSON.parse(existing.inventory) : [])),
  };

  await db
    .prepare(
      `INSERT INTO character_state (
         character_slug, str, dex, con, int, wis, cha,
         max_hp, current_hp, ac, speed, initiative, hit_dice, proficiency_bonus,
         personality_traits, ideals, bonds, flaws, backstory, inventory,
         updated_at, updated_by
       )
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, unixepoch(), ?21)
       ON CONFLICT(character_slug) DO UPDATE SET
         str = excluded.str, dex = excluded.dex, con = excluded.con, int = excluded.int, wis = excluded.wis, cha = excluded.cha,
         max_hp = excluded.max_hp, current_hp = excluded.current_hp, ac = excluded.ac, speed = excluded.speed,
         initiative = excluded.initiative, hit_dice = excluded.hit_dice, proficiency_bonus = excluded.proficiency_bonus,
         personality_traits = excluded.personality_traits, ideals = excluded.ideals, bonds = excluded.bonds, flaws = excluded.flaws,
         backstory = excluded.backstory, inventory = excluded.inventory,
         updated_at = unixepoch(), updated_by = excluded.updated_by`,
    )
    .bind(
      slug,
      merged.str,
      merged.dex,
      merged.con,
      merged.int,
      merged.wis,
      merged.cha,
      merged.max_hp,
      merged.current_hp,
      merged.ac,
      merged.speed,
      merged.initiative,
      merged.hit_dice,
      merged.proficiency_bonus,
      merged.personality_traits,
      merged.ideals,
      merged.bonds,
      merged.flaws,
      merged.backstory,
      merged.inventory,
      player.discordId,
    )
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
