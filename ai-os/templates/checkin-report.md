# Check-in Report Template

The shape `checkin-analyst` produces for every weekly bilan. Saved at `client-data/<client-id>/checkins/<week-start>.md`.

```markdown
# Bilan — {client_name} · {week_start} → {week_end}

## Headline
{one sentence — the most important thing this week}

## Compliance
- Check-ins: {n}/7
- Training: {n}/7 days done
- Menu respecté: {n}/7 days
- Score moyen: {pct}%

## Weight
- Début semaine: {kg}
- Fin semaine: {kg}
- Delta: {±kg} ({trend symbol})
- 4-week trend: {↘ / → / ↗}

## What the data says
{≤ 100 words. Translate numbers into behavior. Avoid jargon.}

## Flags
{0–3 bullets, each a single short phrase}

## Coach response — to send to client
**FR**
{80–140 words. Voice-rules compliant. Identity language.}

**EN**
{same content, same tone}

**AR**
{same content, same tone, RTL friendly}

## One focus next week
{≤ 12 words. The single non-negotiable.}

## Coach private notes (not shown to client)
{≤ 60 words. Things to remember: stress mentioned, life event, etc.}
```

## Filling rules

- **Headline** is the *thing*, not a summary. Examples:
  - ✅ "Première semaine sous 75 kg en 4 mois."
  - ✅ "Deux jours sautés — investiguer le travail."
  - ❌ "Cette semaine a été bonne." (vague, no signal)

- **Flags** are facts, not opinions. Examples:
  - "3 check-ins manqués (jeu, ven, sam)"
  - "Énergie 4/10 deux jours d'affilée"
  - "Calories +400 sur jours d'entraînement uniquement"

- **One focus** beats five suggestions. If the client failed nutrition AND training AND sleep, pick the one that unlocks the others.

- **Private notes** stay in the file. NEVER appear in the message draft.
