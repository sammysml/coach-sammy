# Orchestration

How requests flow through the AI-OS. The orchestrator is the human coach in Claude Code's main thread. Subagents are delegated to via the `Agent` tool. Subagents never call each other directly — chains are coordinator-driven.

## Model

```
                          ┌─────────────────────────────┐
                          │     Human coach (Sammy)     │
                          │  in Claude Code main thread │
                          └──────────────┬──────────────┘
                                         │
                                  decides what to do
                                         │
                          ┌──────────────▼──────────────┐
                          │      ORCHESTRATOR LAYER     │
                          │ (Claude main thread, no SA) │
                          │  - reads inputs             │
                          │  - picks agent              │
                          │  - passes structured prompt │
                          │  - validates output         │
                          │  - chains if needed         │
                          └──────────────┬──────────────┘
                                         │
                         delegates via Agent tool
                                         │
            ┌───────────┬─────────────┬──┴──────────┬─────────────┐
            ▼           ▼             ▼             ▼             ▼
       meal-plan   training-     checkin-      retention-    progress-
       architect   program-      analyst       strategist    analyst
                   architect
            (and 7 more — see agents/INDEX.md)
```

## What the orchestrator does

1. **Receive** — coach types a request or an automation fires
2. **Disambiguate** — if input is too fuzzy, ask one clarifying question before delegating
3. **Pick agent** — match request to delegation rules (`systems/delegation-rules.md`)
4. **Prepare context** — pull the right files (client data, prior reports) and pass paths, not contents-by-default. Pass only structured inputs.
5. **Delegate** — invoke `Agent` tool with the subagent name + structured prompt
6. **Validate** — check that output conforms to the agent's declared schema. Reject and re-invoke if not.
7. **Chain** — if the workflow requires it, delegate to the next agent (see `systems/workflow-chains.md`)
8. **Surface** — show the coach the result. Save to disk only when the coach says "save this".

## What subagents do NOT do

- Call other subagents directly. Hand-offs go via the orchestrator.
- Write to `client-data/` without explicit "save this" instruction.
- Read random files. Each agent declares the files it needs in its frontmatter / role section.
- Speak in conversational fluff. Outputs are structured per their declared schema.

## Context discipline

The orchestrator owns context. Subagents are stateless — every invocation includes everything they need. This means:

- Pass full structured inputs every call (not file paths the agent has to read, unless explicit)
- Don't assume agents remember prior conversation
- For multi-step chains, the orchestrator carries state between steps

Why: subagents that read random files become unpredictable. Subagents that receive complete inputs are testable.

## Agent invocation pattern

In the Claude Code main thread:

```
Agent({
  subagent_type: "checkin-analyst",
  description: "Bilan analysis — Yasmine — week 2026-05-13",
  prompt: """
  Analyze this weekly bilan and produce checkin-analysis-v1.

  Client:
    id: 343d2ddc-9b6b-4a80-ac69-dcce65663b57
    name: Yasmine
    goal: Perte de gras
    phase: Phase 1
    start_weight: 78
    current_weight: 74.8
    target_weight: 60

  Targets:
    kcal_training: 1500
    kcal_rest: 1500
    protein_g: 120
    step_goal: 8000

  Daily logs (Mon → Sun):
    [paste the 7 rows here as YAML]

  Weekly bilan:
    energy: 7
    feel: "Sortie samedi, +800kcal. Sinon ok."
    note: ""

  Emit only the checkin-analysis-v1 block. Apply §SAFETY, §LANGUAGE-PARITY.
  """
})
```

## Validation gates

After every agent invocation, the orchestrator runs these checks:

1. **Schema conformance** — does the YAML match the declared schema fields?
2. **Voice rules** — does any client-facing string contain banned words? (Run a grep mentally for: `shred / crush / grind / gains / let's go / massive / sick / insane / epic / 💪 / 🔥`)
3. **Identity language** — does the coach_message use "tu" form throughout?
4. **Safety** — if `§SAFETY` triggers fired, was the ESCALATION_REQUIRED block emitted and the coach pinged?
5. **No invention** — are all numerical claims traceable to inputs?

If any gate fails, the orchestrator re-invokes with a corrective prompt: "Your last output failed gate X. Specifically: <quote the violation>. Re-emit."

## Chain rules

Chains are explicit, not implicit. Each chain is a named workflow in `systems/workflow-chains.md`. The orchestrator carries state between steps.

Anti-pattern (forbidden):
> Subagent A finishes, then directly calls subagent B.

Pattern (allowed):
> Subagent A finishes. Orchestrator inspects output. Orchestrator invokes subagent B with A's output as input.

This keeps chains debuggable — every step has a visible inspection point.
