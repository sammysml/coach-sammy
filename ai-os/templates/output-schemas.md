# Output Schemas — Master Reference

Every agent emits one of these shapes. Pick the matching schema name in the agent's frontmatter, then conform exactly.

## Schema: `meal-plan-v1`

```yaml
client_id: <uuid>
phase: "Phase 1" | "Phase 2" | "Phase 3"
targets:
  kcal_training: <int>
  kcal_rest: <int>
  protein_g: <int>
  carbs_g: <int>
  fats_g: <int>
constraints:                   # from intake form
  allergies: [<string>]
  dislikes: [<string>]
  budget: "low" | "mid" | "high"
  cooking_time_min: <int>
days:
  - day: "Lundi"
    type: "training" | "rest"
    meals:
      - slot: "Petit-déjeuner" | "Déjeuner" | "Collation" | "Dîner"
        items:
          - name: <string>
            qty: <string>          # "150g" / "1 tasse"
            kcal: <int>
            p: <int>; c: <int>; f: <int>
notes: <string max 200 chars — adherence hooks, swaps>
```

## Schema: `training-program-v1`

```yaml
client_id: <uuid>
phase: <string>
split: "Full Body" | "Upper/Lower" | "PPL" | "PPL+L" | "PPL+Upper" | "Custom"
sessions_per_week: <int>
sessions:
  - name: <string>             # "Push A — Poitrine focus"
    type: "Force" | "Hypertrophie" | "Circuit" | "Récupération"
    rest_time: <int seconds>
    exercises:
      - n: <string>            # name. Cardio prefixed with 🏃 or 🚴
        sets: <string>         # "4×8" | "3×12" | "3×45s" | "15min"
        cues: <string>         # one short coaching cue
        rest: <int seconds>    # 0 for cardio
progression_rule: <string max 120 chars>
deload_week: <int | null>      # week number, or null for now
```

## Schema: `checkin-analysis-v1`

```yaml
client_id: <uuid>
week_start: <YYYY-MM-DD>
metrics:
  days_logged: <0-7>
  compliance_avg: <0-100>
  weight_delta_kg: <float>     # negative = lost
  training_done: <int>/7
  menu_respected: <int>/7
flags: [<one of: "ghost-risk", "plateau", "overshoot-cals", "stress-spike", "sleep-deficit", "win-momentum">]
read_between_the_lines: <string ≤ 80 words — what the data says about behavior, not nutrition>
coach_message:
  fr: <string 80–140 words, voice-rules compliant>
  en: <string>
  ar: <string>
one_focus_next_week: <string ≤ 12 words>
```

## Schema: `dm-draft-v1`

```yaml
lead_id_or_handle: <string>
context_snippets: [<string>]   # quotes from prior DMs
intent: "first-touch" | "qualifying" | "objection-handling" | "close" | "reactivation"
draft:
  - speaker: "coach"
    text: <string ≤ 3 sentences unless mirroring depth>
  - speaker: "coach"
    text: <string optional second message>
followup_if_no_reply: <string optional 24h followup>
```

## Schema: `reel-script-v1`

```yaml
topic: <string>
duration_s: 15 | 30 | 60
hook: <string ≤ 8 words>      # 0–2s, attention grab
insight: <string 1-2 sentences> # 2–18s, the value
demo_or_proof: <string>        # 18–25s, visual cue / footage direction
cta: <string ≤ 8 words>        # 25–28s
loop: <string ≤ 6 words>       # 28–30s, repeats the hook visually
b_roll_notes: [<string>]
caption_fr: <string ≤ 150 chars>
```

## Schema: `tiktok-hook-v1`

```yaml
topic: <string>
hooks:                          # generate 8
  - text: <string ≤ 8 words>
    flavor: "contrarian" | "specific-stat" | "callout" | "self-deprecating" | "question"
  - …
recommended: <index 0-7>
why: <string ≤ 30 words>
```

## Schema: `landing-block-v1`

```yaml
section: "hero" | "social-proof" | "transformation" | "process" | "pricing" | "objection" | "final-cta"
copy:
  eyebrow: <string ≤ 25 chars uppercase>
  headline: <string ≤ 12 words>
  subline: <string ≤ 24 words>
  body: <string optional, ≤ 80 words>
  cta_primary: <string ≤ 4 words>
  cta_secondary: <string optional>
visual_direction: <string ≤ 40 words — refers to brand/visual.md>
```

## Schema: `ux-finding-v1`

```yaml
screen_or_flow: <string>
finding: <string ≤ 60 words>
severity: "critical" | "high" | "medium" | "polish"
proposed_fix:
  description: <string>
  effort: "trivial" | "small" | "medium" | "large"
  affects_files: [<path>]
```

## Schema: `retention-action-v1`

```yaml
client_id: <uuid>
risk_level: "watch" | "amber" | "red"
risk_signals: [<string>]       # e.g. "3 missed check-ins", "energy 4/10 twice"
intervention:
  channel: "in-app" | "whatsapp" | "call"
  message_draft: <string voice-rules compliant>
  timing: "now" | "tomorrow-morning" | "after-next-checkin"
followup_check: <string ≤ 30 words — what we look for in next 7 days>
```

## Schema: `progress-summary-v1`

```yaml
client_id: <uuid>
window: "7d" | "30d" | "90d" | "all-time"
headline: <string ≤ 16 words>  # the one thing that matters
data:
  weight: { start: <kg>, current: <kg>, delta: <kg>, trend: "down" | "up" | "flat" }
  compliance_avg: <0-100>
  training_sessions: <int>
  prs: <int>
  perfect_weeks: <int>
context: <string ≤ 100 words>  # what the numbers mean
next_lever: <string ≤ 20 words>
```

## Schema: `feature-spec-v1`

```yaml
title: <string>
problem: <string ≤ 60 words — observed user pain>
hypothesis: <string ≤ 40 words — what we believe fixing it does>
scope:
  user_facing: [<string bullets>]
  data_model: <string>           # tables/columns touched
  files: [<path>]
non_scope: [<string>]            # what we explicitly aren't doing
risks: [<string>]
success_metric: <string>         # one quantifiable thing
estimate: "S" | "M" | "L" | "XL"
```
