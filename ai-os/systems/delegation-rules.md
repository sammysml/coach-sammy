# Delegation Rules

What gets routed where. When in doubt, the orchestrator (human) decides — these are defaults.

## Trigger → agent map

| Trigger | Primary agent | Possible chain |
|---|---|---|
| "Build a meal plan for client X" | `meal-plan-architect` | → `retention-strategist` if X has adherence flags |
| "Build a training program for X" | `training-program-architect` | → `meal-plan-architect` to align kcal targets |
| Weekly bilan arrives in Supabase | `checkin-analyst` | → `client-psychologist` if `stress-spike` / `ghost-risk` flagged twice in a row |
| "What's going on with client X?" (qualitative) | `client-psychologist` | → `retention-strategist` if amber/red |
| Lead form submission (new) | `whatsapp-sales` (intent: `first-touch`) | — |
| Existing DM thread, lead replied | `whatsapp-sales` (intent: `qualifying` or `objection-handling`) | — |
| Lead silent 7+ days | `whatsapp-sales` (intent: `reactivation`) | — |
| "Write a reel about X" | `reel-scriptwriter` | from a `tiktok-hook-writer` recommendation |
| "Give me hooks for topic X" | `tiktok-hook-writer` | → `reel-scriptwriter` for the picked hook |
| "Rewrite the hero section" / landing edit | `landing-copywriter` | → `ui-ux-advisor` if layout change implied |
| "Is screen X confusing?" / UX review | `ui-ux-advisor` | → `feature-planner` if findings imply new features |
| Client at risk (multiple ghost weeks / low compliance / expiry near) | `retention-strategist` | reads `client-psychologist` briefing if exists |
| "How is client X doing?" / monthly review | `progress-analyst` | → `client-psychologist` if data is flat/declining |
| "Pre-contract renewal report for X" | `progress-analyst` (window: `90d`) | — |
| "What should we build next?" / backlog triage | `feature-planner` | — |
| Vague idea ("we should improve onboarding") | `feature-planner` (asks for concrete moment) | — |

## When NOT to delegate

These stay with the human coach in the main thread:

- **One-line replies** to clients you already know what to say to. Don't run them through `checkin-analyst`.
- **Quick fixes** to the app file (CSS tweak, typo). Don't spec via `feature-planner`.
- **Conversations** with clients. Subagents draft, the coach speaks.
- **Anything emotional** that AI can't read (a long voice note from a struggling client, a complex personal context). Bring `client-psychologist` in for the briefing, not for the response.
- **Anything with `§SAFETY` triggers** — the human coach takes over fully.

## When MULTIPLE agents apply

Pick the one closest to the surface:

- "Write me a check-in reply" → `checkin-analyst` (it includes a coach_message draft)
- "Why is this client ghosting?" → `client-psychologist` (briefing) THEN `retention-strategist` (action), not both at once
- "Hero section needs work and the visual feels off" → `landing-copywriter` for copy, `ui-ux-advisor` for visual. Two separate invocations, not one merged call.

## Tool access by agent (defaults)

| Agent | Read | Write | Edit | Bash | Grep/Glob |
|---|---|---|---|---|---|
| meal-plan-architect | ✓ | ✓ | — | — | — |
| training-program-architect | ✓ | ✓ | — | — | — |
| checkin-analyst | ✓ | ✓ | — | — | — |
| client-psychologist | ✓ | ✓ | — | — | — |
| whatsapp-sales | ✓ | — | — | — | — |
| reel-scriptwriter | ✓ | ✓ | — | — | — |
| tiktok-hook-writer | ✓ | — | — | — | — |
| landing-copywriter | ✓ | ✓ | ✓ | — | ✓ |
| ui-ux-advisor | ✓ | — | — | — | ✓ |
| retention-strategist | ✓ | ✓ | — | — | — |
| progress-analyst | ✓ | ✓ | — | — | — |
| feature-planner | ✓ | — | — | — | ✓ |

Rules of thumb:
- **No agent gets Bash** by default. If automation needs shell, the orchestrator runs it.
- **Only `landing-copywriter` gets Edit** — and only on the specific landing section of the HTML file. Reviewed before each invocation.
- **Read access is universal** so agents can hydrate from `brand/`, `templates/`, and (where authorized) `client-data/`.

## Rejection rules — when the orchestrator pushes back

The orchestrator REJECTS and re-invokes when:

- Output doesn't match declared schema
- Voice rules violation in client-facing strings
- Numerical claim with no source in inputs
- `§SAFETY` trigger present but no ESCALATION_REQUIRED block emitted
- Length budget exceeded (e.g. coach_message > 140 words)
- French is wrong/awkward (defaults are FR; if the agent stumbles, regenerate)

If an agent fails the same gate twice in a row, switch to manual mode — write the output yourself and update the agent file to make the rule more explicit.
