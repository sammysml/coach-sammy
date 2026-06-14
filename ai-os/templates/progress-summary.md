# Progress Summary Template

What `progress-analyst` ships after analyzing one client's window. Used in monthly reviews, retention triggers, and as input to landing-page testimonials (with explicit client permission).

```markdown
# Progrès — {client_name} · {window_label}

## Headline
{one sentence ≤ 16 words. The single most important fact.}

## Numbers (only those that moved)

| Metric | Start | Now | Delta |
|---|---|---|---|
| Poids | {kg} | {kg} | {±kg} {↘/↗/→} |
| Compliance moy. | {%} | {%} | {±%} |
| Séances totales | — | {n} | — |
| PRs | — | {n} | — |
| Semaines parfaites | — | {n} | — |

(Drop rows that didn't move. Never show a row of zeros for vanity.)

## What changed in behavior
{≤ 100 words. Translate the data into actions taken. Examples:
- "Tu t'es engagé sur 3 séances/semaine sans rater une seule semaine."
- "Tu logges ton poids 6 jours sur 7 — c'est ce qui te donne la lecture précise."}

## What didn't move (and why)
{≤ 60 words. Honest. If something stalled, name the likely cause.}

## Next lever
{≤ 20 words. The one thing to push next.}

## Client-facing version (FR/EN/AR)

**FR**
{rewritten in 2nd person familiar, ≤ 80 words, shareable}

**EN**
{same content}

**AR**
{same content}

## Shareability flag
- [ ] Client has given explicit permission to use this on social/landing
- [ ] Anonymized version drafted at: {path}
```

## Headline patterns

Strong:
- "10 séances en 4 semaines, première fois en 2 ans."
- "−4 kg sans une seule semaine en dessous de 80% de compliance."
- "Plateau de 6 semaines cassé après ajustement glucides."

Weak:
- "Bonne progression ce mois-ci." (vague)
- "Plein de PRs cette semaine!" (banned tone + no specifics)
- "Tu fais du bon travail." (no signal)

## Window choice

| Window | When to use |
|---|---|
| `7d` | Weekly check-in context, immediate feedback |
| `30d` | Monthly review, retention triggers |
| `90d` | Phase transition, contract renewal conversations |
| `all-time` | Testimonial draft, milestone celebrations |

## Privacy

- Never include `client_id` in any client-facing or shareable version.
- Photos referenced by ID only in private notes; URLs only used in the journey rendering (not in shareable copy).
- "Shareable" = client has signed off in writing.
