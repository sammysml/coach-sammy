# Cron Recipes

Time-based automation. Each recipe is a recurring trigger that fires the orchestrator with a specific chain.

## How these run

Two options — pick one per environment:

### Option A — Claude Code `/loop` skill (when Sammy is at his laptop)
- `/loop --interval 24h --prompt "Run MONDAY_TRIAGE chain"` for daily-ish work
- Cheaper but requires Claude Code to be open

### Option B — System cron + headless Claude (always-on)
```cron
0 8 * * 1   /usr/bin/claude --headless --prompt-file /Users/mac/Downloads/coach-sammy/ai-os/automation/prompts/monday-triage.txt
```
- Survives reboots, doesn't need laptop open
- Requires Anthropic API key in env and a Mac that's awake (caffeinate or always-on Mac mini)

## Recipes

### MONDAY_TRIAGE (Monday 8am)
Chain: WEEKLY_CHECKIN_TRIAGE (see `systems/workflow-chains.md`)

Outputs delivered to: `client-data/_reports/triage-<YYYY-MM-DD>.md`

Coach action required: review the report, send approved drafts.

### MID_WEEK_PULSE (Wednesday 8am)
Chain: lightweight — for each active coaching client, check days_since_last_log. If ≥ 3, propose a `watch`-level retention message.

Outputs: `client-data/_reports/pulse-<YYYY-MM-DD>.md`

### MONTHLY_REVIEW (1st of month, 8am)
Chain: MONTHLY_CROSS_CLIENT_REVIEW

Outputs: `client-data/_reports/monthly-<YYYY-MM>.md`

### CONTENT_PROMPT (Tuesday + Friday 7am)
Chain: lightweight — generate 3 topic candidates with tiktok-hook-writer hooks, no full scripts. Coach picks one or two for the week.

Outputs: `client-data/_content/prompts/<YYYY-MM-DD>.md`

### EXPIRY_RADAR (Daily 7am)
Lightweight check — list all clients with `membership_expiry` in ≤ 14 days. If any haven't had a renewal conversation started, flag for the coach.

Outputs: `client-data/_reports/expiry-radar.md` (overwritten daily)

## Headless prompt template

For a cron-driven invocation, the prompt file looks like:

```
You are the orchestrator for Coach Sammy's AI-OS. Today is {{date}}.

Run the {{CHAIN_NAME}} chain per /Users/mac/Downloads/coach-sammy/ai-os/systems/workflow-chains.md.

Inputs:
- Project root: /Users/mac/Downloads/coach-sammy/ai-os/
- Read CLAUDE.md first.
- Query Supabase using credentials at <secure path>.

When done:
1. Save outputs per the chain's "save:" lines.
2. Write a one-page report to {{OUTPUT_PATH}}.
3. Stop. Do not send any client-facing messages. Coach will review.

Constraints:
- No autonomous client communication.
- Apply §SAFETY everywhere.
- If anything is ambiguous, log the question and skip that client.
```

## Failure handling

Cron-driven runs should NEVER:
- Send anything to a client
- Modify production data without explicit save points
- Continue past `§SAFETY` triggers — they stop the affected client's path entirely

If a run fails:
- Log the failure to `client-data/_reports/_failures.md`
- Email the coach (out of scope here; configure via separate cron job if desired)

## Cost discipline

Each chain has a token budget (rough):

| Chain | Tokens / client | Daily volume cap |
|---|---|---|
| WEEKLY_CHECKIN_TRIAGE | ~8k | 30 clients = 240k (fine) |
| MID_WEEK_PULSE | ~1k | 30 clients = 30k (cheap) |
| MONTHLY_CROSS_CLIENT_REVIEW | ~50k total | once/month |
| CONTENT_PROMPT | ~5k | twice/week |
| EXPIRY_RADAR | ~500 | daily, negligible |

If a chain consistently exceeds budget, the orchestrator should pre-summarize inputs before delegating.
