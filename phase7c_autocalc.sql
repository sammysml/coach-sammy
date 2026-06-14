-- ═══════════════════════════════════════════════════════
-- PHASE 7c — Body Fat tracking + Calorie Calculator support
-- Adds optional body_fat_percentage to clients table
-- ═══════════════════════════════════════════════════════

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS body_fat_percentage numeric;

-- Optional: also on client_goals for "target body fat"
ALTER TABLE client_goals
  ADD COLUMN IF NOT EXISTS body_fat_percentage numeric,
  ADD COLUMN IF NOT EXISTS goal_aggressiveness text DEFAULT 'moderate'
    CHECK (goal_aggressiveness IN ('conservative','moderate','aggressive'));
