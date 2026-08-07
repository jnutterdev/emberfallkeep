import type { CollectionEntry } from 'astro:content';

export interface InventoryItem {
  name: string;
  quantity: number;
  notes?: string;
}

export interface CharacterStateRow {
  character_slug: string;
  str: number | null;
  dex: number | null;
  con: number | null;
  int: number | null;
  wis: number | null;
  cha: number | null;
  max_hp: number | null;
  current_hp: number | null;
  ac: number | null;
  speed: number | null;
  initiative: number | null;
  hit_dice: string | null;
  proficiency_bonus: number | null;
  personality_traits: string | null;
  ideals: string | null;
  bonds: string | null;
  flaws: string | null;
  backstory: string | null;
  inventory: string;
  updated_at: number;
  updated_by: string | null;
}

export interface MergedCharacterState {
  stats: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  combat: {
    maxHp?: number;
    ac?: number;
    speed?: number;
    initiative?: number;
    hitDice?: string;
    proficiencyBonus?: number;
  };
  currentHp: number | null;
  personalityTraits?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  /** Player-edited plain-text backstory override; null means "show the Tina rich-text body instead". */
  backstory: string | null;
  inventory: InventoryItem[];
  updatedAt: number | null;
  updatedBy: string | null;
}

export function mergeCharacterState(
  tina: CollectionEntry<'characters'>['data'],
  row: CharacterStateRow | null,
): MergedCharacterState {
  return {
    stats: {
      str: row?.str ?? tina.stats?.str,
      dex: row?.dex ?? tina.stats?.dex,
      con: row?.con ?? tina.stats?.con,
      int: row?.int ?? tina.stats?.int,
      wis: row?.wis ?? tina.stats?.wis,
      cha: row?.cha ?? tina.stats?.cha,
    },
    combat: {
      maxHp: row?.max_hp ?? tina.combat?.maxHp,
      ac: row?.ac ?? tina.combat?.ac,
      speed: row?.speed ?? tina.combat?.speed,
      initiative: row?.initiative ?? tina.combat?.initiative,
      hitDice: row?.hit_dice ?? tina.combat?.hitDice,
      proficiencyBonus: row?.proficiency_bonus ?? tina.combat?.proficiencyBonus,
    },
    currentHp: row?.current_hp ?? row?.max_hp ?? tina.combat?.maxHp ?? null,
    personalityTraits: row?.personality_traits ?? tina.personalityTraits,
    ideals: row?.ideals ?? tina.ideals,
    bonds: row?.bonds ?? tina.bonds,
    flaws: row?.flaws ?? tina.flaws,
    backstory: row?.backstory ?? null,
    inventory: row?.inventory ? (JSON.parse(row.inventory) as InventoryItem[]) : [],
    updatedAt: row?.updated_at ?? null,
    updatedBy: row?.updated_by ?? null,
  };
}
