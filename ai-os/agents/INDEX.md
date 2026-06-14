# Agents — Catalog

Every subagent at a glance. Files in this folder are in Claude Code subagent format (YAML frontmatter + system prompt).

## To wire into Claude Code

```bash
cd /Users/mac/Downloads/coach-sammy/ai-os
ln -s "$(pwd)/agents" .claude/agents
```

(Or copy. Symlink keeps things in sync as you edit.)

Verify:
```bash
ls .claude/agents/
```

Should list all 12 `.md` files. Claude Code auto-discovers and makes them available as `subagent_type`s.

## The 12 agents

| Agent | Purpose | Outputs | Reads |
|---|---|---|---|
| [`meal-plan-architect`](meal-plan-architect.md) | 7-day meal plan generation | `meal-plan-v1` | intake, targets |
| [`training-program-architect`](training-program-architect.md) | Training program design | `training-program-v1` | client profile, equipment, injuries |
| [`checkin-analyst`](checkin-analyst.md) | Weekly bilan analysis | `checkin-analysis-v1` + FR/EN/AR coach message | 7 daily_logs, weekly fields, targets |
| [`client-psychologist`](client-psychologist.md) | Behavior pattern reading | psych briefing | 30-90d data, comments thread |
| [`whatsapp-sales`](whatsapp-sales.md) | Sales DM drafting | `dm-draft-v1` | lead form, DM history |
| [`reel-scriptwriter`](reel-scriptwriter.md) | Instagram Reel scripts | `reel-script-v1` + full markdown | topic, hook, audience |
| [`tiktok-hook-writer`](tiktok-hook-writer.md) | 8 candidate hooks per topic | `tiktok-hook-v1` | topic |
| [`landing-copywriter`](landing-copywriter.md) | Landing page copy blocks | `landing-block-v1` + optional HTML | current copy, brand voice |
| [`ui-ux-advisor`](ui-ux-advisor.md) | UX findings + fixes | `ux-finding-v1` (1-5 per request) | screens, brand visual |
| [`retention-strategist`](retention-strategist.md) | At-risk intervention drafts | `retention-action-v1` | logs, psych briefings |
| [`progress-analyst`](progress-analyst.md) | Per-client or cross-client summaries | `progress-summary-v1` | full data history |
| [`feature-planner`](feature-planner.md) | Feature specs from fuzzy ideas | `feature-spec-v1` | the codebase, the request |

## Tool access matrix

See `systems/delegation-rules.md` § Tool access by agent.

## Adding a new agent

1. Create `agents/<new-name>.md` with YAML frontmatter:
   ```yaml
   ---
   name: <new-name>
   description: <when to invoke — one sentence>
   tools: Read, Write  # only what's needed
   ---
   ```
2. Add the role, inputs, outputs, philosophy, "do NOT" list, examples
3. Add to this INDEX
4. Add a delegation rule in `systems/delegation-rules.md`
5. If it fits a chain, add it in `systems/workflow-chains.md`

## Anti-patterns

- **One agent doing two jobs** — split.
- **Agents that "do everything for a client"** — way too broad. Each agent is a single role.
- **Agents that talk to each other directly** — always go through orchestrator.
- **Agents with vague descriptions** — Claude Code routing depends on the `description`. Be specific.
