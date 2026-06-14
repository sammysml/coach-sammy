# Workflow Chains

Multi-agent flows. Each chain is a named sequence the orchestrator runs. State is carried between steps by the orchestrator, never by the agents.

## Chain: NEW_CLIENT_ONBOARDING

Trigger: a new lead becomes a paying client. The intake form is complete.

```
[1] training-program-architect
    in:  intake (sessions/week, equipment, injuries, goal)
    out: training-program-v1
    save: client-data/<id>/program/<YYYY-MM-DD>.yaml
    → orchestrator confirms "looks good"

[2] meal-plan-architect
    in:  intake + targets (computed upstream from BMR/TDEE — coach does this manually)
    out: meal-plan-v1
    save: client-data/<id>/meal-plans/<YYYY-MM-DD>.yaml
    → orchestrator confirms "looks good"

[3] retention-strategist (BASELINE mode)
    in:  client_id, intake summary, no logs yet
    out: retention-action-v1 with risk_level: "watch", channel: "in-app"
    purpose: schedule a "day 5 nudge" if no logs by day 5
    save: client-data/<id>/retention/baseline.yaml

[4] progress-analyst (BASELINE mode)
    in:  client_id, start_weight, target_weight
    out: progress-summary-v1 with window: "all-time", just framing
    purpose: capture the start state for future comparisons
    save: client-data/<id>/progress/baseline.md
```

Output to coach: a single "Client X is onboarded — program, meal plan, baseline retention check, baseline progress snapshot all saved."

## Chain: WEEKLY_CHECKIN_TRIAGE

Trigger: weekly bilans submitted (Sunday batch). Runs Monday morning.

```
For each client with a bilan submission:

[1] checkin-analyst
    in:  daily_logs (7), weekly_note, targets, client profile
    out: checkin-analysis-v1
    save: client-data/<id>/checkins/<week_start>.md (template)

    Branch on flags:
    - "ghost-risk" twice in a row → chain to client-psychologist (step 2)
    - "stress-spike" with weekly_energy ≤ 4 → chain to client-psychologist (step 2)
    - ESCALATION_REQUIRED → STOP chain, ping coach personally
    - Otherwise → done, coach reviews the coach_message and sends

[2] client-psychologist (conditional)
    in:  last 30d logs, last 90d comments, latest checkin-analysis-v1
    out: psych briefing
    save: client-data/<id>/psych-briefings/<YYYY-MM-DD>.md

    Branch on risk_level in briefing:
    - "watch" → done, coach decides
    - "amber" or "red" → chain to retention-strategist (step 3)

[3] retention-strategist (conditional)
    in:  briefing, latest checkin-analysis
    out: retention-action-v1
    purpose: draft the intervention; coach reviews before send
```

Coach gets a Monday morning report:
- N clients checked in
- M flagged for psych briefing
- K flagged for retention intervention
- Drafts ready for review

## Chain: CONTENT_PIPELINE

Trigger: "I need 3 reels this week" or "what should I post?"

```
[1] (optional) brainstorm topics — coach does this manually OR uses tiktok-hook-writer in a "topic explorer" mode

[2] tiktok-hook-writer
    in:  topic
    out: 8 hooks, ranked, with recommendation
    coach picks one (often not the recommended)

[3] reel-scriptwriter
    in:  chosen hook + topic
    out: reel-script-v1 + full markdown
    save: client-data/_content/reels/<YYYY-MM-DD>-<slug>.md

[4] (optional) ui-ux-advisor — only if the reel features an in-app screenshot
    in:  the screen referenced in the reel
    out: ux-finding-v1 to ensure the screen looks good before recording
```

Output to coach: a folder of ready-to-shoot scripts with b-roll direction.

## Chain: AT_RISK_DEEP_DIVE

Trigger: a client crossed an amber threshold or the coach explicitly asks "deep dive on X".

```
[1] progress-analyst (window: 30d)
    in:  client_id
    out: progress-summary-v1 with all metrics
    purpose: see the numbers in one place

[2] client-psychologist
    in:  same data + last 90d comments + latest checkin-analysis
    out: psych briefing
    save: client-data/<id>/psych-briefings/<YYYY-MM-DD>.md

[3] retention-strategist
    in:  briefing + progress summary
    out: retention-action-v1
    coach reviews & approves before sending

[4] (optional, IF intervention isn't enough) → adjust the plan
    [4a] training-program-architect — revise program
    [4b] meal-plan-architect — revise meal plan
```

Output to coach: full dossier on the client + drafted intervention + (if needed) plan revisions.

## Chain: MONTHLY_CROSS_CLIENT_REVIEW

Trigger: first of the month, or coach asks "give me the picture".

```
[1] progress-analyst (mode: cross-client, window: 30d, filter: active coaching tier)
    in:  coachClients filtered to active coaching
    out: ranked list — top movers, biggest risks, plateaus

[2] For top 3 movers: progress-analyst (window: 30d, per-client)
    purpose: get headline + context for testimonial candidates

[3] For bottom 3 (risk): chain to AT_RISK_DEEP_DIVE for each

[4] (optional) reel-scriptwriter using the top-1 mover's story
    coach must confirm client consent before this step
```

Output to coach: a one-page monthly report — what moved, what didn't, who to focus on.

## Chain: LANDING_PAGE_REFRESH

Trigger: copy starts to feel stale, or a new offer / phase / proof point exists.

```
[1] feature-planner (only if structural change implied)
    in:  the proposed change
    out: feature-spec-v1
    coach approves before continuing

[2] landing-copywriter — one block at a time
    repeat for each block being rewritten

[3] ui-ux-advisor
    in:  the proposed copy + visual direction
    out: ux-finding-v1 (validate layout fit)

[4] coach edits coach_sammy_v7 (2).html in main thread
    (no agent ships production code)
```

Output to coach: copy ready to paste, with visual direction validated.

## Chain rules (apply to all)

- **Every chain has a STOP condition.** ESCALATION_REQUIRED, validation failures, or coach-says-pause all halt the chain immediately.
- **Save points are explicit.** Each "save:" line in the chain is the only place data persists.
- **Coach reviews between every step** unless explicitly automated (see `automation/chains.md`).
- **Failed steps don't auto-retry.** If an agent failed validation, the orchestrator surfaces the failure and waits for human direction.
- **State lives in `client-data/`**, not in the agents' heads.
