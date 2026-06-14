# Client Data Schema

Every client has a folder at `client-data/<client_id>/`. This is the *local* mirror — Supabase is still the source of truth for app data. The local folder caches agent outputs, scratch space, and human notes.

## Folder shape

```
client-data/
├── INDEX.md                ← human-readable list of active clients (you maintain this)
├── SCHEMA.md               ← this file
├── .gitkeep                ← keeps the folder in git, contents gitignored
│
├── <client_id>/            ← one folder per client (UUID)
│   ├── profile.yaml        ← snapshot of clients row + targets, refreshed on changes
│   ├── consent.yaml        ← privacy flags: testimonial-OK, photo-share-OK, etc.
│   ├── holds.yaml          ← active retention holds (life events, vacations)
│   │
│   ├── program/
│   │   └── <YYYY-MM-DD>.yaml    ← training-program-v1 outputs (one per revision)
│   │
│   ├── meal-plans/
│   │   └── <YYYY-MM-DD>.yaml    ← meal-plan-v1 outputs
│   │
│   ├── checkins/
│   │   └── <week_start>.md      ← checkin-analysis-v1 reports
│   │
│   ├── psych-briefings/
│   │   └── <YYYY-MM-DD>.md      ← client-psychologist outputs (private)
│   │
│   ├── retention/
│   │   ├── baseline.yaml        ← onboarding baseline
│   │   └── <YYYY-MM-DD>.yaml    ← retention-action-v1 outputs
│   │
│   └── progress/
│       ├── baseline.md           ← onboarding snapshot
│       ├── <YYYY-MM>.md          ← monthly summaries
│       └── renewal-prep-<YYYY-MM-DD>.md  ← T-14 dossiers
│
└── _reports/               ← cross-client outputs (no leading underscore for client folders)
    ├── triage-<YYYY-MM-DD>.md       ← Monday triage reports
    ├── pulse-<YYYY-MM-DD>.md        ← Wednesday pulse
    ├── monthly-<YYYY-MM>.md         ← Monthly review
    ├── expiry-radar.md              ← Daily-refreshed radar
    └── _failures.md                 ← Cron run failures log

└── _content/               ← shared content workspace (not per-client)
    ├── reels/
    │   └── <YYYY-MM-DD>-<slug>.md
    └── prompts/
        └── <YYYY-MM-DD>.md          ← Content prompt outputs
```

## File formats

### `profile.yaml`
```yaml
client_id: "343d2ddc-9b6b-4a80-ac69-dcce65663b57"
name: "Yasmine"
created_at: "2026-02-01"
membership_tag: "3months"
membership_expiry: "2026-08-01"
status: "active"
goal: "Perte de gras"
phase: "Phase 1"
gender: "femme"
start_weight: 78
current_weight: 74.8
target_weight: 60
targets:
  kcal_training: 1500
  kcal_rest: 1500
  protein_g: 120
  carbs_g: 150
  fats_g: 45
  step_goal: 8000
language: "fr"
last_refreshed: "2026-05-20T10:30:00Z"
```

### `consent.yaml`
```yaml
testimonial_ok: false           # default false until explicit
photo_share_ok: false           # default false
first_name_in_proofs_ok: false  # even less granular
notes: "Has not been asked. Bring up at renewal conversation."
last_updated: "2026-02-01"
```

### `holds.yaml`
```yaml
holds:
  - reason: "Vacation"
    until: "2026-05-30"
    set_by: "manual"
    set_at: "2026-05-13"
  - reason: "Exam period"
    until: "2026-06-15"
    set_by: "MONDAY_TRIAGE auto-detected"
    set_at: "2026-05-20"
```

## Privacy + gitignore

The root `.gitignore` excludes everything under `client-data/` except:
- `INDEX.md`
- `SCHEMA.md`
- `.gitkeep`

This means:
- All client folders, profiles, briefings, etc. stay LOCAL.
- They survive in your filesystem but never get committed.
- Backup strategy is your responsibility (suggest: Time Machine + encrypted external drive).

## When agents write here

- `meal-plan-architect` writes to `<id>/meal-plans/` ONLY on explicit "save this"
- `training-program-architect` writes to `<id>/program/` ONLY on explicit "save this"
- `checkin-analyst` writes to `<id>/checkins/` on every successful analysis (high signal, low noise)
- `client-psychologist` writes to `<id>/psych-briefings/` on every briefing (sensitive — review before deletion)
- `retention-strategist` writes to `<id>/retention/` on every action draft (audit trail)
- `progress-analyst` writes to `<id>/progress/` on every summary
- `feature-planner`, `whatsapp-sales`, `reel-scriptwriter`, `tiktok-hook-writer`, `landing-copywriter`, `ui-ux-advisor` — do NOT write to `client-data/` by default. They emit to the orchestrator.

## When humans write here

- `profile.yaml` is refreshed by the orchestrator nightly OR on explicit request
- `consent.yaml` is human-edited only — never agent-modified
- `holds.yaml` can be agent-added but never agent-removed (humans cancel holds)
- `INDEX.md` is human-maintained — your reference doc for "who are my active clients"

## Retention policy (data lifecycle)

- **Active client**: keep everything indefinitely (until you decide to archive)
- **Paused / past client**: move folder to `client-data/_archive/<id>/` after 90 days inactive
- **Sensitive escalations**: psych briefings with ED/self-harm flags — keep, but flag in `INDEX.md` for special handling
- **Never auto-delete.** Manual archive only.

## Cross-references

When an agent output references another file (e.g. a retention-action cites a psych-briefing), use the relative path:

```yaml
informed_by: "psych-briefings/2026-05-15.md"
```

Not absolute paths. Agents reading these resolve relative to `client-data/<id>/`.
