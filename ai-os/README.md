# Coach Sammy — AI-OS

Internal AI operating system for the coaching business. Twelve specialized subagents, coordinated through an orchestrator (you in Claude Code), governed by a shared brand + philosophy.

## Quick start

```bash
# 1. Open the folder in Claude Code
cd /Users/mac/Downloads/coach-sammy/ai-os
claude

# 2. Wire the agents into Claude Code
ln -s "$(pwd)/agents" .claude/agents
ls .claude/agents/   # should show 12 .md files + INDEX.md

# 3. Try one
claude
# In Claude Code, type something like:
# > "Run checkin-analyst on this week's bilan from Yasmine"
# Then paste the data when prompted.
```

That's it for the agents. The folder structure below is what makes them work coherently.

## What's in here

```
ai-os/
├── CLAUDE.md              ← Auto-loaded on every Claude Code session. Read this first.
├── README.md              ← You are here.
├── .gitignore             ← Protects client data.
│
├── agents/                ← 12 subagents (Claude Code format)
│   ├── INDEX.md           ← Agent catalog
│   ├── meal-plan-architect.md
│   ├── training-program-architect.md
│   ├── checkin-analyst.md
│   ├── client-psychologist.md
│   ├── whatsapp-sales.md
│   ├── reel-scriptwriter.md
│   ├── tiktok-hook-writer.md
│   ├── landing-copywriter.md
│   ├── ui-ux-advisor.md
│   ├── retention-strategist.md
│   ├── progress-analyst.md
│   └── feature-planner.md
│
├── systems/               ← Orchestration glue
│   ├── orchestration.md       ← How requests flow through the OS
│   ├── delegation-rules.md    ← Trigger → agent map
│   ├── workflow-chains.md     ← Named multi-agent flows
│   └── retention-playbook.md  ← Doctrine for client retention
│
├── templates/             ← Reusable output schemas + prompt fragments
│   ├── output-schemas.md      ← Every output shape defined
│   ├── prompt-fragments.md    ← §VOICE-CHECK, §UNCERTAINTY, §SAFETY, etc.
│   ├── checkin-report.md      ← Bilan report template
│   ├── reel-script.md         ← 30s reel template
│   └── progress-summary.md    ← Progress summary template
│
├── brand/                 ← Voice + visual + philosophy
│   ├── philosophy.md          ← Coaching doctrine
│   ├── voice.md               ← How to sound
│   ├── visual.md              ← How to look
│   └── glossary.md            ← Internal vocabulary
│
├── automation/            ← Time + event triggers
│   ├── cron-recipes.md        ← Time-based automation
│   ├── event-triggers.md      ← Data-driven triggers
│   └── chains.md              ← Concrete automation cookbooks
│
└── client-data/           ← Per-client folders (gitignored)
    ├── INDEX.md               ← Active client list (you maintain)
    ├── SCHEMA.md              ← Folder structure spec
    └── .gitkeep               ← Keeps folder in git
```

## How it works (1-minute version)

1. **You sit in Claude Code's main thread.** That's the orchestrator.
2. **You delegate** to one of the 12 subagents using the `Agent` tool. Each one has a tight role.
3. **Outputs are structured** — every agent emits a defined schema (see `templates/output-schemas.md`). No prose dumps.
4. **You review every output** before any client sees anything. Agents draft. You ship.
5. **Multi-step work** runs as named chains (see `systems/workflow-chains.md`). One step at a time, validated between each.
6. **Automation** can fire chains on schedule (Monday triage) or on events (bilan submitted). Always with a coach-approval gate before client-facing actions.

## Coaching philosophy in 6 lines

1. Adherence > optimization
2. Psychology drives results
3. Premium, not bro
4. Simple is intelligent
5. Tu, not vous
6. No bodybuilding clichés

Full doctrine: `brand/philosophy.md`. Every agent enforces these.

## What this system is good at

- Saving 5+ hours per week on Monday morning bilan triage
- Drafting check-in replies that sound like you
- Spec'ing features before you build them (so you build fewer wrong ones)
- Translating client data into testimonial-ready stories
- Generating week-long content prompts from real client wins
- Keeping the brand voice consistent across surfaces

## What this system is NOT

- Autonomous. It never sends, posts, or publishes without you.
- A replacement for the coach-client relationship. It prepares; you show up.
- A medical / therapeutic system. ED, depression, self-harm signals → human-only response.

## Best practices

1. **Read `CLAUDE.md` once a month.** Update it as the business evolves.
2. **One agent per role.** Never merge. If a task feels like two agents, split it.
3. **Outputs are schemas, not prose.** If an agent drifts, point it back to its schema file.
4. **Review every draft.** Especially client-facing. The 95% case is fine; the 5% case isn't.
5. **Save points are explicit.** Don't let agents write to `client-data/` unless you said "save this".
6. **Update agent files as you learn.** When you correct an agent twice for the same thing, the agent file is wrong — fix it once.
7. **Version control everything except `client-data/`.** The `.gitignore` handles this.
8. **Run chains, not one-offs.** A weekly bilan triage as one chain beats 12 ad-hoc requests.

## Scaling to the app

The HTML coaching app at `/Users/mac/Downloads/coach-sammy/coach_sammy_v7 (2).html` is the user-facing surface. The AI-OS is the back office.

When you want a new app feature:
1. Run `feature-planner` on the idea → get a spec
2. If small (S/M), Claude Code main thread edits the HTML directly
3. If larger, the spec becomes the brief for a focused build session
4. `ui-ux-advisor` reviews before / `landing-copywriter` writes copy as needed

Backend extensions (new tables, new Edge Functions, mobile wrappers) follow the same pattern: spec first, then build.

## Where to start

If this is your first session:

1. Read `CLAUDE.md` (the root memory file)
2. Read `brand/philosophy.md` and `brand/voice.md` (so you know what you're enforcing)
3. Skim `agents/INDEX.md` and pick ONE agent to try
4. Run a single invocation end-to-end. Read the output. Note where the agent fell short. Update the agent file.

After your 5th invocation, the system starts paying for itself.

## Maintenance

- **Monthly**: re-read `CLAUDE.md`. Update any business-facts that drifted.
- **Quarterly**: review each agent file. Add new "do NOT" rules from failures you saw.
- **As-needed**: add new agents only when you have repeated requests that don't fit existing roles. New agent template in `agents/INDEX.md` § "Adding a new agent".

## Credits

Built for Coach Sammy by Claude (Opus 4.7) via Claude Code, on 2026-05-20. Iterate freely.
