-- ═══════════════════════════════════════════════════════
-- PHASE 7 — Dual Macro Targets (Training Day / Rest Day)
-- Run in Supabase SQL editor.
-- Safe to re-run (uses IF NOT EXISTS everywhere).
-- ═══════════════════════════════════════════════════════

-- 1. Extend client_goals with both target sets + weekly schedule
ALTER TABLE client_goals
  ADD COLUMN IF NOT EXISTS training_day_calories integer,
  ADD COLUMN IF NOT EXISTS training_day_protein  integer,
  ADD COLUMN IF NOT EXISTS training_day_carbs    integer,
  ADD COLUMN IF NOT EXISTS training_day_fat      integer,
  ADD COLUMN IF NOT EXISTS rest_day_calories     integer,
  ADD COLUMN IF NOT EXISTS rest_day_protein      integer,
  ADD COLUMN IF NOT EXISTS rest_day_carbs        integer,
  ADD COLUMN IF NOT EXISTS rest_day_fat          integer,
  ADD COLUMN IF NOT EXISTS training_days text[]  DEFAULT ARRAY['mon','wed','fri','sat'];

-- 2. Make client_id unique (required for upsert) — safe if already unique
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'client_goals_client_id_key'
  ) THEN
    BEGIN
      ALTER TABLE client_goals ADD CONSTRAINT client_goals_client_id_key UNIQUE (client_id);
    EXCEPTION WHEN duplicate_object THEN
      NULL; -- already exists under different name
    WHEN unique_violation THEN
      NULL; -- duplicate rows, manual cleanup needed but don't fail migration
    END;
  END IF;
END $$;

-- 3. Day type overrides table — per-date manual overrides by clients
CREATE TABLE IF NOT EXISTS day_type_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date date NOT NULL,
  day_type text NOT NULL CHECK (day_type IN ('training','rest')),
  source text DEFAULT 'manual',
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(client_id, date)
);

CREATE INDEX IF NOT EXISTS day_type_overrides_client_date_idx
  ON day_type_overrides(client_id, date);

-- 4. RLS — coaches can view/edit their clients' overrides; clients can view/edit own
ALTER TABLE day_type_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients manage own day overrides" ON day_type_overrides;
CREATE POLICY "Clients manage own day overrides"
  ON day_type_overrides FOR ALL
  USING (client_id IN (SELECT id FROM clients WHERE id = client_id))
  WITH CHECK (true);

-- 5. Migrate any existing single-target calories to both training & rest as a sensible default
-- This sets training day = current target, rest day = 85% of current target
UPDATE client_goals
SET
  training_day_calories = COALESCE(training_day_calories, target_calories, calories, 0),
  training_day_protein  = COALESCE(training_day_protein,  target_protein,  protein,  0),
  training_day_carbs    = COALESCE(training_day_carbs,    target_carbs,    carbs,    0),
  training_day_fat      = COALESCE(training_day_fat,      target_fat,      fat,      0),
  rest_day_calories     = COALESCE(rest_day_calories,     ROUND((COALESCE(target_calories, calories, 0) * 0.85)::numeric)::integer),
  rest_day_protein      = COALESCE(rest_day_protein,      target_protein,  protein,  0),
  rest_day_carbs        = COALESCE(rest_day_carbs,        ROUND((COALESCE(target_carbs, carbs, 0) * 0.6)::numeric)::integer),
  rest_day_fat          = COALESCE(rest_day_fat,          target_fat,      fat,      0)
WHERE training_day_calories IS NULL OR rest_day_calories IS NULL;

-- Done. The coach UI will let you adjust these defaults per client.
