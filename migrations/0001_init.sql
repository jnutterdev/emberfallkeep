CREATE TABLE players (
  discord_id TEXT PRIMARY KEY,
  username   TEXT NOT NULL,
  avatar     TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE character_state (
  character_slug     TEXT PRIMARY KEY,
  str                 INTEGER,
  dex                 INTEGER,
  con                 INTEGER,
  int                 INTEGER,
  wis                 INTEGER,
  cha                 INTEGER,
  max_hp              INTEGER,
  current_hp          INTEGER,
  ac                  INTEGER,
  speed               INTEGER,
  initiative          INTEGER,
  hit_dice            TEXT,
  proficiency_bonus   INTEGER,
  personality_traits  TEXT,
  ideals              TEXT,
  bonds               TEXT,
  flaws               TEXT,
  backstory           TEXT,
  inventory           TEXT NOT NULL DEFAULT '[]', -- JSON array of {name, quantity, notes}
  updated_at          INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_by          TEXT -- discord_id of last editor (audit only, not ownership)
);
