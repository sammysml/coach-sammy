# Automation Chains — Cookbook

Concrete combinations of cron + event + agents. Steal these. Adapt them.

## Recipe 1 — Monday morning triage (full automation)

**Goal**: every Monday at 8am, every client who submitted a bilan gets analyzed; drafts wait in coach's inbox.

```
[CRON 8am Monday]
   │
   └─→ orchestrator: "MONDAY_TRIAGE"
         │
         ├─→ for each client with weekly_checkin_done = true since last Monday:
         │     │
         │     ├─→ checkin-analyst → checkin-analysis-v1
         │     ├─→ save to client-data/<id>/checkins/<week>.md
         │     │
         │     ├─→ IF flags ∋ {ghost-risk, stress-spike}:
         │     │     │
         │     │     ├─→ client-psychologist → briefing
         │     │     └─→ IF risk_level ∈ {amber, red}:
         │     │           │
         │     │           └─→ retention-strategist → action draft
         │     │
         │     └─→ orchestrator: write to triage-<YYYY-MM-DD>.md
         │
         └─→ done — coach gets one report Monday morning
```

**Coach action time**: ~30 min to review 10–20 client briefings vs ~3 hours doing them manually.

## Recipe 2 — Single bilan late-night submission

**Goal**: a client submits a bilan at 11pm Sunday. Don't wake Sammy. Have the draft ready by 8am.

```
[BILAN_SUBMITTED event @ 23:00]
   │
   └─→ event router queues
         │
         └─→ next cron drain (within 5 min) invokes orchestrator
               │
               └─→ checkin-analyst (single client)
                     │
                     └─→ save to client-data/<id>/checkins/<week>.md
                           │
                           └─→ tagged "pending coach review" — surfaced in Monday report
```

No client sees anything until Sammy approves.

## Recipe 3 — Content week starter

**Goal**: every Tuesday + Friday 7am, get 3 topic hooks for content. Sammy picks one or two, then asks for the full script.

```
[CRON 7am Tue/Fri]
   │
   └─→ orchestrator: "CONTENT_PROMPT"
         │
         ├─→ pull recent themes from client-data (recent retention briefings + recent PRs + recent objections in DMs)
         ├─→ derive 3 candidate topics
         │
         ├─→ for each topic: tiktok-hook-writer → 8 hooks
         │
         └─→ save to client-data/_content/prompts/<YYYY-MM-DD>.md
```

Sammy opens the file Tuesday morning over coffee, picks the hook he likes, then in Claude Code main thread: "Run reel-scriptwriter on hook #4 from today's prompts."

## Recipe 4 — Renewal prep (T-14 days)

**Goal**: any client whose membership expires in 14 days gets a fresh progress dossier ready before the renewal conversation.

```
[EXPIRY_RADAR cron, daily 7am]
   │
   └─→ for each client with expiry in (today+10, today+14):
         │
         ├─→ progress-analyst (window: 90d)
         │     └─→ save to client-data/<id>/renewal-prep-<YYYY-MM-DD>.md
         │
         └─→ orchestrator notes in expiry-radar.md: "Renewal prep ready for <name>"
```

When Sammy starts the renewal conversation, he has 90 days of data + the headline already drafted.

## Recipe 5 — Auto-pause for life events

**Goal**: when a bilan mentions specific life-event keywords ("déménagement", "examen", "bébé", "deuil", "hospitalisation"), don't trigger retention nudges for 2 weeks.

```
[BILAN_SUBMITTED event]
   │
   ├─→ checkin-analyst (normal path)
   │
   └─→ orchestrator scans weekly_note for life-event keywords
         │
         └─→ IF found: write to client-data/<id>/holds.json:
              {
                "until": "<today + 14 days>",
                "reason": "<keyword>",
                "auto_set_by": "MONDAY_TRIAGE"
              }
         │
         └─→ retention-strategist reads holds.json before drafting any intervention
                and skips if hold is active
```

Prevents "you missed your check-ins" guilt-bots from triggering during a divorce.

## Recipe 6 — Testimonial harvest (manual, but agent-assisted)

**Goal**: turn a great client outcome into a testimonial without making it feel cheap.

```
[Manual trigger by coach: "Draft testimonial for <client>"]
   │
   ├─→ progress-analyst (window: all-time, mode: shareable)
   │     ├─→ checks client-data/<id>/consent.yaml for shareable flag
   │     ├─→ IF no consent: STOP, output "Need explicit client consent first."
   │     └─→ IF consent: produce progress-summary-v1 with shareable: true
   │
   ├─→ landing-copywriter (block: social-proof)
   │     ├─→ input: the progress summary
   │     └─→ output: 1-line testimonial draft, anonymized to first name + city
   │
   └─→ coach reviews + sends to client for sign-off before publishing
```

Two layers of consent: stored flag + post-draft sign-off.

## Recipe 7 — App development orchestration

**Goal**: a backlog item moves from idea to ready-to-ship spec without Sammy hand-holding.

```
[Manual: Sammy describes the idea in main thread]
   │
   └─→ orchestrator: "Spec this"
         │
         ├─→ feature-planner → feature-spec-v1
         │
         ├─→ IF estimate is S/M: ready for dev session
         │
         └─→ IF estimate is L/XL: 
               ├─→ ui-ux-advisor reviews proposed flow
               └─→ orchestrator surfaces both for Sammy to decide go/no-go
```

The dev session (Claude Code main thread editing `coach_sammy_v7 (2).html`) consumes the spec and ships.

## Anti-recipes (don't build these)

- **Auto-reply to client DMs.** Even if the model nails 95%, the 5% disasters cost too much.
- **Auto-renewal charge attempts.** Always a coach conversation.
- **Auto-deactivation on missed payment.** Manual review every time.
- **Auto-post to social.** The model drafts. Sammy posts.
- **Auto-broadcast to all clients.** Bulk announcements are 1:1 by the coach.

The principle: **AI does the prep work, never the public action.**
