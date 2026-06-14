# Glossary

Internal vocabulary. Agents read this to stay consistent.

## Client lifecycle

| Term | Meaning |
|---|---|
| **Lead** | Anyone in the WhatsApp inbox who hasn't paid |
| **Programme seul** | Bought the program only, no weekly check-ins (`client_type = 'programme'`) |
| **Coaching client** | Paid for the full 1-/2-/3-/6-month plan (`membership_tag ∈ {1month,2months,3months,6months}`) |
| **Online client** | Long-distance unlimited (`membership_tag = 'online'`) |
| **Ghost** | Active client, no check-in in 7+ days |
| **Expiring** | Membership ends in ≤ 7 days |
| **Phase 1 / 2 / 3** | Internal program progression: foundation / build / peak |

## Data terms

| Term | Source | Notes |
|---|---|---|
| **Check-in** | `daily_logs` row | Daily — weight, calories, protein, steps, training_done |
| **Bilan** | weekly check-in fields on `daily_logs` (energy, feel, note) | Submitted Sunday |
| **Compliance score** | derived 0–100 | calOk + protOk + stepOk + trainOk, each 25 pts |
| **Streak** | consecutive check-in days | 1-day grace if today not yet logged |
| **Perfect week** | 7/7 days logged AND each had training OR menu hit | |
| **PR** | new max `weight_kg` for an exercise in `exercise_logs` | First log per exercise is baseline, not a PR |
| **Hero event** | journey timeline weight `hero` — full card | vs `standard` (compact row) |

## Coaching jargon (FR primary)

| FR | EN | AR | Meaning |
|---|---|---|---|
| Surcharge progressive | Progressive overload | الحمل التدريجي | Adding weight/reps over time |
| Recomp | Recomposition | إعادة التشكيل | Losing fat while gaining muscle |
| Sèche | Cut | تنشيف | Fat-loss phase |
| Prise de masse | Bulk / mass gain | زيادة الكتلة | Muscle-gain phase |
| Phase d'entretien | Maintenance | مرحلة المحافظة | Calorie-neutral phase |
| Déload | Deload | تخفيف الحمل | Lower-intensity recovery week |

## Banned in client copy

(See `brand/philosophy.md` §5 for the full list — quick reminders)

- shred, gains, beast, crush, grind
- sick, insane, epic, legendary
- "Let's go", "no pain no gain"
- Multiple exclamation marks
- Emojis in body copy (allowed in headers/notifications only)

## Internal codes

- `_cpState` — coach client profile state (in app)
- `CC` — current client (client portal)
- `CG` — current client goals
- `coachClients` — all clients loaded for coach dashboard
- `journey-event` types: `genesis | pr | streak | perfect_week | weight | photo | coach | volume`
