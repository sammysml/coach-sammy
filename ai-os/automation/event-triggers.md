# Event Triggers

Reactive automation. Fired by data changes, not the clock.

## Architecture

These triggers depend on Supabase realtime channels OR webhook endpoints. They wake the orchestrator with a specific event payload, which then dispatches the right chain.

```
Supabase (postgres_changes / webhook)
            │
            ▼
   ┌─────────────────────┐
   │ Event router (small  │
   │ Edge Function or     │
   │ local listener)      │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │ Claude orchestrator  │  ← invokes appropriate chain
   └─────────────────────┘
              │
              ▼
         agents / chains
```

## Triggers

### NEW_CLIENT_CREATED
- Event: `clients` row inserted with `status = 'active'`
- Chain: `NEW_CLIENT_ONBOARDING`
- Latency: within 1 hour (intake form may still be filling in fields)
- Coach approval gate: after step 1 and step 2

### BILAN_SUBMITTED
- Event: `daily_logs` row updated where `weekly_checkin_done = true`
- Chain: `WEEKLY_CHECKIN_TRIAGE` (single-client mode, not batch)
- Latency: within 4 hours (don't fire on every save)
- Coach approval gate: before sending the coach_message to the client

### CLIENT_MESSAGE_RECEIVED
- Event: `client_comments` insert with `sender = 'client'` AND `is_read = false`
- Chain: no automated draft. Just notify the coach. (Auto-replies are too risky.)
- Exception: if the message is identified by NLP as a simple acknowledgment ("merci", "ok"), no notification — let it pass.

### GHOST_THRESHOLD_CROSSED
- Event: derived — client hasn't had a `daily_logs` row for 5 days AND status = 'active' AND membership_tag in coaching tiers
- Chain: AT_RISK_DEEP_DIVE (step 1 only — progress-analyst → flag for coach)
- Latency: daily check (see EXPIRY_RADAR cron)

### PR_LOGGED
- Event: `exercise_logs` insert where `weight_kg` exceeds previous max for that exercise + client
- Action: notification to coach. Optional micro-celebration message draft for `whatsapp-sales` to use in mid-cycle engagement.
- No chain — just a friendly heads-up.

### MEMBERSHIP_EXPIRING_3_DAYS
- Event: client where `membership_expiry` is in [today+3, today+1]
- Chain: lightweight — `progress-analyst` 30d report drafted, ready for renewal conversation
- No automated client message. Coach has the renewal conversation.

### MEMBERSHIP_EXPIRED_AND_INACTIVE
- Event: `membership_expiry < today` AND status still 'active'
- Action: orchestrator flags the row for coach to manually update status (no auto-deactivation)
- Reason: don't surprise clients with sudden access loss; coach handles transitions

### PHOTO_UPLOADED
- Event: `client_photos` row inserted
- Action: light — `progress-analyst` updates the per-client journey context. Photo is added to potential testimonial pool (with consent flag default false).
- No chain — just metadata enrichment.

### NEGATIVE_SIGNAL_IN_BILAN_NOTE
- Event: NLP scan of new `weekly_note` flags any of: ED keywords, self-harm keywords, severe depression keywords (see `§SAFETY` in `templates/prompt-fragments.md`)
- Chain: NONE — auto-page the coach via push / email
- Critical: this trigger bypasses all queues. Coach responds personally within 24h.

## What does NOT trigger a chain

- Every check-in. Daily logs are high-volume; only weekly bilans trigger analysis.
- Every page view / app open. UI telemetry is noise.
- Every photo upload (only the metadata layer above).
- Every message read receipt.

If a trigger seems useful but its expected volume is high, default to "batch in the next cron run" rather than "fire immediately".

## Implementing the listener

Recommended stack:
- **Supabase Edge Function** for the actual event subscription (postgres_changes)
- **POST** to a small endpoint on a coach-owned server (e.g. a Mac mini running `node` listener)
- That endpoint writes to a queue (a JSON file or a SQLite table)
- A cron job (every 5 min) drains the queue by invoking Claude headless with the event payload

This avoids:
- Tying Claude invocations directly to webhook latency
- Burning tokens on noisy events
- Race conditions where two triggers fire near-simultaneously for the same client

## Safety gates on event triggers

Every event-triggered chain MUST:
1. Pass through `§SAFETY` scan before any output is produced
2. Save outputs to disk WITHOUT sending anything to clients
3. Notify the coach when outputs are ready
4. Never modify production Supabase data except for read-only flags (e.g. `is_read = true` on messages the coach has reviewed)

Anti-pattern: a `BILAN_SUBMITTED` trigger that auto-sends the drafted coach_message. Forbidden.
