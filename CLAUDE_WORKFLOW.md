# Coach Sammy — App Workflow Reference

A working reference for editing `coach_sammy_v7 (2).html` safely. Everything is in a single HTML file with inline `<style>` and `<script>` blocks, backed by Supabase.

> Line numbers in this doc are approximate — the file gets edited frequently. Use `grep -n` to find the current location of a function.

---

## 1. Big picture

- **Single-file SPA** (~8000+ lines). No build step.
- **Two portals share the same DOM** — show/hide screens by toggling `display`:
  - **Client portal** — `#client-screen` (Home, Journal, Plan, Progrès, Communauté, Moi tabs)
  - **Coach portal** — `#coach-screen` (dashboard with client list, then per-client detail page)
- **Backend**: Supabase (Postgres + Storage + Auth-by-password-on-clients-row).
- **Global Supabase client**: `sb` (created near the top of the script block).

---

## 2. Where things live in the file

| Section            | Approx. range | What's there                                     |
|--------------------|---------------|--------------------------------------------------|
| `<style>` block    | ~30–680       | All CSS. Watch for `.coach-hdr-*`, `.client-card`, `.photo-grid`, `.sum-table`, `.btn-*`. |
| HTML markup        | ~700–1770     | Landing, modals, screens, tab containers, fixed overlays (`#coach-revenue-view`, `#coach-compliance-view`, `#coach-claude-notes-view`, `#coach-settings-view`, `#coach-drilldown-view`, `#coach-today-view`, plus the `#coach-nudge-modal` modal-bg). |
| Translations       | ~1800–1900    | `T('key','fallback')` lookups; FR/EN/AR dictionaries. |
| Module state       | ~1782         | `coachClients`, `curCId`, `coachTab`, `editCId`, `lastCheckinByClient`, `activeSegment`, `activeFilter`, etc. |
| Client renderers   | ~2900–4400    | `rHome`, `renderProgressView`, `rPhotos`, `renderCheckin`, etc. |
| Coach renderers    | ~5400–7900    | Dashboard, client list, detail tabs, compliance, revenue. |
| AI program / misc  | ~7900–end     | Program generation, exports, modals helpers.     |

---

## 3. Module-level state (don't break)

| Variable               | Meaning                                                 |
|------------------------|---------------------------------------------------------|
| `CC`                   | Currently logged-in client object (client portal).      |
| `CG`                   | Macro/goal targets derived from `CC`.                   |
| `coachClients`         | Array of all clients loaded by `loadCoachDash()`.       |
| `curCId`               | Client id currently open in the coach detail view.      |
| `coachTab`             | Index of the active tab on the coach detail page.       |
| `editCId`              | Client id being edited in the client form modal.        |
| `lastCheckinByClient`  | `{client_id: log_date}` — populated on coach load, used in cards & ranking. |
| `streakByClient`       | `{client_id: consecutive-days-back-from-today}` — built in `loadCoachDash` from the same `daily_logs` fetch (no extra round-trip). 1-day grace if today not yet logged. |
| `activeSegment`        | `'all' | 'coaching' | 'programme'` — segment chip.      |
| `activeFilter`         | Current sub-filter label (e.g. `'Actifs'`, `'🚩 Signalés'`, `'Tous'`). |
| `_nudgeCtx`            | `{clientId, context}` — selected client + template bucket (`'ghosts'`, `'compliance'`, `'checkins'`) for the active nudge modal. |
| `_isNightTheme`        | Cached last-applied state for `applyTimeTheme()` (`true` / `false` / `null` first run). |

Mutating these directly is normal in this codebase — most renderers read from them rather than receiving them as args. If you add a feature, prefer adding **another** state variable rather than overloading existing ones.

---

## 4. Major functions — what each does

### Client portal (`CC` is the logged-in client)

| Function                | Role                                                                        |
|-------------------------|-----------------------------------------------------------------------------|
| `rHome()`               | Renders the Home tab: streak, weight progress, weekly summary, coach diagnostic, coach note, upsell banner (programme → coaching). |
| `renderCheckin()`       | Daily check-in form for a chosen date.                                      |
| `saveDL(dateISO)`       | Inserts/updates a row in `daily_logs` and notifies the coach.               |
| `setProgressView(v)`    | Switches Progrès sub-tab between `weight | measurements | records | photos`.|
| `renderWeightProgress`, `renderMeasurements`, `renderRecords`, `rPhotos` | Sub-views called by `renderProgressView()`. |
| `uploadPhoto(input)`    | Uploads to Supabase Storage `client-photos`, inserts into `client_photos`.  |
| `openPhotoCompare()`    | Two-step overlay: pick 2 photos → side-by-side view (purely client-side).   |
| `getStreak()`           | Computes current/best check-in streak.                                      |

### Coach portal

| Function                                 | Role                                                        |
|------------------------------------------|-------------------------------------------------------------|
| `loadCoachDash()`                        | Fetches `clients` + recent `daily_logs`, builds `lastCheckinByClient`, then `renderCoachDash()`. |
| `renderCoachDash()`                      | Builds the dashboard shell (action panel, segment chips, filter bar, search, client list). |
| `renderClientList(clients)`              | Pure renderer that turns an array of clients into card HTML. |
| `setSegment(seg, btn)` / `filterClients(btn, filter)` / `searchClients(q)` | Update `activeSegment` / `activeFilter` and re-render via `applyClientFilters()`. |
| `getSegmentedClients()`                  | Returns `coachClients` filtered by `activeSegment`.         |
| `applyClientFilters()`                   | Applies `activeFilter` on top of segment, re-renders the list. **Always call this after mutating `coachClients`.** |
| `openCoachClient(id)` / `backToCoachList()` | Show/hide the per-client detail page.                    |
| `loadCoachTab(idx, id, btnEl)`           | Switches between the **4 collapsed detail tabs** (Aperçu / Suivi / Messages / Progression). Auto-normalizes legacy 4–8 indices via `mapTabIndex` as a safety net. See §18. |
| `mapTabIndex(old)`                       | Maps the legacy 0–8 tab indices to the new 0–3 range. Defined right next to `COACH_TAB_IDX` (line ~2155). See §18. |
| `renderCoachApercuTab / SuiviTab / Messages / ProgressionTab` | Composers for the 4 new tabs — they `await` and concatenate the original section renderers. |
| `renderCoachOverview / Tracking / Sessions / MealPlan / Messages / Compliance / Progression / Exchange / Diagnostic` | One renderer per old section. Still used; composed by the new tab renderers. **Don't rewrite — compose.** |
| `toggleCoachDiagPanel()`                 | Toggles the collapsible Diagnostic card inside the new Aperçu tab. |
| `showRevenueView()`                      | Fullscreen overlay `#coach-revenue-view`: MRR tiles, plan breakdown, expiry alerts. |
| `showComplianceRanking()`                | Fullscreen overlay `#coach-compliance-view`: per-client 7-day score + last-activity column. Also reachable by clicking the "Compliance moy." stat tile. |
| `showDrilldown('ghosts' | 'checkins')`   | Fullscreen overlay `#coach-drilldown-view`: lists the clients behind the "Check-ins" or "👻 0 check-in" stat tile, sorted appropriately. Pure client-side filter on `coachClients` + `lastCheckinByClient` — no Supabase round-trip. |
| `renderDrilldownList(kind)`              | Builds the rows for the drill-down (per-row Voir + 📣 Alerter buttons).  |
| `openNudgeModal(clientId, context)` / `applyNudgeTemplate(idx)` / `sendNudge()` | WhatsApp nudge modal (`#coach-nudge-modal`). Templates live in the module-scope `COACH_NUDGE_TEMPLATES` keyed by context (`'ghosts'`, `'compliance'`, `'checkins'`). `sendNudge` opens `https://wa.me/{digits}?text={URL-encoded}` in a new tab — **pure outbound link, no Supabase write**. Disables the send button if the client has no `whatsapp` on file. |
| `showCoachToday(opts)`                   | Fullscreen overlay `#coach-today-view`: unified daily action list (5 sections — see §13). `opts.section` (1–5) scrolls to a specific section. Reachable from the **📋 Aujourd'hui** entry card on the dashboard and from all three Stats Semaine tiles. |
| `renderCoachToday()`                     | Builds the 5 cards inside `#coach-today-content`. Reads `coachClients` + `lastCheckinByClient` synchronously and uses the `_coachTodayFetchAsync` cache for the two queried sections. |
| `refreshCoachTodayCount()`               | Recomputes total + paints both the dashboard entry-card badge (`#today-entry-count`) and the overlay subtitle (`#coach-today-total`). Auto-runs on dashboard render and on overlay close. Call this after any flow that mutates one of the five sections (e.g. marking a message read). |
| `showCoachInbox()`                       | Coach ↔ client message inbox.                              |
| `showCoachCommunity()`                   | Community feed management (pin/delete posts).              |
| `showBroadcast()` / `openGroupMsg()`     | Broadcast announcements / WhatsApp group messages.         |
| `toggleClientFlag(id)`                   | Optimistic update of `clients.needs_attention`. Re-applies filters. |
| `openClientInvoice(id)`                  | `window.open()` + `document.write()` printable invoice.    |
| `openAddCoachClient()` / `openEditCoachClient(id)` / `saveCoachClient()` | CRUD on the client form modal `#m-client-form`. |
| `parseClientPaste()` / `_parseClientText(text)` | "Coller un profil" extractor for the new-client modal. **Local regex/keyword parser — no API call, no `fetch`, no key.** Pulls name, whatsapp, goal, weight, target_weight, height, age, kcal_training, kcal_rest, protein_g, sessions_per_week, injuries, phase. Single-calorie fallback: if only one kcal value is found, it's stored as `kcal_training` and `kcal_rest = round(value * 0.85)`. Empty extraction → inline error in the paste modal; ≥1 field extracted → success message in `#cf-err` showing the count. |
| `coachLogout()`                          | Clears coach session and returns to landing.               |

---

## 5. Supabase tables

| Table                  | Used by                                                 | Notable columns                                                                                  |
|------------------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `clients`              | Both portals — the row IS the client account            | `name`, `whatsapp`, `password`, `status`, `client_type` (`coaching | programme`), `membership_tag`, `membership_expiry`, `membership_active`, `weight`, `target_weight`, `height`, `age`, `gender`, `phase`, `kcal_training`, `kcal_rest`, `protein_g`, `step_goal`, `goal`, `current_weight`, `start_weight`, `last_login`, `last_compliance_score`, `needs_attention` (bool, added later), **`last_seen_at` (timestamptz, added later — see §14)**, **`show_on_leaderboard` (bool default true, added later — see §15)** |
| `daily_logs`           | Check-ins, Tracking, Compliance ranking                 | `client_id`, `log_date`, `calories_eaten`, `protein_eaten`, `steps`, `training_done`, `body_weight`, `day_type`, `weekly_checkin_done`, `weekly_energy`, `weekly_feel`, `weekly_note`, `coach_notes` |
| `weight_logs`          | Weight progress chart                                   | `client_id`, `weight`, `logged_at`                                                              |
| `client_photos`        | Progress photos + compare                               | `client_id`, `url`, `note`, `created_at`                                                        |
| `food_logs`            | Coach food log view                                     | `client_id`, `log_date`, `meal_type`, `food_name`, `quantity`, `calories`, `protein`            |
| `intake_forms`         | Bilan card (Aperçu tab)                                 | Lifestyle answers — sleep, stress, water, etc.                                                  |
| `training_sessions`    | Séances / training program                              | `client_id`, exercise rows                                                                       |
| `full_programs`        | Coach `+ Programme` paste & AI generator                | `client_id`, `content` (text)                                                                    |
| `diagnostics`          | Diagnostic Global card on Home                          | `client_id`, `content`, `updated_at`                                                             |
| `posts`, `post_reactions` | Community feed                                       | `is_pinned`, `client_id`, `emoji`                                                                |
| `client_comments`      | Coach ↔ client thread                                   | `client_id`, `sender` (`coach | client`), `body`, `is_read`                                      |
| `notifications`        | Client-side notifications                               | `client_id`, `type`, `title`, `body`, `is_read`                                                  |
| `coach_notifications`  | Coach inbox 🔔                                           | `type`, `title`, `body`, `is_read`                                                               |
| `ai_recommendations`   | AI suggestions surfaced on Home                         | `status` (`approved | pending`)                                                                  |
| `claude_notes`         | **NEW** — coach's working notes (added with this doc)   | `id`, `title`, `notes`, `priority`, `status`, `created_at`                                       |
| `voice_notes`          | Coach 🎙 voice notes for clients (see §17)              | `id`, `client_id`, `audio_url`, `duration_seconds`, `created_at`                                |
| `landing_config`       | Landing-page editor (`showLandingEditor`)               | Single row (`id=1`) — hero text, stats, programs, social URLs                                    |
| `transformations`      | Landing transformations grid + admin (`renderLandTransforms` / `loadLandingTransforms`) | `client_name`, `stats`, `caption`, `photo_before_url`, `photo_after_url`, `is_client_of_month`, `created_at` |
| `testimonials`         | Landing testimonials grid + admin (`renderLandTestimonials` / `loadLandingTestimonials`) | `client_name`, `quote`, `result`, `is_visible`, `created_at`                                     |

### Storage

- **Bucket `client-photos`** — public URLs are generated via `sb.storage.from('client-photos').getPublicUrl(path)`. Filenames: `${client_id}/${timestamp}.${ext}`.

---

## 6. Where the domain code lives

### Diet / nutrition
- **Macro targets** — derived from `clients` columns (`kcal_training`, `kcal_rest`, `protein_g`) into `CG` on client load. Search `function rHome` and `g.calories`.
- **Daily intake logging** — `renderCheckin()` form; persisted by `saveDL()` to `daily_logs.calories_eaten / protein_eaten`.
- **Food log entries** — separate from daily totals: `food_logs` table, surfaced via `renderCoachFoodLogs(c)`.
- **Meal Plan tab** (coach side) — `renderCoachMealPlan()` and `renderCoachExchange()` (table d'échange).
- **Compliance scoring** — `(calOk + protOk + stepOk + trainOk) / 4`; appears in `rHome`, `renderCoachTracking`, and `showComplianceRanking`. Each uses 0.85–0.9 of target as the pass threshold; keep that consistent if you tweak.

### Training
- **Sessions** — `training_sessions` table. Coach renders via `renderCoachSessions(c)`.
- **Full programs** (free-form text) — `full_programs.content`. Pasted via the `+ Programme` modal, generated via `runGenFullProgram(c)`.
- **Training done flag** — `daily_logs.training_done` (boolean) drives streak + compliance.

### Supplements
- No dedicated supplements table. Supplement notes live inside `full_programs.content` (free text) or `diagnostics.content`. If you need structured supplements, add a new table — don't try to parse them out of the free text.

---

## 6.5 Date handling — local time, UTC, and `log_date`

The app runs in Algeria (UTC+1). Naive `new Date('YYYY-MM-DD')` parses as **UTC midnight**, and `d.toISOString().slice(0,10)` returns the **UTC date** — both can shift by a day vs the user's local calendar (negative "days since" values, future-dated rows, off-by-one weekly bilan windows).

### Canonical helpers (line ~1964)

| Helper                  | Returns                              | Use for                                                      |
|-------------------------|--------------------------------------|--------------------------------------------------------------|
| `toISO()`               | Today's local date as `YYYY-MM-DD`.  | **Canonical write-path for `log_date`.** Use everywhere a daily-log row is upserted/inserted. |
| `localISO(d)`           | An arbitrary `Date`'s local date as `YYYY-MM-DD`. | Bridging a derived `Date` (`since`, `lastMon`, `getWeekStart()`, etc.) to a `log_date` filter or display. |
| `parseDateLocal(iso)`   | A local-midnight `Date` from a `YYYY-MM-DD` string. | Subtracting/comparing `log_date` strings — e.g. "days since last check-in". |
| `fmtD(iso)`             | "D Mon" display string from `YYYY-MM-DD`. | Display only. Already splits the string without `new Date()`, so it's safe. |

### Banned patterns (for date-only fields)

- ❌ `new Date(row.log_date)` — parses as UTC midnight. Use `parseDateLocal(row.log_date)`.
- ❌ `someDate.toISOString().slice(0,10)` — UTC date string. Use `localISO(someDate)` (or `toISO()` if `someDate` is meant to be "today").
- ❌ Inserting `new Date().toISOString().slice(0,10)` into a `log_date` column — same UTC bug. Use `toISO()`.

### Datetime fields are fine

`membership_expiry`, `created_at`, `updated_at`, `logged_at`, `set_at`, etc. are full timestamptz values. `new Date(value)` parses them correctly with offset, so they don't need `parseDateLocal`.

### Always clamp "days since" to ≥ 0

Even with `parseDateLocal`, a future-dated `log_date` (data-entry mistake or test row) produces a negative diff. Clamp at the read site:
```js
const days = Math.max(0, Math.floor((today - parseDateLocal(row.log_date)) / 86400000));
```

### Polish helpers — `complianceRing`, `streakBadge`, `applyTimeTheme`, `haptic`

Defined in one block right after the `lastCheckinByClient` declaration (line ~1932). All are pure module-level helpers with no side effects beyond the documented one.

| Helper                          | Purpose                                                                                  |
|---------------------------------|------------------------------------------------------------------------------------------|
| `complianceRing(score, size=36)` | **Pure function** returning an SVG string — Apple-Watch-style arc. Color: `var(--grn)` ≥80, `var(--g)` ≥50, `var(--red)` <50, muted when score is `null`/missing. Centre label is `score%` or `—`. The foreground arc carries the class `.compliance-ring-fg` which has a CSS `ring-fill` keyframe (0.8s ease-out from full circumference to target offset, using inline custom properties `--ring-circ` / `--ring-target`). |
| `streakBadge(n)`                | Returns the inline HTML for a streak chip (next to client name on cards). 0–6 → empty string. 7–13 → `🔥 Nj`. 14–29 → `🔥🔥 Nj` slightly larger. 30+ → `🔥🔥🔣 Nj` bold + `text-shadow: 0 0 8px rgba(201,168,76,.5)` glow. |
| `streakByClient`                | Built in `loadCoachDash` from the existing `daily_logs` fetch (`limit 5000`). For each `client_id`, counts consecutive local-date strings back from today using `localISO()` — with a 1-day grace if today isn't yet logged. Approximate by design (capped at 60-day lookback, no extra fetch). |
| `applyTimeTheme()`              | Runs at boot and every 30 minutes (`setInterval`). When local hour ∈ [21, 6) the night palette is applied via `documentElement.style.setProperty('--bk' / '--s1' / '--s2' / '--s3' / '--tx' / '--g', …)`. Otherwise restores the daytime palette. The `html { transition: background-color 2s ease }` rule makes the shift gradual. The `_isNightTheme` cache prevents redundant DOM writes. Both palettes are stored as `_DAY_THEME` and `_NIGHT_THEME` constants next to the helper — copy-of-:root values, not a fork. |
| `haptic(pattern)`               | Wrapper around `navigator.vibrate` that no-ops if missing. **iOS Safari does not support `navigator.vibrate`**, so haptic is Android-only. Don't introduce visual/audio fallbacks — silent degradation is intentional. Wired sites: `saveDL` success (`[40,30,80]`), `closeM` (`20`), and a global delegated `.btn-gold` click listener registered in `DOMContentLoaded` (`20`). Don't add `haptic()` calls inside scroll, render, or polling paths. |
| `refreshLivePulse()`            | Reads `coachClients` from memory (no fetch) and counts rows whose `last_seen_at` is within the last 30 minutes. Paints `#coach-live-pulse` (a single subtle line under the Aujourd'hui card on the dashboard) when count > 0; hides it otherwise. Recheck cadence: every 5 minutes via `setInterval`, plus immediately after `loadCoachDash` finishes. |
| `animateCount(el, target, duration=1200, format=n=>String(n))` | Cubic ease-out count-up via `requestAnimationFrame`. Honors `prefers-reduced-motion` — paints the final value immediately. `format` is called on each tick with the rounded current value. Used by the landing kg-lost stat and reusable for any count-up surface. |
| `_loadHtml2Canvas()`            | Lazy-loads `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js` exactly once (Promise cached on `_h2cPromise`). Resolves to the global `html2canvas` function. The weekly-report share button uses this and **hides itself** on load failure rather than showing a broken state. |
| `_initKgLostCounter()`          | Landing-side initializer for the 4th stat tile (`#stat-kg-lost`). One bounded `clients` query (`current_weight` & `start_weight` not null), sums `start - current` where `start > current`. Wires an `IntersectionObserver` so the count-up runs only when the tile scrolls into view. Returns "—" if the sum is 0 or the query fails. Called once from `loadLanding()`. |
| `_renderSparkline(weights, width, height)` | Pure function returning an inline SVG path + dots for a 7-day weight series. Missing days render as muted (`var(--s4)`) midline dots. <2 known points renders a dashed midline placeholder. Used only by the weekly report. |
| `renderWeeklyReport(logs7, streakCurrent)` | Pure-string renderer for the magazine-style report card on the client Progrès tab. See §15. |
| `shareWeeklyReport(btn)`        | Click handler for the report's 📸 Partager button. Lazy-loads html2canvas, snapshots `#weekly-report-card` to PNG, triggers download as `rapport-semaine-{firstName}.png`. Hides the button on failure. |
| `rLeaderboard()` / `setLeaderboardVisible(visible)` | Renderer + visibility-toggle handler for the new client 🏆 Classement tab. See §15. |
| `staggerCards(containerEl, selector='.card,.client-card,.tile')` | Apply `.card-enter` to every matching child with a 55ms cascade. **Call after `innerHTML` is set on a container.** Don't put it inside auto-refreshing loops or polling — it's for initial render and manual navigation only. Already wired into `renderCoachDash` (passes `wrap`), `openCoachClient` (passes `detail`), and `loadLanding` (passes `#landing` with a landing-specific selector). |

### `parseClientPaste()` is local-only — never fetch from the browser

The "Coller un profil" extractor was a direct `fetch('https://api.anthropic.com/v1/messages')` call from the browser. That broke (CORS + leaking the key in client code if anyone ever set it) and has been replaced with `_parseClientText(text)` — a pure regex/keyword parser.

**Don't reintroduce a direct browser-side call to any LLM API.** If you genuinely need AI extraction here, the supported path is:

1. Add a Supabase Edge Function (`/functions/v1/parse-client-paste`) that holds the API key as a function secret and forwards the request server-side.
2. Call that Edge Function from `parseClientPaste()` via `sb.functions.invoke('parse-client-paste', { body: { text } })` — same `sb` client, no extra HTTP layer, RLS/policies still apply.

Until then, the regex parser is the canonical implementation. It's covered by `_parseClientText` so a future swap only touches the wrapper.

### Filter future-dated logs out of "recent N" tables

`renderCoachTracking` and any sibling that slices a recency window must drop `l.log_date > toISO()` *before* the slice — otherwise a stray future row pushes a real recent row off the bottom:
```js
const todayISO = toISO();
const recentLogs = logs.filter(l => l.log_date <= todayISO).slice(0, 14);
```

---

## 7. Adding a feature safely

1. **Read first.** Use `grep -n "<thing>"` to find every call site of the function you're about to edit. Renderers in this file return strings and are inlined into other strings — broken interpolation cascades.
2. **Prefer additive edits.** If a function already returns HTML, append a new block rather than restructuring its template literal. The template literals are large and indentation-sensitive; partial finds will miss whitespace and the `Edit` tool will fail with non-unique matches.
3. **Re-render through the existing entry point.** After mutating `coachClients`, call `applyClientFilters()` (not `renderClientList(coachClients)` directly) so segment + filter state is preserved.
4. **Don't touch element ids.** JS reads many static ids (`coach-dash`, `coach-detail`, `coach-tab-content`, `tab-home`, `revenue-content`, `compliance-content`, `coach-msg-badge`, `coach-notif-btn`, `coach-add-btn`, etc.). Renaming any of these will break unrelated code.
5. **Ids in event handlers must be string-safe.** Many handlers are built like `onclick="fn('${c.id}')"`. UUIDs are safe; if a value can contain `'` or `\`, use `event` delegation or a separate registration.
6. **New table?** Add a `create table …` snippet in your PR/notes. The app does **not** create tables; the user runs the SQL in Supabase. Always set sensible defaults so existing rows don't break (`alter table … add column … default …`).
7. **Storage URLs are public.** Don't put anything sensitive into the `client-photos` bucket.
8. **No build step, no bundler.** ES modules aren't used. New code goes in the existing `<script>` block in plain ES2017+. Keep using `await sb.from(...)`; don't introduce a new HTTP client.
9. **Keep coach-only UI gated.** Coach features hang off `#coach-screen` (not `#client-screen`). Anything you add inside `#coach-screen` is automatically invisible to logged-in clients (the screens never overlap).
10. **Optimistic updates pattern.** When toggling state (see `toggleClientFlag`): mutate locally first, re-render, then await the Supabase update; on error revert the local mutation.

---

## 8. Common pitfalls

- **Filter chips reset on segment change.** `setSegment` clears `activeFilter` to `'Tous'`. If you add a new sub-filter and don't see it survive segment switches, that's why.
- **Photo grid clicks bubble.** The `<img>` inside `.photo-item` has `pointer-events:none` in compare mode so the parent `onclick` fires. Don't remove that without re-wiring.
- **Coach header is mostly fixed.** Inline buttons live in `.coach-hdr-actions` (scrolls horizontally if it overflows). Always-visible buttons (⋯, 🔔, ⏻) live in `.coach-hdr-fixed` and must not be moved into the scroll container.
- **`renderClientList` is synchronous.** It reads from `lastCheckinByClient` which is populated only by `loadCoachDash()`. If you re-render without going through `loadCoachDash`, the "Dernier check-in" line shows "Jamais" until the next load.
- **`CC.client_type === 'coaching'` is not the same as `!CC.client_type`.** Some legacy clients may have `client_type` null and are treated as coaching. Match the convention used by the surrounding code (`!c.client_type || c.client_type === 'coaching'` for permissive checks; strict `=== 'coaching'` only when intentional).

---

## 9. SQL for the new `claude_notes` table

Run once in Supabase SQL editor:

```sql
create table if not exists claude_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  notes text,
  priority text default 'medium' check (priority in ('low','medium','high')),
  status text default 'todo' check (status in ('todo','in_progress','done')),
  created_at timestamptz default now()
);
```

If you have RLS enabled on the project, either disable it for this table or add a coach-only policy — the app uses the same anon key for both portals, so a permissive policy is required to read/write from the browser.

---

## 10. White-label settings (`app_settings`)

Coach-customizable identity is stored in a single-row `app_settings` table and applied at boot.

### SQL

```sql
create table if not exists app_settings (
  id int primary key default 1,
  coach_name text default 'Coach Laid Sammy',
  brand_color text default '#c9a84c',
  whatsapp text default '213698103835',
  logo_url text,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
insert into app_settings(id) values (1) on conflict (id) do nothing;
```

### Module state + helpers

| Symbol            | Purpose                                                |
|-------------------|--------------------------------------------------------|
| `appSettings`     | In-memory copy of the row; defaults to legacy values.  |
| `COACH_NAME()`    | Coach display name (replaces hardcoded `'Coach Laid Sammy'`). |
| `COACH_WA()`      | Digits-only WhatsApp number.                           |
| `COACH_WA_LINK()` | `https://wa.me/{digits}` — base URL for outbound links. |
| `BRAND_COLOR()`   | Hex color string.                                      |
| `LOGO_URL()`      | Optional logo URL (about-page image).                  |
| `loadAppSettings()` | Awaited at boot (right after `sb` is created). Falls back to defaults if the table doesn't exist. |
| `applyAppSettings()` | Patches `--g`/`--gd`/`--gl` CSS vars, page title, and any `.land-logo-text`, `.land-about-name`, `.land-footer-logo`, `.land-footer-copy`, `.land-cta-sub`, `.js-coach-name` elements with the current name + logo. |

### Coach Settings page

Reachable via the **⋯** menu → **⚙️ Settings**. Form fields: coach name, brand color (color picker + hex), WhatsApp number, logo URL. Save handler upserts into `app_settings` and re-runs `applyAppSettings()`.

### Coverage (what's wired vs not)

**✅ Auto-updated when settings change:**
- All JS-side WhatsApp links (renewals, supplements, group orders, signup, programme upsell, etc.) — went through the `WA_BASE` constant + 6 inline `https://wa.me/213698103835` references.
- All JS-side "Coach Laid Sammy" usages in template literals (signup messages, intake messages, posts.author_name, invoice header/footer).
- Brand color (`--g`, `--gd`, `--gl`) — single CSS-var override theming the entire app.
- Landing page name (`.land-logo-text`, `.land-about-name`, `.land-footer-logo`, `.land-footer-copy`, `.land-cta-sub`).
- Page `<title>`.
- Logo URL → `#land-about-img`.
- The two static-HTML "Coach Laid Sammy" mentions (chat header, supplements subtitle) were tagged with `.js-coach-name` so they're updated on load.

**⚠️ Still hardcoded — pick up next iteration:**
- **Translation strings** for `cta-sub` in `T()` dictionaries (FR/EN — line ~8851/8880). `applyAppSettings()` overwrites the element, but if the user changes language afterwards, `T()` will rewrite "Coach Laid Sammy" back. Fix: introduce a `{coach}` placeholder convention in the translation system.
- **CSS comment header** (line 22) — cosmetic only.
- **Logo SVG** in the coach header (lines ~924–937) — currently the gold "LS" SVG icon. Logo URL only updates the about image, not the header SVG. Future: render `<img>` from `LOGO_URL()` instead of the inline SVG when set.
- **Other CSS theme colors** (`--gd`, `--gl` lighter/darker variants) currently get the same value as `--g`. For a true theme system, generate dark/light variants from the brand color.

### Editing rules

- **Don't read `appSettings.x` directly.** Always go through the helper (so future fallback logic stays in one place).
- **Don't reintroduce literal `'https://wa.me/213698103835'` or `'Coach Laid Sammy'`** in new code — use `COACH_WA_LINK()` / `COACH_NAME()`. The grep is your check.
- **Tagging new static text:** wrap any new hardcoded coach name in `<span class="js-coach-name">…</span>` and it'll be updated automatically.

---

## 11. Landing-page admin (transformations + testimonials)

The coach landing page (`#landing`) reads two tables that previously had no UI: `transformations` and `testimonials`. Both are now editable from inside `showLandingEditor()` — the same screen that already edits `landing_config`.

### Where it lives

`showLandingEditor()` (search `async function showLandingEditor`) renders into `#coach-tab-content`. Two collapsible cards are appended after the existing landing-config form:

- **📸 Transformations** — list of all rows, "+ Ajouter" button, edit/delete per row, before/after photo upload.
- **💬 Témoignages** — list of all rows, "+ Ajouter" button, edit/delete per row, inline visibility toggle.

Both sections are rendered lazily by `loadLandingTransforms()` / `loadLandingTestimonials()` which are kicked off via `setTimeout` after `showLandingEditor` writes its HTML.

### Functions

| Function                                       | Purpose                                                     |
|------------------------------------------------|-------------------------------------------------------------|
| `toggleAdminSection(bodyId, chevId)`           | Collapses/expands a section.                                |
| `loadLandingTransforms()`                      | Fetches `transformations` and renders the admin list.       |
| `openTransformForm(id?)`                       | Renders the create/edit form inline (replaces the list).    |
| `uploadTransformPhoto(input, 'before' | 'after')` | Uploads to `client-photos/transformations/{ts}_{side}.{ext}`. |
| `saveTransform()`                              | Insert or update; demotes any other `is_client_of_month` row first. |
| `deleteTransform(id)`                          | Confirm + delete.                                           |
| `loadLandingTestimonials()` / `openTestimonialForm` / `saveTestimonial` / `deleteTestimonial` / `toggleTestimonialVisible` | Mirror set for testimonials. |

After every CRUD, `loadLanding()` is called so the public landing reflects the change without a reload.

### Photo storage

Same pattern as `uploadPhoto()` / `uploadCoachPhoto()`:
- Bucket: `client-photos`.
- Filename: `transformations/{Date.now()}_{before|after}.{ext}`.
- Public URL via `sb.storage.from('client-photos').getPublicUrl(path)`.

### "Client du mois" exclusivity

When the checkbox is ticked on save, `saveTransform()` first runs `update({is_client_of_month:false}).eq('is_client_of_month',true)` to demote any existing row before persisting the new one. So at most one transformation is the current Client du mois.

### Reference SQL

These tables already exist in production. Snippets here for fresh installs / new coach instances:

```sql
create table if not exists transformations (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  stats text,
  caption text,
  photo_before_url text,
  photo_after_url text,
  is_client_of_month boolean default false,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  quote text not null,
  result text,
  is_visible boolean default true,
  created_at timestamptz default now()
);
```

Columns above were verified against `renderLandTransforms` and `renderLandTestimonials` (the public-facing renderers, which are the source of truth for which fields the landing reads).

---

## 12. Stats-semaine drill-downs + nudge button

The three "Stats semaine" tiles on the coach dashboard are clickable.

### Wiring

| Tile               | Click target                                                             |
|--------------------|--------------------------------------------------------------------------|
| `Check-ins`        | `showDrilldown('checkins')` — clients with a check-in within the last 7 days, sorted by most recent first. |
| `Compliance moy.`  | `showComplianceRanking()` — existing overlay, no new view created.       |
| `👻 0 check-in`    | `showDrilldown('ghosts')` — clients with no check-in in the last 7 days, sorted Coaching → Programme then by name. |

Hover state: `transform:translateY(-2px)` + gold border tint, applied via inline `onmouseenter`/`onmouseleave` (no new global CSS class).

### Drill-down overlay

Single reusable overlay `#coach-drilldown-view` (mirrors the `#coach-revenue-view` / `#coach-compliance-view` pattern). The `<div id="coach-drilldown-title">` is repainted per call. Each row reuses `.client-card`, `.cc-av`, `.cc-name`, `.cc-meta`, `.badge` — no new global classes.

Per-row buttons:
- **Voir** — closes the drill-down and calls `openCoachClient(id)`.
- **📣 Alerter** — opens `openNudgeModal(id, context)`.

### Nudge modal

Modal `#coach-nudge-modal`. Contents:
- Header with the client's name in gold.
- Template chips (rendered from `COACH_NUDGE_TEMPLATES[context]`). Clicking a chip refills the textarea via `applyNudgeTemplate(idx)`.
- Editable `<textarea id="coach-nudge-text">` — coach can override the template before sending.
- Send button: `https://wa.me/{digits}?text={encodeURIComponent(text)}` opened in a new tab. **No Supabase write.**
- Send button auto-disables ("Numéro WhatsApp manquant") if `c.whatsapp` is empty after `replace(/\D/g,'')`.

`{name}` placeholder is replaced with `c.name.split(' ')[0]` (first name only).

### TODO — i18n

Templates are FR-only for now. To translate:

1. Move `COACH_NUDGE_TEMPLATES` into the existing `T()` translation system (FR/EN/AR dictionaries near line 1800).
2. Switch the chip-rendering and `applyNudgeTemplate` to read `T(...)` lookups instead of the hard-coded object.
3. Re-rendering on language change is automatic if the modal is closed; if open, call `applyNudgeTemplate(currentIdx)` from `setLang()` to refresh the textarea.

---

## 13. Aujourd'hui — unified coach daily action list

**Status:** lives **alongside** the existing dashboard for now. The 📋 Aujourd'hui entry card at the top of `renderCoachDash()` is the candidate replacement for the dashboard home view, but the swap is **pending** — both surfaces continue to coexist until the call is made.

### Dashboard cleanup — "Actions requises" panel removed

The legacy "Actions requises" panel that previously sat between the entry card and the overview tiles has been removed (its renewals bucket is now Aujourd'hui §2 with the **identical query** — `active.filter(c => 0 ≤ days_until(c.membership_expiry) ≤ 7)`).

**Subsumed**: ⏰ expiring renewals — same predicate, same UX path (`Voir / Renouveler` → `openCoachClient(id)`).

**Lost from the dashboard UI** (still functional via the client detail page, but discoverability dropped):
- 🆕 **Pending signups** — clients with `status='pending_approval'`. The `approveClient(id)` flow still exists (called from inside the client detail page); only the dashboard surface is gone. The "En attente" overview tile still shows the count.
- 😴 **Inactive 3+ days** (`last_login` older than 3 days). No replacement surface today. Section 3 of Aujourd'hui ("Sans check-in") is a *related* but **different** signal — it tracks `daily_logs.log_date`, not `clients.last_login`.

If either of those signals matters, add them as new Aujourd'hui sections rather than reviving the panel.

### Entry card visual treatment

Standard dark `.card` (background `var(--s1)`) with:
- `border-left:3px solid var(--g)` as the gold accent.
- Title in `var(--g)`, subtitle in `var(--tm)`.
- Action count rendered as a small pill: `background:var(--g);color:var(--bk)` — never as a full-card background fill.
- Right-pointing chevron `›` to signal navigation.
- Hover lifts background to `var(--s2)` (no transform).

If you ever change the dashboard card style globally, apply the same change here so the entry stays in family.

The earlier solid-gold gradient version was reverted because it broke the rest-of-app convention (dark cards with gold *accents*, never gold fills).

### Where

- Overlay: `#coach-today-view` (fullscreen, mirrors the `#coach-revenue-view` / `#coach-compliance-view` pattern).
- Entry card: rendered at the top of `renderCoachDash` HTML (`todayEntry` variable, line ~7104).
- Stats Semaine tiles all route here too (tile 1 → no section, tile 2 → section 4, tile 3 → section 3).

### Sections (in order)

| # | Title                  | Source                                                                                           |
|---|------------------------|--------------------------------------------------------------------------------------------------|
| 1 | 💬 À répondre          | `client_comments` where `sender='client'` AND `is_read=false`, oldest first.                     |
| 2 | ⏰ À renouveler        | `coachClients` filtered to `status='active'` with `membership_expiry` within next 7 days. Same predicate as the existing "Actions requises" panel — kept consistent. |
| 3 | 👻 Sans check-in       | `coachClients` (active) where `lastCheckinByClient[id]` is missing or older than 7 days. Sorted Coaching → Programme → name. |
| 4 | 📉 Compliance faible   | `coachClients` where `last_compliance_score < 50`. Sorted lowest first.                          |
| 5 | 📝 Check-ins à valider | `daily_logs` rows from the last 7 days where `weekly_checkin_done = true` AND `coach_notes IS NULL`. **This is the source of truth for "needs review" — reuse this predicate if you build another surface that lists check-ins waiting for coach feedback.** |

Each section is rendered as a `.card`. When count is 0, the card is dimmed and shows "Tout est à jour ✓" — never hidden, so the coach always sees that it's handled.

### Data flow

- **Sync sections (2, 3, 4):** computed from already-loaded `coachClients` + `lastCheckinByClient`. No round-trip.
- **Async sections (1, 5):** fetched in parallel via `_coachTodayFetchAsync()` with a 60-second TTL cache (`_coachTodayCache`). The cache is force-bypassed by `refreshCoachTodayCount(force=true)`.
- **Total badge:** sum of all five sections, painted into both `#today-entry-count` (dashboard card) and `#coach-today-total` (overlay subtitle).

### Refresh hook

`refreshCoachTodayCount()` is the public refresh entry point. It's already called:
- After `renderCoachDash()` paints (`setTimeout(refreshCoachTodayCount,0)`).
- When the overlay closes (back button onclick).

If you add a new flow that mutates any of the five inputs (e.g. marking a comment read, saving a coach note), call `refreshCoachTodayCount()` after the mutation so the badge stays accurate.

### Tab indices

Section 1 deep-links to the Messages tab and Section 5 to the Check-in tab. Both use `COACH_TAB_IDX` (defined near `coachClients`, line ~1914) — never hardcode the index. If the `handlers` array in `loadCoachTab()` is reordered, update the map in one place.

### Nudge button

Sections 3 and 4 each render a 📣 Alerter button per row. It opens the existing `#coach-nudge-modal` via `openNudgeModal(id, context)` with context `'ghosts'` for Section 3 and `'compliance'` for Section 4. Three FR templates per context — see `COACH_NUDGE_TEMPLATES` (Section 11 / 12).

---

## 14. Live presence (`last_seen_at`)

Drives the "En ce moment" pulse on the coach dashboard.

### SQL (run once)

```sql
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;
```

Until this column exists, the live-pulse element stays hidden (the read filter in `refreshLivePulse` requires `c.last_seen_at`). No errors are thrown — the missing column simply yields `count = 0` and `display:none`.

### Write sites

The app writes `clients.last_seen_at = new Date().toISOString()` (UTC ISO is fine — this column is timestamptz, not date-only) at two points:

1. **Client login** (after credentials accepted, line ~2937 in the entry-modal handler).
2. **Session restore** at boot (`DOMContentLoaded` handler, line ~10020 — when a stored `cls_session` is replayed).

Both write sites use a fire-and-forget `.then(() => {}, () => {})` so a slow network or missing column never blocks the UX.

### Read site

`refreshLivePulse()` (defined alongside the polish helpers — see §6.5 table) reads the **already-loaded `coachClients` array** in memory and filters `c.last_seen_at >= now - 30min`. It is called:

- Once after `loadCoachDash()` finishes (immediate paint).
- Every 5 minutes via `setInterval` registered in `DOMContentLoaded`.

### What's polish-ready vs not

- **Visible on dashboard**: ✅ pulse line under the Aujourd'hui entry card, only when `count > 0`.
- **Updates without re-fetching**: ✅ reads from memory; no Supabase round-trip on the 5-minute tick.
- **Cross-tab presence**: ❌ the column updates on login/restore only, not on a heartbeat. A "still here" tick is a future upgrade — recommended interval is 60s while the page is visible (`document.visibilityState === 'visible'`).
- **Coach presence**: ❌ only client-side writes. The coach is never counted as "active" by this surface.

---

## 15. Wave-2 polish — magazine report, leaderboard, kg-lost counter

### Weekly Magazine Report (client Progrès tab)

Lives at the **top** of `rProgress()`'s output, above the existing weight/measurements/records/photos toggle. Single dark card with gold accents, six stacked sections:

1. Header — `RAPPORT` (sec-label) + week range `DU {Mon-date} AU {Sun-date}` + 📊 glyph.
2. Stats grid (3 columns) — **Poids** (latest body_weight + delta vs earliest known weight in window), **Compliance** (mean per-log score with mini gold progress bar), **Check-ins** (`N/7 j` + streak chip).
3. **Meilleur jour** — daily_log row with the highest score in the window. Shows date + key stats inline.
4. **Sparkline** — `_renderSparkline(weights)` SVG, full width × 48px. Missing days are muted dots on the midline.
5. **Mot du coach** — the most recent non-null `coach_notes` from the 7-day window. Falls back to a contextual auto-message based on compliance %. Signed `— {COACH_NAME()}`.
6. **📸 Partager** button — `shareWeeklyReport(btn)` → html2canvas snapshot → PNG download.

**Data sources:** all three are fetched in one `Promise.all` at the top of `rProgress()`:
- `daily_logs` (`log_date, body_weight, calories_eaten, protein_eaten, steps, training_done, coach_notes`) for `client_id = CC.id` and `log_date >= today − 6` days.
- `getStreak()` → `{current, best}` (existing helper, also used by `rHome`).

**No new tables** — everything plugs into existing schemas.

**Compliance formula:** `(calOk + protOk + stepOk + trainOk) / 4 × 100` with thresholds `cal ≥ 0.85 × kcal_training`, `prot ≥ 0.85 × protein_g`, `steps ≥ 7000`, `training_done = true`. Same as the dashboard ranking — keep it consistent if you adjust thresholds.

**html2canvas dependency:** loaded on demand from cdnjs (`1.4.1`). The script tag is added the first time the share button is clicked. If the load fails (offline, CDN block, CSP), `shareWeeklyReport` hides the button silently.

### Client Compliance Leaderboard (🏆 Classement tab)

New 7th client tab, added at index 6 (after Moi):
- Tab content div: `#tab-leaderboard` (line ~985).
- Bottom-nav button: `data-tab="6"`, `id="nav-6"`, label "🏆 Classement".
- Wired into the `ids` array and `fns` array in `switchTab` / `renderTab` / `refreshTab` (all three updated together).

Renderer `rLeaderboard()` queries `clients`:

```js
sb.from('clients')
  .select('id,name,last_compliance_score,client_type,show_on_leaderboard')
  .eq('status','active')
  .not('last_compliance_score','is',null)
  .order('last_compliance_score',{ascending:false})
  .limit(20);
```

Renders top-20. Each row: rank (🥇/🥈/🥉 for top 3, plain number otherwise), name (or `Membre anonyme` when `show_on_leaderboard === false`), `complianceRing(score, 32)`. Top-3 rows get a `border-left:3px solid {gold|silver|bronze}` accent. The current client's own row is highlighted with `background:var(--ga)` and a `· toi` label.

Below the list: a single checkbox `Apparaître dans le classement` wired to `setLeaderboardVisible(checked)` which upserts `clients.show_on_leaderboard` and shows an inline confirmation. **Defaults to `true` — new clients are opted in unless they toggle off.**

**Empty state:** when fewer than 3 clients qualify, the renderer skips the list entirely and shows *"Le classement s'affiche dès que plus de clients rejoignent le programme 💪"*.

### SQL prerequisite

```sql
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS show_on_leaderboard boolean DEFAULT true;
```

Until you run this, the toggle still appears but the upsert errors out with a contextual message. The leaderboard render itself doesn't require the column — the visibility check is `c.show_on_leaderboard === false`, which fails closed (unset → treated as visible).

### Landing kg-lost counter

4th stat tile on the landing's `.land-stats-wrap` row (`#stat-kg-lost`). The grid was overridden inline to `repeat(auto-fit, minmax(160px, 1fr))` to handle the new column without touching the `.land-stats` CSS rule. Initial value `—` (so first paint never shows `0 kg`).

`_initKgLostCounter()` runs at the end of `loadLanding()`:

1. Queries `clients(current_weight, start_weight)` with both not null.
2. Sums `(start_weight − current_weight)` for rows where `start_weight > current_weight`.
3. Wires an `IntersectionObserver` (threshold 0.4) on the tile.
4. On first intersection, calls `animateCount(el, total, 1200, n => n + ' kg')`.

Sum ≤ 0 or query failure → tile stays at `—`. `prefers-reduced-motion` → final value paints immediately.

### What's reusable for future surfaces

- `complianceRing(score, size)` — used by client cards, leaderboard rows, and any future surface that needs a score visual. Pure function, no side effects.
- `streakBadge(n)` — used by client cards and the report's check-ins column. Pure function.
- `animateCount(el, target, duration, format)` — generic count-up; reuse for any tile-style number that should animate on view.
- `_renderSparkline(weights, w, h)` — accepts a numeric array with `null` gaps. Drop into any 7/14/30-day card.
- `_loadHtml2Canvas()` — reuse for any future "share as image" button (invoice exports, transformation cards, etc.). One CDN load, then cached.

---

## 16. Premium polish layer (typography, motion, grain)

**Status:** pure feel layer — no feature changes, no Supabase calls touched. Adding this section so future contributors don't accidentally rip out invisible-but-felt details.

### Inter font

Loaded once in `<head>` (just before `<style>`) via Google Fonts preconnect + a single CSS import (weights 400 / 500 / 600 / 700 / 800 / 900, `display=swap`). Applied to `html, body` and inherited everywhere via the existing `button, input, select, textarea { font-family: inherit }` rule. `<html>` carries the OpenType feature flags for Inter (`'cv02','cv03','cv04','cv11'`) plus standard antialiasing hints.

If the network is offline, `display=swap` falls back to `-apple-system, BlinkMacSystemFont, sans-serif` — text never blocks render.

### Easing standard

Two named easings are used app-wide. **Pick the right one for the right gesture; don't invent new ones.**

| Easing                                  | Use for                                                   |
|-----------------------------------------|-----------------------------------------------------------|
| `cubic-bezier(0.34, 1.56, 0.64, 1)`     | Button press recoil (slight overshoot — feels physical).  |
| `cubic-bezier(0.34, 1.2, 0.64, 1)`      | Card / tile entrances (`@keyframes cardEntrance`).        |
| `cubic-bezier(0.22, 1, 0.36, 1)`        | Screen + overlay transitions (`@keyframes screenEnter` / `overlayEnter`) and `:hover` lifts. |

### Background grain

`body::before` paints a 256×256 SVG fractal-noise tile at `opacity: .028`, `position: fixed`, `z-index: 0`, `pointer-events: none`. **Do not raise the opacity above 0.028** — past that it stops feeling like material and starts looking like a bug. The grain stacks at z=0 in the body's stacking context; body children with default `z-index: auto` paint above it in source order, so any positioned ancestor with an opaque background will cover the grain.

When adding new fixed/positioned overlays, give them an explicit `z-index` ≥ 1 to stay above the grain. The existing major overlays (`#coach-revenue-view`, `#coach-compliance-view`, `#coach-claude-notes-view`, `#coach-settings-view`, `#coach-drilldown-view`, `#coach-today-view`, `.modal-bg`) all set `z-index: 100+` and are unaffected.

### `.modal-bg` backdrop blur

Modals use `backdrop-filter: blur(8px) saturate(0.8)` (with `-webkit-` prefix for Safari/iOS). On Firefox Android the property is unsupported — the modal still shows over a dark overlay, just without blur. Acceptable degradation, no special handling needed.

**If you add a new fullscreen overlay that should also blur the layer below** (e.g. a future fullscreen sheet), copy the `backdrop-filter` block from `.modal-bg`. Don't reuse the modal-bg class itself for non-modal layers — the `align-items: flex-end` and `justify-content: center` flex behavior is modal-specific.

### Reduced-motion catch-all

A single block at the end of the main `<style>` overrides every animation/transition app-wide when `prefers-reduced-motion: reduce` matches. New animations don't need their own opt-out — they're covered automatically. The earlier ring/fire/live-dot specific entries in the same block are now redundant but kept for clarity.

### Spring physics on `.btn`

`.btn` carries a base `transform: scale(1)` with a spring transition; `.btn:active` drops to `scale(0.96)`. Don't override `transform` on a `.btn` variant unless you also restore the press-recoil — variants like `.btn-gold:active` explicitly re-declare both `transform` and `box-shadow` so they don't drop the press feel.

### `staggerCards` wiring

Called in three places today: `renderCoachDash` (passes the `wrap` element), `openCoachClient` (passes the `detail` element), `loadLanding` (passes `#landing` with a landing-specific selector for `.land-program, .land-transform, .land-testimonial, .land-feature-card, .land-stat`). **If you add another bulk-render surface, call `staggerCards(yourContainer)` immediately after the `.innerHTML = …` line.** Don't call it on partial re-renders or polling refreshes — it'll re-trigger the entrance animation on existing cards and look glitchy.

---

## 17. Voice notes + onboarding (Wave 3)

### `voice_notes` table — SQL

Run once in Supabase:

```sql
CREATE TABLE IF NOT EXISTS voice_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  audio_url text NOT NULL,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE voice_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON voice_notes
  FOR ALL TO anon USING (true) WITH CHECK (true);
```

Until this exists, the coach modal will surface an inline error on send (the upsert returns a Supabase error). The client-side player simply renders nothing (the `select` returns no rows, the section stays `display:none`).

### Coach voice modal — `showCoachVoiceModal(clientId)`

- New `🎙 Vocal` button in the coach client detail header (between `📌 Note` and `+ Note`).
- Modal `#coach-voice-modal` renders four states by re-painting `#coach-voice-body`: **ready** (mic button, "Appuie pour enregistrer"), **recording** (red pulsing button, live `m:ss` timer, 20-bar SVG-less waveform driven by `AnalyserNode.getByteFrequencyData`, ⏹ Arrêter button, **auto-stops at 60 s**), **preview** (▶/⏸ playback of the recorded `Blob` via an in-memory `Audio()` URL, 🗑 Recommencer + 📤 Envoyer), **uploading** (spinner), **sent** (✓ message + auto-close after 1.5 s).
- MediaRecorder mime-type fallback ladder: `audio/webm;codecs=opus` → `audio/webm` → `audio/ogg;codecs=opus` → `audio/mp4` → browser default. The chosen extension drives the upload filename.
- Storage path: `client-photos/voice-notes/{clientId}/{Date.now()}.{ext}`. **Reuses the existing `client-photos` bucket** — do not create a new one. URL is fetched via `sb.storage.from('client-photos').getPublicUrl(path)`.
- After upload, an insert into `voice_notes` runs, then a fire-and-forget `notifications` row is inserted so the client gets an in-app badge.
- Module state lives in a single `_voiceCtx` object that's reset every time the modal opens. `_voiceCleanup` stops the stream/recorder/audioCtx/RAF/timer on close — no leaked microphone tracks.
- **Graceful degradation:** missing `MediaRecorder` → renders the `error` state immediately ("Enregistrement non supporté sur ce navigateur"). `getUserMedia` `NotAllowedError` → "Accès au micro refusé — vérifie les permissions de ton navigateur." All other failures show their `.message` inline.

### Client voice player — `loadClientVoiceNotes()`

- Renders into `#client-voice-notes` (a card already present in `rMoi` above the messages card). Card stays `display:none` when there are no notes.
- Fetches `voice_notes` for `CC.id` (latest 5). Each row: 5-bar gold waveform glyph, "Message de {COACH_NAME()}", date + duration, ▶ button.
- **48 h "new" gold dot** — added next to the coach name when `created_at` is within the last 48 hours; removed the moment the user taps play.
- **Single-audio playback discipline:** `_vnAudio` + `_vnPlayingId` module state. Tapping a different row pauses the currently-playing one before starting the new one. Tapping the currently-playing row toggles pause.
- Wired into the Moi-tab loader (`renderTab(5)`) alongside `loadClientMsgs` and `loadMoiIntakeSummary`.

### New-client onboarding — `maybeShowClientOnboarding()`

Trigger conditions (all must hold):
1. `CC.created_at` within the last 7 days.
2. `daily_logs` row count for `CC.id` is **0** (queried via `select id, {count:'exact', head:true}`).
3. `sessionStorage.getItem('onboarding_shown_' + CC.id)` is unset.

If any check fails or any query errors, returns `false` and the caller proceeds straight to `openPortal()`. **The onboarding never blocks portal entry on error.**

Sets the sessionStorage flag *before* showing, so a refresh mid-onboarding doesn't loop. The promise resolves only when the user dismisses (CTA tap or Skip).

#### Wiring sites

Two call sites for `await maybeShowClientOnboarding()` — both immediately before `await openPortal()`:
- Login success in the entry-modal handler (line ~3189).
- Session restore in `DOMContentLoaded` (line ~10403).

If you add another portal-entry path, mirror this pattern — never call `openPortal()` without giving onboarding a chance to take over.

#### Step structure

The overlay `#client-onboarding` (`z-index: 9998`, just below the loading screen) cycles four steps via `_renderOnbStep()`:

1. **Welcome** (auto-advance 2.5 s or tap) — gold initial avatar + "Bienvenue, {firstName} 👋" + "Ton programme est prêt."
2. **Coach intro** (auto-advance 3.5 s or tap) — coach photo from `landing_config.about_photo_url` (same row used by `showLandingEditor`) or fallback initial avatar; word-by-word stagger on the intro line via per-word inline `animation-delay`.
3. **Plan reveal** (auto-advance 3 s or tap) — three rows (🎯 goal, 🍽 kcal/prot, 💪 sessions) sliding in 300 ms apart. Each row gets a gold left border.
4. **CTA** — "C'est parti 🔥" gold button → `_onbDismiss()` fades the overlay (opacity 0, scale 0.95, 0.4 s) and resolves the promise.

A skip link top-right jumps straight to step 4. Progress dots at the bottom expand/contract with the active step.

#### Reduced motion

`_renderOnbStep` and `_onbDismiss` both check `prefers-reduced-motion: reduce`:
- Step content still renders in full, but the inline entrance/word-stagger animations resolve instantly thanks to the §16 catch-all.
- Auto-advance timers are skipped (the user must tap or skip).
- Dismiss is instantaneous (no fade).

### Reused, not reinvented

- `COACH_NAME()` for the coach intro and message labels — never hardcode.
- Existing keyframes `overlayEnter` / `fire-flicker` / `live-dot-pulse` for the onboarding entrances and the recording-button pulses.
- `client-photos` storage bucket for voice files — same bucket as photos and coach-profile images.
- `landing_config.about_photo_url` for the coach intro photo — same column the landing editor manages.

---

## 18. Navigation collapse — client bottom nav + coach 4-tab detail

Two simultaneous nav simplifications. No new tables, no schema changes.

### Client bottom nav (4 tabs, fixed, no scroll)

`<nav class="bottom-nav">` (line ~1039) renders 4 buttons + a single sliding indicator. The legacy "tab index" inside the SPA stays multi-valued (the client portal still has tab content for Plan / Communauté / Moi / Leaderboard accessible via notif-routing in `handleClientNotifClick`), but only these 4 surface in the bar:

| Position | data-tab | data-pos | Icon | Label       | Renderer (`renderTab` / `fns[]`) |
|----------|----------|----------|------|-------------|----------------------------------|
| 0        | 0        | 0        | 🏠   | Accueil     | `rToday` (Aujourd'hui home)      |
| 1        | 1        | 1        | ✅   | Check-in    | `rJournal`                       |
| 2        | 7        | 2        | 💬   | Messages    | `rMessages` *(new)* — uses `#client-msgs-wrap-tab` |
| 3        | 3        | 3        | 📊   | Progression | `rProgress`                      |

- `data-tab` drives `switchTab(i)` — these are SPA tab indices, not positions.
- `data-pos` drives the sliding gold indicator: `_moveNavIndicator()` reads the active item's `data-pos` and sets `transform: translateX(${pos*100}%)` on `.nav-indicator`.
- Spring transition: `cubic-bezier(0.34, 1.56, 0.64, 1)` 0.25s. Reduced-motion catch-all (§16) collapses it to instant.
- Active tab: gold `var(--g)` icon + label; sliding indicator at the **top** of the bar (not bottom).
- Tap recoil: `.nav-item:active .nav-icon { transform: scale(.92) }`.
- `padding-bottom: env(safe-area-inset-bottom)` for iOS home-indicator clearance.

#### Messages badge

`#nav-msg-badge` (red pill on tab 2). Painted by `checkClientUnread()` — the existing query for unread `client_comments` from the coach. Same call also paints the legacy `#chat-fab-badge`. No new Supabase query.

#### Where to find the rest of the tabs

- **Plan / Communauté / Moi / Leaderboard** are still rendered (their `tab-content` divs are in HTML and renderers are in the `fns[]` array), just not in the bar. They're reachable via:
  - Notification click routing — `handleClientNotifClick(type)` calls `switchTab(2|4|5)` based on type.
  - In-app deep-links inside Accueil / Progression (e.g. "Voir plus →" rows) if surfaced.

  If you need a permanent surface, add a sub-nav inside one of the 4 visible tabs — **don't grow the bottom nav past 4**.

### Coach detail tabs collapsed (9 → 4)

`coach-tab-bar` (line ~8684) now renders 4 buttons. The composers are async: each calls `Promise.all` over the original section renderers and concatenates the strings.

| New idx | Title       | Composes                                                                              |
|---------|-------------|---------------------------------------------------------------------------------------|
| 0       | Aperçu      | `renderCoachOverview` + collapsible card → `renderCoachDiagnostic` (closed by default; toggled by `toggleCoachDiagPanel()`) |
| 1       | Suivi       | `renderCoachTracking` → `renderCoachSessions` → `renderCoachMealPlan` → `renderCoachExchange`, each under its own `.sec` header |
| 2       | Messages    | `renderCoachMessages` (unchanged)                                                     |
| 3       | Progression | `renderCoachProgression` + `renderCoachCompliance` under a `.sec` header             |

The original 9 renderers are **still the source of truth** for their content. Composing avoids forking. Don't inline a renderer into a composer — call it.

#### Old → new index map

```
0 (Aperçu)         → 0
1 (Check-in)       → 1
2 (Séances)        → 1
3 (Plan Repas)     → 1
4 (Messages)       → 2
5 (Compliance)     → 3
6 (Progression)    → 3
7 (Échange)        → 1
8 (Diagnostic)     → 0
```

`mapTabIndex(old)` (defined next to `COACH_TAB_IDX` at line ~2155) returns the new index. **Wrap any hardcoded integer index** passed into `loadCoachTab(...)` — e.g. `loadCoachTab(mapTabIndex(2), id, null)`.

`COACH_TAB_IDX` was rewritten so legacy named callers (e.g. `COACH_TAB_IDX.checkin`, `.messages`) now point directly to the **new** index. Those callers don't need `mapTabIndex`.

#### Safety net

`loadCoachTab` itself runs `if (idx > 3) idx = mapTabIndex(idx);` as the first line, so any forgotten legacy 4–8 caller still routes to the correct new tab. Indices 1–3 are NOT auto-mapped (they're valid new indices), so callers passing literal 2 or 3 with old semantics MUST go through `mapTabIndex`.

#### What was deliberately NOT changed

- The 9 original renderer functions (`renderCoachOverview`, `renderCoachTracking`, …, `renderCoachDiagnostic`) — composed, not rewritten.
- The Aujourd'hui drill-down deep-links (§13) — they use `COACH_TAB_IDX.messages` / `.checkin`, which now point to the new indices, so they keep working without edits.
- `tab-content` divs in the client portal — kept all 8, only the visible nav was simplified.

---

## 19. Multi-tenant CONFIG + coach-platform (B2B) page

The single-file SPA is now **white-label-ready**. Two structural changes:

### 19.1 `CONFIG` object — single source of truth

A `const CONFIG = {...}` block sits at the very top of the inline `<script>` (line ~1986, before any other code). A new coach white-labels the app by editing this block — nothing else.

| Field             | Used by                                                                  |
|-------------------|--------------------------------------------------------------------------|
| `supabaseUrl`     | `SU` alias → `createClient(SU, SK)` and `EDGE_FN`                        |
| `supabaseKey`     | `SK` alias → `createClient(SU, SK)` and Edge Function `apikey`/Bearer    |
| `coachName`       | `CONFIG.coachName` → fallback for `COACH_NAME()`; `applyAppSettings()` paints `.land-logo-text`, `.land-about-name`, `.land-footer-logo`, `.js-coach-name`, `.js-coach-name-upper`, `.js-coach-initials`, `.land-cta-sub`, `document.title` |
| `coachPhone`      | `CONFIG.coachPhone` → fallback for `COACH_PHONE()` / `COACH_WA()` / `COACH_WA_LINK()`; the B2B page WhatsApp CTAs read it directly |
| `coachPassword`   | `CPW` alias → coach login check (`if (pw !== CPW)`)                      |
| `brandColor`      | `CONFIG.brandColor` → fallback for `BRAND_COLOR()` (sets `--g`/`--gd`/`--gl` CSS vars in `applyAppSettings()`) |
| `appName`         | PWA install title (`apple-mobile-web-app-title`, `application-name` meta — patched at boot by `applyAppSettings()`) |
| `appTagline`      | Reserved for future surfaces (not yet wired)                             |

The `app_settings` DB row (§10) **still wins** when present — `loadAppSettings()` overlays it onto the in-memory `appSettings` object, and `appSettings.coach_name` etc. fall back to the CONFIG defaults. So a fresh deploy with no DB row shows the configured coach; an existing deploy keeps DB-driven white-labeling.

`SU` / `SK` / `CPW` are kept as thin aliases of `CONFIG.*` so existing call sites (`createClient(SU,SK)`, `EDGE_FN=SU+'/...'`, `if(pw!==CPW)`) work unchanged.

#### White-label checklist

When standing up the app for a new coach:

1. **Edit `CONFIG`** at the top of the script (Supabase URL/key, name, phone, password, brand color, app name).
2. **Manually edit** the static `<title>` (line 16), `<meta>` PWA tags (lines 12–13), and the `<link rel="manifest">` data URI (line 17) — these are parsed at HTML load and the JS overwrites them post-boot, but the manifest data URI stays cached for installed PWAs. For a clean install experience, replace the manifest by hand.
3. **Optionally** insert a row in `app_settings` (id=1) with overrides — this lets the coach edit name/color from the in-app Settings page (§10) without re-deploying.
4. **CSV export filename** (`a.download='clients_coach_sammy_…'` near line 6804) and **service-worker cache key** (`'coach-sammy-v1'` near line 10983) are intentionally left as deploy-time strings — bump or rebrand on deploy.
5. The `landing_config` table (Instagram URL, hero text, programs, etc.) is per-deploy DB content — fill it in from the Landing Editor (§11).

#### Don't hardcode in new features

When you add new UI:

- **Names**: read from `COACH_NAME()` inside template literals; if it's a static HTML node, give it `class="js-coach-name"` (or `js-coach-name-upper` / `js-coach-initials`) so `applyAppSettings()` paints it.
- **Phones / WhatsApp links**: `COACH_WA_LINK()` (full `https://wa.me/<digits>`) or `COACH_PHONE()` (digits only). Never type a number.
- **i18n with coach name**: use the `{coach}` placeholder convention — `applyLandLang()` / `applyLanguage()` substitute it at paint time. Don't bake the name into translation strings.
- **Brand color**: don't override `--g` inline; tweak `CONFIG.brandColor` or the DB row.

### 19.2 `#coach-platform` — B2B sales page

A second landing targets *other coaches* who want to license the platform. Same single-file pattern as the client landing — a sibling `<div class="screen">` toggled by `showScreen()`.

#### Routing

- Tiny "Tu es coach ?" link at the bottom of the client-landing footer → calls `showCoachPlatform()`.
- URL hash: `#coach-platform` on load shows the B2B page directly. A `hashchange` listener on `window` toggles the screen, but **only if no client/coach session is active** — never yanks a logged-in user away.
- "← Retour au site" buttons at top and bottom of the B2B page → `backToLandingFromPlatform()` clears the hash and shows the client landing.

#### Sections (in order)

1. **Hero** — gold "PLATEFORME COACH" badge, two-line H1 with gradient on the second line, sub line referencing the live coach (`COACH_NAME()` is paintable into the `js-coach-name` span). Two CTAs: gold "Voir la démo →" → WhatsApp pre-filled message, outline "Comment ça marche ↓" → smooth scroll to `#cp-how`.
2. **Social-proof bar** — single muted line, bordered top/bottom.
3. **How-it-works** — 3 steps (gold-bordered numbered circles + emoji + one-line text).
4. **Features grid** — 6 cards, auto-fit `minmax(260px, 1fr)`. Each: gold icon + name + one-line description.
5. **Pricing** — 2 cards (`.cp-price`). The Pro card carries `.cp-price-pop` which adds a gold `POPULAIRE` ribbon ribbon via `::before`.
6. **Final CTA** — gradient panel with single WhatsApp button.
7. **Footer** — only the back link.

All copy is FR-only for now. If you translate, follow the `{coach}` placeholder pattern for any string that needs the coach name.

#### CSS

All `.cp-*` classes live in their own block in the main `<style>` (search for `/* ── COACH PLATFORM (B2B) ── */`). They reuse the existing CSS vars (`--bk`, `--s1`, `--s2`, `--g`, `--ga`, `--ta`, `--tb`, `--tx`, `--ts`, `--tm`, `--r2`) — **don't introduce new color tokens**. Buttons reuse `.btn`, `.btn-gold`, `.btn-outline`, `.btn-full`.

#### WhatsApp CTAs

`cpDemo()` opens `https://wa.me/<digits>?text=<msg>` with the demo intro message. `cpContact(plan)` is the same but the URL-encoded message includes the plan name (`Starter` / `Pro` / `Final`). Both read `CONFIG.coachPhone` directly — no `app_settings` lookup, because the B2B page is the static-pitch surface and shouldn't depend on DB state.

#### What was deliberately NOT done

- No new tables — the B2B page is pure pitch HTML, no lead capture form, no pricing logic.
- No analytics events — add an event hook later if needed.
- No translation — FR-only matches the rest of the landing's primary audience. Mirror the `{coach}` pattern when expanding.
- No back-to-platform CTA from inside the client/coach portals — the page is for prospects, not users.

---

## 20. Visual polish patches (Wave 4)

Four targeted fixes to align the running app with the intended design — no structural changes.

### 20.1 Orange expiry banner — removed

The amber/orange `#expiry-alert-banner` that injected itself above the coach dashboard ("⚠️ N clients expirent dans ≤3 jours — Voir Revenus") was removed. The whole `checkExpiringClients()` function is gone (search for the comment "Removed checkExpiringClients()" near line 6970), and the call from `loadCoachDash()` is gone with it.

**No data is lost** — the same predicate (active clients with `membership_expiry` within ≤7 days) is the source of Aujourd'hui §2 (À renouveler), which uses the existing `coachClients` array and surfaces in the Aujourd'hui overlay (§13). The banner had become redundant.

If you ever want a banner-style surface again, add a new Aujourd'hui section instead of reviving the orange gradient — it broke the dark-with-gold-accents convention.

### 20.2 Compliance ring on client list cards

`renderClientList()` (line ~8302) renders `complianceRing(c.last_compliance_score, 36)` as the **3rd column** of the bottom `.cc-stats` grid (alongside Kcal and Prot). The grid is already `repeat(3, 1fr)` so the ring drops in cleanly — the cell uses `display:flex; align-items:center; justify-content:center; padding:4px` to center the SVG. The plain text `Compl. NN%` is gone — the ring is the single source of truth for compliance on this surface.

The earlier attempt placed the ring in the top-right header cluster next to the flag/status stack. On narrow viewports it got squeezed by the flag column and visually disappeared. Bottom-row placement is the canonical spot — keep it there.

- **Null-safe**: `complianceRing` handles `null` / non-number scores by rendering at 0% with a muted stroke and `—` center label. Brand-new clients with no logs render gracefully.
- **Explicit SVG sizing**: `complianceRing` already sets both `width="${size}"` and `height="${size}"` on the `<svg>` element, so it renders at the intended pixel size regardless of parent flex sizing. Don't strip those attributes.
- **Animation**: the ring's CSS `ring-fill` keyframe (defined alongside `.compliance-ring-fg` in the main `<style>`) animates the arc from full circumference to the target offset. Combined with `staggerCards()` painting `.card-enter` on each `.client-card`, you get card-slide-in followed by ring-fill on initial dashboard load.
- **Don't reintroduce the bottom Compl. text stat or move the ring back to the header** — both regressions have been tried.

### 20.3 Aujourd'hui count badge — restyled

`#today-entry-count` (the pill in the entry card on the dashboard) was previously a solid gold fill — too much visual weight, competing with the card title. Now it's a tinted pill: `font-size:10px`, `font-weight:700`, `background:rgba(201,168,76,0.1)`, `border:1px solid rgba(201,168,76,0.2)`, `color:var(--g)`, `padding:3px 10px`, `border-radius:100px`. The text content is still painted dynamically by `refreshCoachTodayCount()` — only the static inline style changed.

### 20.4 Client bottom nav — verified

Confirmed in place at `<nav class="bottom-nav">` (line ~1209, inside `#client-screen`). Four tabs (🏠 Accueil / ✅ Check-in / 💬 Messages / 📊 Progression), sliding gold indicator at the top of the active tab, `switchTab(i)` correctly toggles `.active` via `data-tab` matching, `_moveNavIndicator()` reads `data-pos` to slide the indicator, `padding-bottom: env(safe-area-inset-bottom)`. No change needed — already covered by §18.

### 20.5 Sticky client expiry banner — removed

`openPortal()` previously injected a fixed-top orange banner ("⚠️ Ton abonnement expire dans N jours") into `document.body` when `membership_expiry` was within 7 days. That banner duplicated the same warning rendered as a card inside the Today/Accueil tab (`rToday` / `rHome`). The injection block in `openPortal()` is gone — only the in-tab card remains. Don't reintroduce a sticky banner: it competes with the bottom nav for vertical real estate and the in-tab card is already noticed.

### 20.6 Weekly report best-day filter

`renderWeeklyReport()` (line ~5492) now filters `presentDays` to only those with at least one non-zero metric (`calories_eaten > 0 || protein_eaten > 0 || steps > 0`) **before** picking the best day. A blank check-in row that exists but has all-zero values no longer wins as "Meilleur jour" — without the filter, every just-created log row scored 0 and any one of them could surface as the best day, displaying zeros.

If no day meets the threshold, the renderer shows `Pas de données cette semaine` instead. The compliance bar / poids stats / sparkline above are unaffected — they still use the unfiltered `presentDays` (those surfaces are intentionally permissive about zero rows because they aggregate counts, not pick a single best).

### 20.7 Empty sparkline fallback

`_renderSparkline(weights)` (line ~5462) used to render a dashed midline placeholder when fewer than 2 weight points existed in the window. The dashed line was visually empty and confusing. Now: `<2` known points returns a one-line muted message — `Pas encore de données de poids cette semaine` (`font-size:10px; color:var(--tm); text-align:center; padding:8px 0`). The "≥2 points" branch is unchanged.

### 20.8 Stray COACH label removed

The `<span>COACH</span>` floating below the `#client-chat-fab` chat bubble (the floating action button anchored bottom-right of the client portal) is gone. With the dedicated 💬 Messages tab in the bottom nav (§18), the FAB no longer needs a label — and the label visually clashed with the bottom nav on small viewports. The FAB button itself is kept (still useful as a quick-message shortcut from any tab).

### 20.9 Check-in date — French display

`renderCheckin()` (line ~3957) now hides the native `<input type="date" id="dl-date-select">` (positioned absolute, 1×1 px, opacity 0, no pointer-events) and shows a styled `<button id="dl-date-display">` that displays the date in French via `toLocaleDateString('fr-FR', {weekday,day,month,year})` with the first letter capitalized. Tap on the button calls `showPicker()` (with `.click()` fallback) to open the native picker. The hidden input's `onchange` still calls `loadCheckinForDate(this.value)`, which re-renders the entire view with the new date — no extra wiring needed for the visible label to update.

The stored value (`log_date`) stays `YYYY-MM-DD` — only the display layer changed.

### 20.10a Coach header — 5 visible items max

`coach-hdr-actions` (line ~1255) and `coach-hdr-fixed` (line ~1261) together expose at most 5 buttons: 💬 (with `#coach-msg-badge`), `+ Client`, ⋯, 🔔, ⏻. The two broadcast buttons (`📣` solo broadcast, `📣 Groupé` group message) **moved into the ⋯ menu at the top of the list** — they call `showBroadcast()` and `openGroupMsg()` respectively. Order in the ⋯ menu now: 📣 Broadcast → 📣 Message groupé → 💰 Revenus → 📊 Compliance → 👥 Communauté → 📝 Claude Notes → ⚙️ Settings. **Don't add new visible buttons** — push new actions into the ⋯ menu so the header stays at 5.

The 💬 button keeps its real-time unread badge wired by `updateCoachMsgBadge()`. The `+ Client` button keeps `id="coach-add-btn"` so the existing click binding at boot still hooks up.

### 20.10b Client header — verified clean

`<header class="app-hdr">` (line ~1165) renders only: SVG logo + initials span (left); client name (`#c-hdr-name`) + 🔔 (`#c-notif-btn`) + ⏻ (right). No extra buttons. Spec already satisfied — no change.

### 20.11 Visual consistency tweaks

- **Rapport semaine icon** — header glyph in `renderWeeklyReport()` (line ~5569) is now 📋 (not 📊). The 📊 emoji had Apple-default colour and visually clashed with the gold-accent rest of the app. 📋 is gold-on-dark monochrome and fits the icon language.
- **Mot du coach auto-message emojis** — the three auto-strings (≥80% / ≥50% / <50%) are now stored as `{text, emoji}` pairs (`autoNote` literal in `renderWeeklyReport`). Rendered as `"{text}" {emoji}` so the emoji sits OUTSIDE the closing quote mark. Coach-written `coach_notes` are still rendered as-is in quotes (no emoji appended) — the `isAutoNote` flag gates the suffix.
- **Orphan TOTAL tile removed** — the 5th tile in the dashboard `overview` (`coachClients.length`/Total) is gone. The grid is back to a clean 4-tile row (Abonnés / Programme / En attente / Expirent). Verified: no JS reads that tile's value (it had no id and wasn't referenced). The separate Total tile in the revenue overview (line ~7459) is unaffected — different surface, has its own context.

### 20.10 Client can delete their own check-in

When the selected day already has a `daily_logs` row, `renderCheckin()` now renders a small muted `🗑 Supprimer ce check-in` text-style button below the save button. `deleteClientCheckin(id, dateISO)` runs `confirm()` then:

```js
sb.from('daily_logs').delete().eq('id', id).eq('client_id', CC.id);
```

The `.eq('client_id', CC.id)` filter is **mandatory** — never remove it. It's the safety guarantee that a client can only delete their own logs. After delete, `loadCheckinForDate(dateISO)` re-renders the form (now empty), and a brief `✓ Check-in supprimé` message paints into the existing `#dl-ok` element for 2s.

Coach-side check-in tooling is untouched.

### 20.12 Null-body messages skipped

Both `loadClientMsgs()` (line ~5942) and `renderCoachMessages()` (line ~9906) now filter out rows where `comment` and `body` are both empty/null/whitespace before rendering bubbles. The render path picks `m.comment || m.body || ''` so legacy rows that happen to use a `body` column still display. Empty rows produced by aborted send flows no longer leak as ghost bubbles.

### 20.13 Default UI language is French

`T()` and `applyLanguage()` now default `lang` to `'fr'` (was `'en'`) when `CC?.language` is unset. The fallback chain is FR dict → EN dict → fallback arg → key. This is the primary-audience default; clients with `language: 'en'` (or `'ar'`) on their `clients` row still get their chosen translation. **Don't reintroduce `'en'` as the lang default** — it caused tile labels (`Start` / `Current` / `Goal`, `Weight`, `Measurements`) to render in English for new sessions before language was loaded.

### 20.14 Weight progress polish

Three small fixes to the Progrès → Poids surface (`renderWeightProgress()` line ~4815 and `initProgressCharts()` line ~4870):

- **Date inside `Départ` tile** is wrapped in `<span style="text-transform:none;letter-spacing:0">` and `.toLowerCase()`'d so the `.tile-lbl` `text-transform:uppercase` doesn't yell `(13 AVR)` — it now reads `DÉPART (13 avr)`.
- **Weight chart x-axis** dedupes consecutive same-date labels: when two logs share a calendar day (multi-weigh-in), the second tick is `''` so the date doesn't repeat.
- **Vue semaine empty week** in `renderWeeks()` (line ~4136): if a week has no logs with any non-zero metric AND any of its dates is today/future, the compliance number is replaced by `En cours` in `var(--g)` at 14px (instead of red `0%`). Past weeks with no data show `0%` in `var(--tm)` (muted) — informational, not alarming. The progress bar is hidden in both empty cases.

### 20.15 Today tab — full French date

`rToday()` (line ~3550) replaces the bare day-name label (`Vendredi`) with the full French date `Vendredi 1 mai 2026`, computed via `toLocaleDateString('fr-FR', {weekday, day, month, year})` and capitalized. The `DNAMES` constant is no longer used in this renderer — `toLocaleDateString` does the right thing across locales.

### 20.16 Rapport card glyph removed

The 22px `📊` glyph in the top-right of the weekly report card (`renderWeeklyReport()` ~ line 5571) is gone. The `RAPPORT` / `SEMAINE …` heading carries enough weight on its own. The earlier swap to `📋` was deemed redundant — the full removal is cleaner.

---

## 21. Brand experience overlay (`#brand-experience`)

A cinematic 7-scene story that plays over the landing page. Premium pitch, autoplays, drives prospects to the programs grid.

### Where

- Element: `<div id="brand-experience">` (line ~1306) — fixed `inset:0`, `z-index:9999`, hidden by `display:none` until `.be-active` is added.
- Stage child: `.be-stage` — `100vw × 100vh` on mobile; `440 × 900px` centered on desktop (≥600px). The cinematic was designed for 390 × 844 portrait; the desktop frame is the closest comfortable container without re-typesetting.
- Scoped CSS block: search for `BRAND EXPERIENCE OVERLAY` near line 1182. **All classes prefixed `.be-`** and all selectors scoped under `#brand-experience`. No collisions with the landing or app CSS.
- Source: `coach_sammy_pro_v3.html` — embedded verbatim with class/ID prefixing.

### Triggers

- **Hero button**: `<button id="hero-experience-btn">▶ Voir l'expérience</button>` (line ~878) — outline pill, secondary to the gold "Start your transformation" CTA. Calls `openBrandExperience()`.
- **First-visit auto-open**: 1s after `DOMContentLoaded`, *if* `localStorage['brand-experience-seen']` is unset *and* `prefers-reduced-motion: reduce` is NOT matched *and* `#landing.active` is currently visible (so a returning client/coach session never gets yanked into the overlay).
- **Reduced motion**: skips auto-open. The hero button still works on demand. The story's transitions are clamped via the existing §16 catch-all (only the keyframes that don't have `!important` are clamped — the in-overlay rules respect the catch-all because they don't hardcode duration overrides).

The `localStorage` flag is set on **either** first open OR first close (skip / CTA), so the auto-open only fires once.

### Navigation

- **Tap left 28% of stage** → previous scene (clamped at 0).
- **Tap elsewhere** → next scene; loops back to 0 after scene 6 (CTA).
- **Skip button** (top-right `× Skip`, 11px letter-spacing 2px, `rgba(255,255,255,0.4)`) calls `closeBrandExperience()`. The click handler short-circuits when `e.target.closest('.be-skip')` matches, so tapping skip never advances the scene.
- **Final CTA** (`.be-s7-cta` "Commencer maintenant →" gold pill on scene 7) calls `closeBrandExperience()` then `document.getElementById('land-programs').scrollIntoView({behavior:'smooth', block:'start'})`. The handler `event.stopPropagation()`s so the click doesn't bubble to the stage's tap-zone listener.

### Autoplay

`DURS = [3500, 5500, 5000, 4500, 5500, 5500, 6000]` ms per scene. The progress bar at the top is 7 segments — fills via CSS `transition: width Nms linear`. `goTo(i)` resets all `.be-fade.be-show` flags, fills past segments instantly, starts the current one's transition, and schedules the next scene via `setTimeout` (cleared on user nav or close so we never double-fire).

Scene 7 (CTA) does NOT auto-advance — `if (i < 6)` gate.

### TODO i18n (FR-only today)

The scene copy is FR-only. EN/AR copy lives in `coach_sammy_pro_en.html` and `coach_sammy_pro_ar.html`. To wire:

1. Promote each scene's text into a JS object keyed by language (e.g. `BE_COPY = { fr: {...}, en: {...}, ar: {...} }`).
2. At `openBrandExperience()`, read `CC?.language || 'fr'` (or — for prospects without a session — a `localStorage['lang']` set by the landing language toggle).
3. Inject the right strings into each scene's elements via `innerHTML` before calling `goTo(0)`.
4. For Arabic, also set `dir="rtl"` on `#brand-experience` and flip the tap-zone (left 28% → "next" instead of "prev"). The text-left/text-right rules in the FR scenes will need RTL-aware swaps — easiest is a `.be-rtl` modifier class.

Currently a `TODO i18n` comment lives in the HTML block above the overlay so future contributors don't miss it.

### What was deliberately NOT done

- No keyboard navigation (arrow keys, Esc) — pure tap/click. Arrow + Esc are easy to add inside `onStageClick` and a global `keydown` listener; left as a follow-up because the Skip button covers the dismiss case and most users won't have a keyboard.
- No dwell tracking / analytics — add a `data-event` hook and a `dispatchEvent('brand-experience:scene')` per `goTo` call when telemetry is wired.
- No fade-out animation on close — instant. Fine for an overlay; matches the modal language.

---

## 22. Coach authentication (Supabase Auth) + RLS plan

**The hardcoded coach password is gone.** Coach login now uses Supabase Auth (email + password) with role verification against a `profiles` table. The localStorage bypass (`cls_session='coach'`) is also gone — the boot path reads `sb.auth.getSession()`, never the legacy flag.

### What changed in the code

| Before                                                           | After                                                                                  |
|------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `CONFIG.coachPassword = 'sammy2024'`                             | Field removed. A comment block notes the move to Supabase Auth.                        |
| `const CPW = CONFIG.coachPassword`                               | Removed.                                                                               |
| `coachLogin()`: `if (pw !== CPW) error`                          | `coachLogin()`: `await sb.auth.signInWithPassword({email, password})` then `select role from profiles where id = auth.uid()`; reject if role !== 'coach' (and `signOut()` to invalidate). |
| `coachLogout()`: clears `cls_session` localStorage              | `coachLogout()`: `await sb.auth.signOut()` first, then defensive cleanup of legacy keys. |
| Boot: `if (localStorage.cls_session === 'coach') showCoach...`  | Boot: `_assertCoachSession()` reads `sb.auth.getSession()` and verifies role from `profiles`. Legacy `cls_session='coach'` is actively cleaned on every boot. |
| No frontend guard                                                | `_assertCoachSession()` runs at the top of `loadCoachDash()` and `openCoachClient()` and forces a logout + relogin if the session is missing or role !== 'coach'. |
| Modal: 1 password field                                          | Modal: email + password, with `autocomplete` hints, an inline error region, and a disabled-while-submitting button. |

### What this does NOT do

**Frontend security alone is theatre.** Anyone with DevTools can patch `_assertCoachSession()` to return `{role:'coach'}`, call `showScreen('coach-screen')`, and run `sb.from('clients').select('*')` directly with the anon key. **Until RLS is enabled with the policies below, the entire database is readable by anyone with the anon key.** The frontend guards prevent accidental UX leaks; they do not enforce access control.

The client portal has a separate, **also-insecure** legacy flow: clients log in by matching `clients.password` (plaintext column) and the resulting "session" is a `cls_session='client'` localStorage key. That flow was not touched in this pass — it's a much larger migration (every client query would need to assume `auth.uid()`-based RLS instead of the open anon key). See the TODO at the end of this section.

### SQL setup — run these in the Supabase SQL editor

> **Order matters.** Run the blocks top-to-bottom. Each block is idempotent (uses `if not exists` / `or replace`).

#### 1. `profiles` table

```sql
-- Mirrors auth.users with a single extra column: role.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null check (role in ('coach','client')) default 'client',
  created_at timestamptz default now()
);

-- Auto-create a profile row whenever a new auth user signs up. Default role: client.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'client')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

#### 2. Create the coach account

In **Supabase Dashboard → Authentication → Users → Add user → Create new user**, create the coach email + password. The trigger above will insert a `profiles` row with `role='client'`. Promote it:

```sql
update public.profiles set role = 'coach'
  where email = 'YOUR_COACH_EMAIL@example.com';
```

After this, `coachLogin()` accepts that email + password. Wrong-role accounts get `Accès refusé — ce compte n'est pas un coach.`

#### 3. `is_coach()` helper

```sql
-- Used by every RLS policy below. SECURITY DEFINER so it runs with the postgres role
-- and can read the profiles table even before policies are applied to it.
create or replace function public.is_coach() returns boolean
language sql stable security definer as $$
  select exists(
    select 1 from public.profiles
    where id = auth.uid() and role = 'coach'
  );
$$;
```

#### 4. RLS policies (the actual security boundary)

> ⚠️ **Enabling RLS on tables the client portal currently reads will break the client portal until clients are migrated to Supabase Auth.** You have two options:
>
> - **(A) Coach-only tables first**: enable RLS on tables clients never touch (`claude_notes`, `coach_notifications`, `app_settings`, `landing_config`, `transformations`, `testimonials`, `products`, `orders`, `promo_codes`, etc.). Coach app keeps working; client app is unaffected.
> - **(B) Full migration**: enable RLS on every table AND migrate clients to Supabase Auth at the same time (see the TODO below). This is the right end state but a much bigger piece of work.
>
> The block below is the **end-state policy set**. Apply it in stages.

```sql
-- ── PROFILES ─────────────────────────────────────────
alter table public.profiles enable row level security;
create policy "self_read"     on public.profiles for select using (id = auth.uid());
create policy "self_update"   on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "coach_read_all" on public.profiles for select using (public.is_coach());
-- Role escalation is forbidden: a client cannot self-promote to coach because the
-- self_update WITH CHECK pins role to its current value. Only a coach (or service
-- role / SQL editor) can change a role.

-- ── CLIENT-LINKED DATA — coach has full access ───────
alter table public.clients enable row level security;
create policy "coach_all" on public.clients for all using (public.is_coach()) with check (public.is_coach());
-- TODO: client self-access policy. Once clients log in via Supabase Auth and
-- clients.id = auth.uid(), add:
--   create policy "client_self" on public.clients for all
--     using (id = auth.uid()) with check (id = auth.uid());

alter table public.daily_logs enable row level security;
create policy "coach_all" on public.daily_logs for all using (public.is_coach()) with check (public.is_coach());
-- TODO: client self-access — using (client_id = auth.uid())

alter table public.weight_logs enable row level security;
create policy "coach_all" on public.weight_logs for all using (public.is_coach()) with check (public.is_coach());

alter table public.client_photos enable row level security;
create policy "coach_all" on public.client_photos for all using (public.is_coach()) with check (public.is_coach());

alter table public.food_logs enable row level security;
create policy "coach_all" on public.food_logs for all using (public.is_coach()) with check (public.is_coach());

alter table public.intake_forms enable row level security;
create policy "coach_all" on public.intake_forms for all using (public.is_coach()) with check (public.is_coach());

alter table public.training_sessions enable row level security;
create policy "coach_all" on public.training_sessions for all using (public.is_coach()) with check (public.is_coach());

alter table public.full_programs enable row level security;
create policy "coach_all" on public.full_programs for all using (public.is_coach()) with check (public.is_coach());

alter table public.raw_programs enable row level security;
create policy "coach_all" on public.raw_programs for all using (public.is_coach()) with check (public.is_coach());

alter table public.meal_plans enable row level security;
create policy "coach_all" on public.meal_plans for all using (public.is_coach()) with check (public.is_coach());

alter table public.diagnostics enable row level security;
create policy "coach_all" on public.diagnostics for all using (public.is_coach()) with check (public.is_coach());

alter table public.exchange_tables enable row level security;
create policy "coach_all" on public.exchange_tables for all using (public.is_coach()) with check (public.is_coach());

alter table public.client_comments enable row level security;
create policy "coach_all" on public.client_comments for all using (public.is_coach()) with check (public.is_coach());

alter table public.notifications enable row level security;
create policy "coach_all" on public.notifications for all using (public.is_coach()) with check (public.is_coach());
-- TODO: client self-access — using (client_id = auth.uid())

alter table public.voice_notes enable row level security;
create policy "coach_all" on public.voice_notes for all using (public.is_coach()) with check (public.is_coach());

alter table public.ai_recommendations enable row level security;
create policy "coach_all" on public.ai_recommendations for all using (public.is_coach()) with check (public.is_coach());

-- ── COACH-ONLY TABLES (no client access ever) ───────
alter table public.claude_notes enable row level security;
create policy "coach_all" on public.claude_notes for all using (public.is_coach()) with check (public.is_coach());

alter table public.coach_notifications enable row level security;
create policy "coach_all" on public.coach_notifications for all using (public.is_coach()) with check (public.is_coach());

alter table public.app_settings enable row level security;
create policy "coach_write" on public.app_settings for all using (public.is_coach()) with check (public.is_coach());
create policy "anon_read"   on public.app_settings for select using (true);
-- White-label values must be readable by anonymous landing visitors.

alter table public.landing_config enable row level security;
create policy "coach_write" on public.landing_config for all using (public.is_coach()) with check (public.is_coach());
create policy "anon_read"   on public.landing_config for select using (true);

alter table public.transformations enable row level security;
create policy "coach_write" on public.transformations for all using (public.is_coach()) with check (public.is_coach());
create policy "anon_read"   on public.transformations for select using (true);

alter table public.testimonials enable row level security;
create policy "coach_write" on public.testimonials for all using (public.is_coach()) with check (public.is_coach());
create policy "anon_read"   on public.testimonials for select using (is_visible = true);

-- ── STORE / PROMO / ORDERS (if these tables exist in your project) ──
-- Only coach manages, only coach reads orders. Anonymous can read products if
-- the store is publicly browseable.
alter table public.products enable row level security;
create policy "coach_write" on public.products for all using (public.is_coach()) with check (public.is_coach());
create policy "anon_read"   on public.products for select using (true);

alter table public.orders enable row level security;
create policy "coach_all" on public.orders for all using (public.is_coach()) with check (public.is_coach());

alter table public.promo_codes enable row level security;
create policy "coach_all" on public.promo_codes for all using (public.is_coach()) with check (public.is_coach());
```

#### 5. Storage policies

The `client-photos` bucket holds progress photos, voice notes, and transformation media. Public-bucket policies live in **Storage → Policies** in the Supabase dashboard. Recommended:

- **Read**: keep public (the app generates `getPublicUrl()` for everything).
- **Insert/Update/Delete**: restrict to authenticated coach OR (when migrated) the row's owner client.

```sql
-- Example: only coach can upload to the coach-only paths.
create policy "coach_upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'client-photos' and public.is_coach());
create policy "coach_modify" on storage.objects for update to authenticated
  using (bucket_id = 'client-photos' and public.is_coach());
create policy "coach_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'client-photos' and public.is_coach());
```

### What CANNOT be secured from the frontend

**These are server-side / Supabase concerns. Frontend code cannot enforce them.**

1. **Anyone with the anon key can call any unprotected table.** The anon key is in `CONFIG.supabaseKey` and visible in the page source — that's by design for Supabase clients. **The only thing keeping unauthorized reads/writes out is RLS.** Until you enable the policies above, the frontend guards are decorative.
2. **Anyone with DevTools can patch any JS function.** `_assertCoachSession`, the role check in `coachLogin`, every UI gate — all bypassable client-side. RLS is the only enforcement.
3. **The legacy client `clients.password` column is plaintext.** Migrating clients to Supabase Auth is the only fix. Until then, anyone reading a client's row sees their password — a coach with `is_coach()` = true gets every client's plaintext password back. This is a privacy issue for the coach side too (a leaked coach session exposes plaintext client passwords). Hash before this gets ported anywhere else.
4. **Storage URLs are public.** Anything in the `client-photos` bucket is readable by anyone with the URL. Don't put sensitive data there.
5. **Edge Functions** (`/functions/v1/ai-coach`, the `parse-client-paste` route mentioned in §6) run with the anon key from the browser — they need their own role check on the server side. If you have Edge Functions that perform privileged actions, the function itself must call `auth.getUser()` and verify role, **not just trust the JWT**.

### Migration TODO — clients to Supabase Auth

This was deliberately left out of this pass. Rough plan when you tackle it:

1. For each existing `clients` row, create a corresponding `auth.users` row (Supabase admin API + an idempotent backfill script).
2. Set `clients.id = auth.users.id` (or add a `clients.auth_user_id uuid references auth.users(id)` column and use it in policies).
3. Replace the client login modal with email + password (or magic link / OTP), call `sb.auth.signInWithPassword`, drop `cls_session='client'`, drop the plaintext `clients.password` column.
4. Add the `client_self` policies marked TODO above. After enabling, every client query in the codebase must run under the user's JWT (it already does — `sb` is the same client — but RLS must allow it).
5. Rip `canClientAccess` and the `clients.password`-based session restore.

Until step 5, clients will continue to work without a JWT (anon key only) and will be locked out of any table with strict RLS. Stage the policy enables to coach-only tables first.

### Error handling — what each surface returns

| Failure mode                   | Where caught                                  | User sees                                                  |
|--------------------------------|-----------------------------------------------|------------------------------------------------------------|
| Wrong email/password           | `coachLogin()` `signInWithPassword` error     | "Email ou mot de passe incorrect."                         |
| Network down                   | `signInWithPassword` `/network|fetch/` error  | "Erreur de connexion. Vérifie ton réseau."                 |
| Auth OK but no `profiles` row  | `coachLogin()` `pErr` branch                  | "Impossible de vérifier le rôle. Vérifie la configuration Supabase." |
| Auth OK, role = 'client'       | `coachLogin()` role-mismatch branch + `signOut()` | "Accès refusé — ce compte n'est pas un coach."          |
| Session expired mid-use        | `_assertCoachSession()` returns null          | Force logout, reopen `m-coach-login`                       |
| Tampered localStorage          | Boot path actively clears `cls_session='coach'` legacy key | n/a — silent cleanup                            |
| `signOut()` network failure    | `coachLogout()` try/catch                     | Local state cleared anyway; UI returns to landing          |

---

## 23. Nav restoration — Plan / Programme tabs back

Both bottom nav (client) and detail tabs (coach) regained the previously-collapsed Plan/Programme surface. **Plan content was always rendered in the SPA** (the `tab-plan` div + `rPlan` renderer never went away) — just hidden from the visible nav. Same on the coach side: `renderCoachMealPlan` was inlined into Suivi but the renderer existed all along.

### 23.1 Client bottom nav — 5 tabs

`<nav class="bottom-nav">` (line ~1570) now has 5 buttons. CSS grid is `repeat(5, 1fr)` and the sliding indicator is `width: 20%` (was 25%). Label `font-size: 9px` and `padding: 8px 2px` so "Progrès" / "Check-in" don't truncate on narrow viewports.

| Position | data-tab | data-pos | Icon | Label       | Renderer (`fns[]` index) |
|----------|----------|----------|------|-------------|--------------------------|
| 0        | 0        | 0        | 🏠   | Accueil     | `rToday`                 |
| 1        | 1        | 1        | ✅   | Check-in    | `rJournal`               |
| 2        | 2        | 2        | 📋   | **Plan** *(restored)* | `rPlan` (existing — `renderProgramme` + `renderNutritionTab` + `renderOverload` + `renderStepsTracker` + `renderClientExchange`) |
| 3        | 7        | 3        | 💬   | Messages    | `rMessages` — uses `#client-msgs-wrap-tab` |
| 4        | 3        | 4        | 📊   | Progrès     | `rProgress`              |

The tab-content array (`ids[]` and `fns[]`) inside `switchTab` / `renderTab` / `refreshTab` is unchanged — those arrays already had `tab-plan` / `rPlan` at index 2. Only the visible nav was extended.

The "Progression" label was renamed to "Progrès" to fit the 5-column grid without wrapping. The data-tab and renderer (`rProgress`) are unchanged.

### 23.2 Coach detail tabs — 5 tabs

`coach-tab-bar` (line ~9337) now has 5 buttons. The Programme tab was promoted out of Suivi into its own slot so the coach can edit nutrition without scrolling through tracking + sessions + exchange.

| New idx | Title       | Composes                                                                   |
|---------|-------------|----------------------------------------------------------------------------|
| 0       | Aperçu      | `renderCoachOverview` + collapsible `renderCoachDiagnostic`                |
| 1       | Suivi       | `renderCoachTracking` → `renderCoachSessions` → `renderCoachExchange` (no longer mealplan) |
| 2       | 📋 Programme *(restored)* | `renderCoachMealPlan` + `renderCoachSessions` (`Promise.all`, concat with a `💪 Programme entraînement` divider). |
| 3       | Messages    | `renderCoachMessages` (unchanged content, index changed)                   |
| 4       | Progression | `renderCoachProgression` + `renderCoachCompliance`                         |

`renderCoachProgrammeTab(c)` `Promise.all`s `renderCoachMealPlan` and `renderCoachSessions` and renders meal plan first, then sessions under a `💪 Programme entraînement` `.sec` divider. **Sessions are also still rendered inside Suivi** — appearing in both tabs is intentional. The coach uses Suivi for day-to-day check-in review (where sessions live alongside tracking + exchange) and Programme as the dedicated authoring surface (meal plan + training together). Don't deduplicate; both surfaces share the same renderer output, so edits made via either path land in the same `training_sessions` / `meal_plans` rows.

`COACH_TAB_IDX.sessions` is still `1` (Suivi). That's by design: legacy callers like `loadCoachTab(mapTabIndex(2), …)` (post-program-generate, post-paste-sessions, post-add-session, etc.) keep landing on Suivi, where the coach traditionally finishes the workflow. If you want any of those flows to land on Programme instead, change the call sites individually — don't repoint `COACH_TAB_IDX.sessions`.

#### Updated `COACH_TAB_IDX`

```js
const COACH_TAB_IDX = {
  overview:    0,
  diagnostic:  0,
  checkin:     1,
  sessions:    1,
  exchange:    1,
  mealplan:    2,   // <-- promoted from 1 to its own Programme tab
  messages:    3,   // <-- shifted +1
  progression: 4,   // <-- shifted +1
  compliance:  4,
};
```

Named callers (`COACH_TAB_IDX.messages`, `.checkin`) automatically get the new indices — Aujourd'hui §1 / §5 deep-links from §13 keep working with no edits.

#### Updated `mapTabIndex` (legacy 0–8 → new 0–4)

```js
function mapTabIndex(old){
  const m = {0:0, 1:1, 2:1, 3:2, 4:3, 5:4, 6:4, 7:1, 8:0};
  return m[old] ?? old;
}
```

Differences from the prior 4-tab map:
- **`3` (Plan Repas) → 2 (Programme)** — was 1.
- **`4` (Messages) → 3** — was 2.
- **`5` (Compliance) → 4** — was 3.
- **`6` (Progression) → 4** — was 3.

Indices 0, 1, 2, 7, 8 are unchanged.

#### Safety net

`loadCoachTab` runs `if (idx > 4) idx = mapTabIndex(idx)` (was `> 3`). Indices 0–4 pass through as new range. Old `4` (Messages) collides with new `4` (Progression) — every legacy caller passing literal old indices was already wrapped with `mapTabIndex(...)` in §18, so the collision can't fire from existing code. **If you add a new coach action that calls `loadCoachTab(N, …)`, treat indices 2/3/4 as NEW unless you explicitly wrap with `mapTabIndex(...)` for legacy meaning.**

#### Audited call sites (all green)

26 call sites total, all routing to the right new tab:

- 16 calls of `loadCoachTab(mapTabIndex(2), …)` (legacy Séances / raw program / paste sessions / etc.) → **Suivi (1)** ✓
- 4 calls of `loadCoachTab(mapTabIndex(3), …)` (legacy Plan Repas) → **Programme (2)** ✓
- 1 call of `loadCoachTab(mapTabIndex(4), …)` (legacy sendCoachMsg) → **Messages (3)** ✓
- 3 calls of `loadCoachTab(mapTabIndex(6), …)` (legacy Progression / AI rec approve/reject) → **Progression (4)** ✓
- 2 calls of `loadCoachTab(mapTabIndex(1), …)` (saveCoachCheckin / deleteCoachCheckin) → **Suivi (1)** ✓
- The 5 buttons in the new tab bar pass new indices 0/1/2/3/4 directly — no wrapping needed.
- `loadCoachTab(0, id, …)` at end of `openCoachClient` → **Aperçu (0)** ✓
- Aujourd'hui drill-down deep-links use `COACH_TAB_IDX.messages` (3) and `.checkin` (1) — automatic.

---

## 24. Store as a dedicated full page (`#store-screen`)

The supplements store is now a full screen (sibling of `#coach-platform`, `#client-screen`, etc.) with the cart and checkout **always visible** inside it. The legacy `m-supplements` and `m-cart` modals are still in the DOM but no entry point reaches them.

### Why

Old flow: tap "💊 Supplements" → `m-supplements` modal opens with products. Add an item → cart-fab appears. Tap cart-fab → SEPARATE `m-cart` modal opens with the cart. The user is yanked out of the store to see what's in the cart. Two parallel cart UIs (`store-cart-bar` inside the supplements modal, `m-cart` modal triggered by the fab) with two parallel promo input fields.

New flow: one screen, one cart, one promo field. Mobile gets a sticky pill that scrolls to the inline checkout. Desktop gets a sticky sidebar with the checkout always in view.

### Entry points

| Trigger | Lands at |
|---|---|
| Landing hero "💊 Supplements" button | `showSupplements()` → `showScreen('store-screen')` |
| `cart-fab` (was `openCart()`, now `showSupplements()`) | back to the store screen |
| URL hash `#store` (boot or hashchange) | `showSupplements()` |
| Coach "💊 Gérer le Store" (`showSupplementsManager()`) | **untouched** — separate coach-side flow |

`backToLandingFromStore()` is the back button (top-left of the store header). It clears the `#store` hash.

### Layout

`<div id="store-screen" class="screen">` (line ~1577) → `.store-wrap` grid (mobile: 1 col; ≥900px: 2 cols `minmax(0,1fr) 360px` with the checkout column `position: sticky; top: 24px`).

- **Header**: ← Retour, "💊 Boutique", subtitle ("Sélectionnés par {coach name}").
- **Product grid** (`#store-grid`): `repeat(auto-fit, minmax(240px, 1fr))` cards. Each card has image area (1:1 aspect), name, description, price, and either a `+ Panier` button OR an inline qty selector (`−` `n` `+`) when the item is already in the cart.
- **Inline checkout** (`#store-checkout`): items list with per-line `−` `n` `+` `✕`, Sub-total → promo line → Total, promo input + OK, name input, phone input, big gold WhatsApp CTA showing the live total.
- **Mobile sticky pill** (`.sp-sticky`): bottom-center, gold, shows count + total + chevron, scrolls to `#store-checkout` on tap. Hidden on desktop (≥900px) since the sidebar is always visible. Hidden on any viewport when cart is empty.

### Out-of-stock behaviour

The `supplements.out_of_stock` boolean is the only stock signal — there's no per-quantity stock counter. The card respects this:

- **Card greyed**: `.sp-card.oos` adds `opacity:.55` + `filter:grayscale(.6)`.
- **Diagonal "RUPTURE DE STOCK" banner** painted on the image area (rotated −6°, red bg, white border, gold-ratio shadow).
- **Price strikethrough** + "Indisponible" text where the buy button would be.
- **No Add button rendered** — the OOS branch in `renderStoreGrid` simply omits it.
- **`addToCart()` defensive guard**: even if a stale card or a console call tried to add an OOS product, the function looks up `_storeProducts` by id and bails if `out_of_stock` is true. Cart is never polluted with OOS items.

If you need real per-quantity stock caps later, add a `supplements.stock_qty` integer column and:
1. Read it into the cart line on add.
2. Cap `changeQty(+1)` at `stock_qty`.
3. When `stock_qty <= 0`, treat the same as `out_of_stock = true`.

### Cart behaviour

- `cart` array (module-scope) stores `{id, name, price, priceStr, qty}` per line.
- `appliedPromo` (module-scope) caches the active promo row.
- `addToCart` / `changeQty` / `removeFromCart` all mutate cart, then call `updateCartUI()` (sticky pill + fab) AND `renderStoreGrid()` (so qty selectors flip back to "+ Panier" when count hits 0) AND `renderStoreCheckout()` (so totals update).
- `applyStorePromo()` reads `#store-promo-input`, hits `sb.from('promo_codes').select('*').eq('code', code).eq('active', true)`. Empty input clears `appliedPromo`. Invalid code shows `❌ Code invalide ou expiré.` Network/auth error shows the message inline.
- **After a successful WhatsApp checkout**: cart and `appliedPromo` are cleared, the checkout panel paints `✓ Commande envoyée sur WhatsApp.` and the grid re-renders (cards lose their qty selectors). User stays on the store screen — they can add more items immediately.

### Checkout — name + phone capture

The checkout panel always shows two inputs:

- **Ton nom** (`#store-name`) — pre-filled from `CC.name` if a client is logged in.
- **WhatsApp** (`#store-phone`) — pre-filled from `CC.whatsapp` if available.

Anonymous landing visitors (no `CC`) get blank inputs. `checkoutCart()` validates BOTH on the store screen (refuses to send if blank, focuses the offending field, shows `Ton nom est requis…` / `Ton numéro WhatsApp est requis…`). The legacy `m-cart` modal path skips this validation to preserve old behaviour.

### WhatsApp message format

```
Bonjour {COACH_NAME()}, je confirme cette commande ✅

👤 {name}
📞 {phone}

• {Product 1} × 2  @ 4 500 DA  = 9 000 DA
• {Product 2} × 1  @ 3 200 DA  = 3 200 DA
Sous-total: 12 200 DA
🏷 Code promo: WELCOME10 (−1 220 DA)

💰 Total: 10 980 DA
```

Built in `checkoutCart()`; URL-encoded and opened via `https://wa.me/{COACH_PHONE()}?text=…` in a new tab.

### What did NOT change

- **Coach-side store manager** (`showSupplementsManager()`, line ~11216) — separate function, untouched. Coach still manages products through their own form.
- **Promo code manager** (`showPromoManager()`, `savePromoCode`, `togglePromo`, `deletePromo`) — untouched.
- **`supplements` table schema** — same columns (`id, name, description, price, image_url, whatsapp_msg, out_of_stock, active, sort_order`).
- **`promo_codes` table schema** — same columns (`code, discount_pct, discount_fixed, description, active`).
- **WhatsApp deep-link mechanism** — still `COACH_WA_LINK()?text=…` opened in a new tab.

### Bugs found while implementing

1. **`m-supplements` modal HTML lives outside `</html>`** (line ~11738 in the file). Browsers tolerate it but it's malformed. The modal is no longer used; consider deleting it (and the `m-cart` modal at line ~2248) on the next pass — they're ~50 lines of dead code each.
2. **Two parallel promo flows existed**: `applyStorePromo()` (used by the store-cart-bar) and `applyPromoCode()` (used by m-cart). Each wrote to a different DOM input (`store-promo-input` vs `cart-promo-input`) and they weren't kept in sync — applying a code in one place wouldn't reflect in the other. The new flow has a single promo input inside `#store-checkout`; the legacy `applyPromoCode()` is still wired to its own modal but irrelevant in the new path.
3. **`cart` items used numeric ids** but `addToCart` previously didn't normalize (Supabase uuid strings sometimes, integer literals from the static `SUPPLEMENTS` array other times). I now coerce to `String(id)` everywhere on the cart side so `find()` lookups don't miss.
4. **`updateCartUI` referenced `#cart-fab` unconditionally** — would throw on pages without the fab in the DOM. Now wrapped in `if (fab)`.
5. **The legacy `cart-fab` opened a modal that hid the products** — exactly the symptom you reported. Now it deep-links back to the store screen instead.
6. **Default UI lang change in §20.13** — `T()` now defaults to `fr`. Store strings are already French throughout, so no impact, but worth noting.

### What requires Supabase / no frontend fix

- Real per-quantity stock caps: requires a `stock_qty` column.
- Decrementing stock on order: requires a server-side hook (Edge Function or Stored Procedure) that runs after the WA tab opens. Currently nothing decrements stock — the coach updates `out_of_stock` manually when fulfilling.
- Order audit trail: there's no `orders` table written to today (the WA hand-off is the only "record"). If you want order tracking in DB, insert into an `orders` table just before opening `wa.me` and add the right RLS (see §22).

---

## 25. Polish pass — language consistency + landing cleanup

Eight targeted fixes. No structural changes — copy edits, an icon swap, and one DOM removal.

### 25.1 Hero "💊 Supplements" button removed

The third hero CTA (`#hero-supps`, line ~928) is gone. The `showSupplements()` function, the entire `#store-screen` (§24), and the cart-fab deep-link still work — `showSupplements()` is still callable from the cart-fab and from the `#store` URL hash. Only the landing entry point was removed.

### 25.2 Landing copy fully French

Targets everywhere users could see English on the landing flow:

| Site | Before | After |
|---|---|---|
| Loading screen `.ls-title` (line 852) | "Your new life starts today" | "Ta nouvelle vie commence aujourd'hui" |
| `#land-tagline` static (line 919) | "Your new life starts today" | "Ta nouvelle vie commence aujourd'hui" |
| `#hero-btn3` static | "Start your transformation →" | "Commencer ma transformation →" |
| `#nav-already` static | "Join →" | "Rejoindre →" |
| `#nav-login` static | "Login" | "Connexion" |
| `m-start-transformation` modal title | "Start your transformation 🔥" | "Commencer 🔥" |
| `#stat-countries` static + dynamic fallback in `loadLanding()` | "Worldwide" | "Monde" |
| `.land-about-eyebrow` | "Elite Coach" | "Coach d'élite" |
| `.land-footer-made` | "Built for elite performance" | "Conçu pour la haute performance" |

Note: the `LAND_TRANS` `en:` and `ar:` dictionaries still hold the English originals — switching languages via `🌐` still works correctly. Only the static HTML defaults and one JS fallback string changed. The `T()` translation system was **not touched** per the task constraints.

The dynamic fallback fix in `loadLanding()` matters because `landing_config.stat_countries` is the canonical source — when that DB column is null, the code falls back to the literal string. The fallback was English; now it's French.

### 25.3 "Plan" → "Mon Plan" in client bottom nav

Static HTML default for `#nav-lbl-2` (line ~1671). The `TABS_LABELS.fr` array already had `'Mon Plan'` at index 2, so `applyLanguage()` was already painting the right label once a session loaded — the static fallback now matches.

### 25.4 French membership tags in À renouveler

`renderCoachToday()` (line ~8681) — the section 2 (`⏰ À renouveler`) row template now uses an inline `_mNames` lookup (same shape as the existing one in `renderCoachOverview` and `renderCoachDash`) before printing `c.membership_tag`. Raw values like `3months` / `expired` no longer leak. Falls back to the raw value if a tag isn't in the lookup, then to `—`.

### 25.5 Rapport card emoji

Already removed in §20.16 — verified during this pass that the `RAPPORT` header (line ~6199) has no glyph beside it. No change needed.

### 25.6 Mot du coach auto-emoji nowrap

`renderWeeklyReport()` (line ~6226) — the auto-message branch now wraps the trailing emoji in `<span style="white-space:nowrap">${autoNote.emoji}</span>`. The emoji can no longer break to its own line when the quoted text wraps. Coach-written notes (no auto-emoji) are unaffected because the conditional `${isAutoNote ? … : ''}` only emits the span on auto-mode.

### 25.7 Feature card SVG icons

Three landing feature cards (`Plans 100% personnalisés`, `Suivi en temps réel`, `Résultats garantis`, lines 974/979/984) now use 28px gold-stroked inline SVGs (clipboard-with-check, EKG/heartbeat, trophy/medal). The `.land-feature-icon` CSS rule was retuned: `font-size: 0` neutralizes any leftover emoji from cached browser sessions, `display: flex; align-items: center; justify-content: flex-start; margin-bottom: 20px` keeps the icon inline on its row, and the existing gold `drop-shadow` glow is preserved.

### 25.8 Découvrir scroll indicator → arrow

`#land-discover` text replaced with a single `↓` glyph (18px, no letter-spacing, `aria-hidden="true"`). The wrapping `.land-scroll` div keeps its `onclick` to scroll to `#land-stats-anchor`. An `aria-label="Faire défiler"` was added on the scroll div for accessibility since the visible text is now a glyph.

The `applyLandLang()` function looks up `t['land-discover']` which doesn't exist in any of the three dictionaries (`LAND_TRANS.fr/en/ar` use `discover` as the key, not `land-discover`). That mismatch was pre-existing — the static HTML always won. Replacing the static with `↓` therefore takes effect across all languages with no further wiring.

### What this pass does NOT change

- `T()` translation system, `LAND_TRANS` dictionaries, `applyLanguage()`, `applyLandLang()` — untouched.
- `showSupplements()`, `m-supplements` modal, `m-cart` modal, store screen — untouched (Fix 1 only removed the hero entry button).
- Any JS handler signatures, hash routing, or screen plumbing.
- The `t['land-discover']` translation-key mismatch — flagged but not corrected (would require touching `LAND_TRANS`, which the task forbids).

### 25.9 Wave 5 — full client-portal i18n coverage

53 new keys added to `UI_TR` (line ~2926/EN ~2987/AR ~3050) across `fr` / `en` / `ar` blocks. Every key carries the same shape across all three languages — so `T(key, fallback)` always finds a value, and the fallback (always the French string) is the safety net if a key is ever missing or misspelled.

#### Key categories (52 keys total)

| Bucket | Keys |
|---|---|
| Greeting / status | `hello`, `not-done-today`, `tap-above`, `checkin-done`, `day-logged` |
| Check-in form | `checkin-btn`, `more-details`, `less-details`, `save-checkin`, `save-changes`, `checkin-edit-hint`, `delete-checkin`, `training-done`, `checkin-date`, `compliance-today`, `checkin-week`, `compliance-label`, `poids-label`, `calories-label`, `proteins-label`, `glucides-label`, `lipides-label` |
| Food log | `add-food`, `no-food-today`, `add-first-meal` |
| Messages | `coach-messages`, `refresh` |
| Subscription banner | `sub-expires`, `sub-days-1`, `sub-days-n`, `renew-now` |
| Weight progress / chart | `pace-label`, `days-since`, `overview`, `weight-progress`, `calories-chart`, `start-date`, `current-label`, `goal-label`, `kg-to-lose`, `goal-reached` |
| Weekly rapport | `report`, `best-day`, `coach-word`, `share`, `note-hard`, `note-good`, `note-great`, `no-weight-data`, `no-week-data` |
| Vue semaine | `week-label`, `in-progress` |
| Progress sub-tabs | `measurements`, `records`, `photos` |

#### Wired surfaces

`rToday` (greeting, expiry banner, check-in CTA, status cards), `renderCheckin` (training toggle, "more/less details" toggle text, save / save-changes buttons, edit hint, delete link, date label), `renderWeightProgress` (overview header, all 4 tile labels, kg-to-lose / goal-reached blurb, pace + days-since footer, weight-chart title, calories-chart title), `_renderSparkline` (empty state), `renderWeeklyReport` (RAPPORT header, MEILLEUR JOUR / MOT DU COACH labels, three auto-message variants, share button, no-data state), `renderWeeks` (current-week empty `En cours`), `loadClientMsgs` parent cards in `rMoi` and `rMessages` (coach messages title, refresh button), `rPlan`'s nutrition tab (food log title `+ Ajouter un aliment`, empty state).

The Plan, Records, Mensurations, Photos tab toggles in `rProgress` were switched from the legacy `progress-meas` / `progress-records` / `progress-photos` keys (which had emoji baked into the value) to plain `measurements` / `records` / `photos`. Emojis are now rendered outside `T()` so they're always-present and not subject to translation accidents.

#### Fallback policy

Every `T()` call uses the FRENCH string as the fallback (second argument). The function signature is `T(key, fallback='')` — if the key is missing in the active language dict, it falls back to French (the canonical authoring language for this app). Examples:

```js
T('checkin-btn', '✅ Faire mon check-in')
T('coach-word',  'MOT DU COACH')
T('note-hard',   'Semaine difficile, mais tu es là. Reprenons ensemble')
```

**Don't change the fallback to anything except the French string.** It's the contract that lets the app survive a half-translated dictionary.

#### Auto-note pattern (texts moved out of `autoNote` constant)

`renderWeeklyReport` previously held the three auto-messages as raw strings inside `autoNote` literal:

```js
// before
const autoNote = compPct>=80 ? {text:'Semaine exceptionnelle…', emoji:'🔥'} : …
// after
const autoNote = compPct>=80 ? {text:T('note-great','Semaine exceptionnelle…'), emoji:'🔥'} : …
```

Each call passes the French original as the fallback. Coach-written `coach_notes` (`note` variable) are NEVER routed through T() — they are user content and must render verbatim.

#### `more-details` toggle text — special case

The "Plus de détails →" / "Moins ↑" toggle inside `renderCheckin` flips between two strings via inline `onclick`. Inline handlers can't easily call `T()` mid-flight (they'd capture the closure at a weird time and might miss a language change). I solved it by:

1. Resolving both strings via `T()` at render time
2. Storing them on the button element via `data-tmore` / `data-tless`
3. The inline handler reads `b.dataset.tmore` / `b.dataset.tless` to flip text

This way the button correctly localizes when the tab re-renders after `setLang()`.

#### RTL — Arabic Darja

`applyLanguage()` already sets `direction: rtl` on `#client-screen` when `lang === 'ar'`. One additional change: the visible French-formatted check-in date display (`#dl-date-display`) gets `dir="auto"` so the rendered Arabic locale-formatted date (when one exists in a future iteration) renders right-to-left without flipping the surrounding card layout.

The macros bar (Poids / Calories / etc.) stays LTR because those are numeric values, not text — flipping them would actually reduce readability.

#### Language change flow — no reload required

`setLang(lang)` (line ~6782):

1. `CC.language = lang`
2. Persist via `sb.from('clients').update({language})` (fire-and-forget — the UI doesn't wait)
3. `applyLanguage()` — re-paints `[data-tr]` elements, tab labels, RTL direction
4. `refreshTab(activeTab)` — full re-render of the current tab; renderers internally call `T()` and now pick up the new language

`applyLanguage()` is also called at portal entry (line ~4237 in `openPortal`) so a returning client whose `language` differs from the default (`fr`) sees the right language on first paint.

#### What was deliberately not done

- The `T()` function itself was not modified — same signature, same fallback chain.
- The coach side has its own French strings inline; it was NOT touched per the task constraint.
- Old `progress-meas` / `progress-records` / `progress-photos` keys remain in `UI_TR` even though they're no longer referenced — harmless, leave alone (cleanup is a separate pass).
- Translations are not auto-tested. A simple regression check would be: render every tab with `CC.language = 'en'` and `'ar'` and visually scan for any French strings. We don't have automated coverage for this today.

---

## 27. `ltr()` helper — coach content inside RTL UI

When a client's UI runs in Arabic (`CC.language === 'ar'`, `direction: rtl` on `#client-screen`), French/English coach-written content (meal plans, training programs, messages) needs to render LTR so punctuation, numbers, and Latin text don't get reflowed by the surrounding RTL flex parent. The `ltr()` helper does this isolation.

### Location

Defined directly below `T()` (~line 3172). Same module scope, same `CC?.language` fallback semantics.

```js
function ltr(text){
  if(text==null||text==='')return '';
  const lang=CC?.language||'fr';
  return lang==='ar'
    ? `<bdi dir="ltr" style="display:inline-block;text-align:left;unicode-bidi:isolate">${text}</bdi>`
    : text;
}
```

### Why `<bdi>` + `unicode-bidi:isolate`

- `<bdi>` (bidirectional isolate) is the right semantic element for content whose direction is independent of the surrounding flow — exactly the case here.
- `dir="ltr"` forces LTR resolution inside.
- `display:inline-block` prevents the wrapper from collapsing punctuation across line breaks (especially numbers like "3×10" or "8 000 DA").
- `text-align:left` ensures the content aligns left even though the parent is RTL-aligned.
- `unicode-bidi:isolate` belt-and-braces the bidi algorithm — without this, some browsers still let surrounding RTL leak into the LTR span when neutral characters (digits, punctuation) sit at the boundary.

### Where it's wired (18 call sites)

| Surface | Renderer | What gets wrapped |
|---|---|---|
| Home diagnostic card | `rHome` (~4547) | `diagData.content` |
| Home recent coach note | `rHome` (~4554) | `noteD.coach_notes` |
| Plan tab raw program lines | `renderProgramme` (~5093) | `linesHtml` (whole block) |
| Plan tab structured exercise | `renderProgramme` (~5103) | exercise `n`, `e.cues`, `e.sets` |
| Plan tab cardio rows | `renderProgramme` (~5105) | `cv.activity`, `cv.duration` |
| Plan tab session header | `renderProgramme` (~5107) | `s.name`, `s.type` |
| Meal plan raw text | `renderMealPlan` (~5347) | `rawHtml` |
| Meal plan day name | `renderMealPlan` (~5359) | `day.day` (with `'Jour N'` fallback) |
| Meal plan meal name | `renderMealPlan` (~5371) | `meal.name` |
| Meal plan meal title | `renderMealPlan` (~5374) | `meal.title` / `meal.name` / autoTitle |
| Meal plan food row | `renderMealPlan` (~5376) | `cap(food.name)`, `food.quantity` |
| Meal plan prep instructions | `renderMealPlan` (~5379) | `meal.instructions` |
| Weekly rapport "Mot du coach" | `renderWeeklyReport` (~6407) | `escNote` ONLY when `!isAutoNote` (auto-messages from `T()` are already in user's language) |
| Coach messages bubble body | `loadClientMsgs` (~6768) | `text` ONLY when `isCoach` (client's own messages keep their typed direction) |
| Nutrition-tab meal preview | `renderNutritionTab` (~10427) | `meal.name`, `cap(food.name)`, `food.quantity` |

### What is NOT wrapped (by design)

- **UI chrome / labels / button text / `T()` output** — already in the user's language; wrapping would force LTR on Arabic translations.
- **Numbers + units rendered by JS** (kcal, grams, percent, durations) — `${X}kcal`, `${dt.p}g`, `${prog}%`, etc. The bidi algorithm handles isolated digits + neutral punctuation correctly inside RTL flow without `<bdi>`.
- **Voice notes durations** — system-formatted, not coach content.
- **Client-written content** — comments where `sender === 'client'`, the client's `weekly_note`, photo notes, intake form replies. Arabic clients write Arabic; LTR wrapping would actively harm readability.
- **The auto-message in the weekly rapport** — when no `coach_notes` exists, the displayed quote comes from `T('note-hard'…)`/`T('note-good'…)`/`T('note-great'…)` and is already in the user's language. The `isAutoNote` ternary (`isAutoNote ? escNote : ltr(escNote)`) skips wrapping in the auto case.
- **The coach's own dashboard surfaces** — out of scope; coach side never touched.

### Performance

For non-Arabic users (the vast majority), `ltr()` is a single string-equality check + return — effectively free. No DOM nodes added, no extra style. Only when the active language is Arabic does the function emit `<bdi>` markup.

### Don't reintroduce these patterns

- ❌ Direct embedding of coach text in template literals without `ltr()`: in Arabic mode the digits-letters-punctuation interleaving will visually scramble (`3×10` becomes `10×3`, dashes flip, etc.).
- ❌ Wrapping `T()` output in `ltr()`: T() returns user-language strings; LTR-isolating Arabic translations defeats the whole point of having Arabic.
- ❌ Wrapping client-authored fields: the client's own typed messages render correctly when left alone (Arabic flows right-to-left, French/English flow left-to-right inside RTL bubbles via the bidi algorithm).
- ❌ Adding `ltr()` inside HTML attributes (`onclick="…ltr(name)…"`): only use in element bodies. Attribute values are parsed differently and the `<bdi>` would be escaped or break the JS.

### Verification

`new Function(scriptBody)` parses cleanly post-edit. No regression to existing FR/EN rendering — `ltr()` returns the original string unchanged when `lang !== 'ar'`.

The full Arabic-mode regression check (no automation today): set `CC.language = 'ar'` and visually inspect Home (diagnostic card, coach note), Plan tab (program + sessions + cardio), Plan-Nutrition tab (meal plan grid + nutrition preview), Messages tab (coach bubbles), Progress tab (weekly rapport's "Mot du coach" when a real coach note exists). Numbers and French food names should read LTR with intact punctuation; the surrounding labels and button text remain Arabic.

---

## 28. Scroll-driven story (`#land-story`) — landing intro

The landing's hero + feature-cards section was replaced by a 5-scene scroll-driven cinematic story. The story IS the homepage intro. Stats, About, Plans, Transformations, Testimonials, CTA-final, and Footer remain unchanged below it.

### Removed in this pass

- **Brand-experience overlay** (§21): entire `#brand-experience` `<style>` + `<div>` + `<script>` block (~355 lines). The overlay's purpose — a cinematic intro — is now fulfilled by the story being the page itself, so the modal/auto-open mechanism is unnecessary.
- The hero-button entry (`▶ Voir l'expérience`).
- All `.be-*` CSS rules.
- `openBrandExperience()` / `closeBrandExperience()` JS functions.
- `localStorage['brand-experience-seen']` first-visit flag and its `IntersectionObserver`-related auto-open setTimeout.
- The old `.land-hero` `<section>` (eyebrow + H1 + sub + CTAs + trust row + scroll indicator).
- The old `.land-features-wrap` `<div>` (3 feature cards).

CSS rules for the removed classes (`.land-hero`, `.land-eyebrow`, `.land-h1`, `.land-sub`, `.land-cta-row`, `.land-trust-row`, `.land-feature-card`, `.land-features-wrap`, `.land-features-inner`, `.land-features`, `.land-feature-title`, `.land-feature-desc`, `.land-feature-icon`, etc.) **were intentionally left in the stylesheet** — they're harmless when no element references them, and removing them risks breaking other surfaces that may share the names (e.g. the brand-experience-style fallback case). Cleanup is a separate sweep.

### New story structure

`<section id="land-story" class="land-story">` (line ~890, immediately after `</nav>`). Five `.story-scene` divs, each `100vh` tall:

| # | Scene | Roman | Theme color |
|---|---|---|---|
| 1 | Le déclic / The Moment / اللحظة | I | warm gold (`#1a1400` glow at top) |
| 2 | Le coach / The Coach / الكوتش | II | green-tint (`#0d1a0d`) |
| 3 | Les résultats / The Results / النتائج | III | warm gold variant |
| 4 | L'app / The App / التطبيق | IV | warm gold (centered) |
| 5 | Ton tour / Your Turn / دورك | V | cool blue-tint (`#0d0d1a`) — final scene with CTA |

Each scene has:
- `.story-bg[data-bg="N"]` — scoped radial gradient for that scene's mood (5 distinct colors)
- `.story-vignette` — bottom-up dark gradient so text contrast holds without a background image
- `.story-content` — chapter eyebrow, headline (with `<em>` for gold accent), sub paragraph
- `.story-roman` — giant decorative numeral pinned to the right side (left in RTL)

Scene 3 swaps the sub paragraph for `.story-stats` — three `.story-stat` cards (`-12kg`, `-8kg`, `+5kg`) with name + duration. These are intentionally hardcoded names (Rania / Karim / Yacine) and not coach-data-driven; if you want them to read from `transformations`, plug into `loadLanding()` and re-render.

Scene 5 has a `.story-cta` button (gold pill) wired with `onclick="document.getElementById('land-programs').scrollIntoView({behavior:'smooth'})"` — clicking it scrolls smoothly to the existing plans section.

A 2px sticky `.story-progress` bar pinned to the top of the viewport tracks scroll position through the story (filled in gold, `width:%` updated on `scroll`).

### Translations — `STORY_TR`

New constant defined just before `setLandLang` (~line 11607). Three languages, 14 keys each:

| Key | Used by |
|---|---|
| `story-ch1` … `story-ch5` | Scene chapter eyebrows (`CHAPITRE I — LE DÉCLIC` etc.) |
| `story-h1` … `story-h5` | Scene headlines (HTML — supports `<br>` and `<em>` for gold accent) |
| `story-s1`, `story-s2`, `story-s4`, `story-s5` | Scene sub-paragraphs (no `s3` because scene 3 uses stats) |
| `story-cta` | Final scene's gold button |

Headlines use `<em>` tags styled by `.story-headline em { color:#C9A84C; font-weight:900 }` so the gold accent works across all three languages. The `<br>` line breaks are intentional — they're part of the cinematic typography rhythm; don't replace with spaces.

### `renderStory()` + wiring

- Defined directly above `setLandLang` (~line 11608).
- Reads `landLang` (existing module-level var, defaults `'fr'`).
- Loops `#land-story [data-tr]` elements and sets `el.innerHTML = dict[key]`.
- Sets `story.dir = (lang === 'ar' ? 'rtl' : 'ltr')` on the story container itself, in addition to the global `landing.dir` flip in `setLandLang`. Belt-and-braces — explicit `dir` on the story makes the bidi algorithm behave even if a future change scopes the flip.

**Hooked into:**
1. **End of `setLandLang`** — after the existing `[id]` loops, `renderStory()` runs so the story re-paints when the user picks a language.
2. **`DOMContentLoaded` after `loadLanding()`** — initial render. A `if(typeof renderStory === 'function')` guard means the boot path doesn't break if the function ever moves.

### `_initStoryScroll()` — IntersectionObserver + progress bar

Defined immediately after `renderStory`. Runs once (idempotent guard `window._storyScrollInited`). Two responsibilities:

1. **Scene fade-in** — `IntersectionObserver` with `threshold: [0.4]` adds `.is-active` to each scene as it enters the viewport. The scene's CSS transitions from `opacity:0 + translateY(40px)` to `opacity:1 + translateY(0)` over 0.9s. Scene 1 is force-activated immediately (no fade on initial load — viewer should see content above the fold without waiting).
2. **Progress bar** — passive `scroll` listener computes `scrolled / (storyHeight - viewportHeight)` and writes to `.story-progress-fill` `width`. Browser-native passive scroll → no perf surprises.

Called once from `DOMContentLoaded` after `renderStory()`.

### RTL handling

- `.land-story[dir="rtl"] .story-roman { right: auto; left: 8px }` — the giant decorative numeral moves to the left side in Arabic. CSS-only flip; no JS needed.
- `renderStory()` sets `story.dir` directly. The whole story flows right-to-left when active.
- Reduced-motion catch-all at the end of the story CSS block: `prefers-reduced-motion: reduce` collapses the scene transition to `0.01ms` AND forces `opacity:1; transform:none`, so users with motion sensitivity see all content immediately without animation.

### What stayed

- Nav header (lang picker, Coach button, Login, Rejoindre) — untouched.
- Stats row (`#land-stats-anchor` — clients, years, countries, kg lost) — sits below the story.
- About section — coach bio, badges.
- Plans (`#land-programs`) — destination of the scene-5 CTA.
- Transformations + Testimonials + CTA-final + Footer — all unchanged.
- Coach platform (`#coach-platform`), client portal, store screen — none touched.

### Don't reintroduce

- ❌ Auto-opening modal intros (the story IS the page now — adding an overlay on top is redundant)
- ❌ Hardcoded translations inside HTML (always go through `STORY_TR` so the language picker works)
- ❌ Removing the reduced-motion media query (accessibility regression)
- ❌ Setting `dir` only on `.land-story` without keeping the global `landing.dir` in sync — they should match for the rest of the page to flip correctly

### Verification

- `new Function(scriptBody)` parses cleanly post-edit (script block count went from 3 to 2 — the brand-experience IIFE was removed).
- Manual checklist: scroll the landing top to bottom in FR — each scene should fade in once at ~40% visible; the gold progress bar at the top fills as you scroll. Switch language to EN → all five scenes re-translate without reload. Switch to AR → text flips to RTL, roman numerals jump to the left, CTA arrow reverses (`←`).

---

## 30. Animation polish — 5 additions

Targeted, additive. All five honor `prefers-reduced-motion: reduce` (existing helpers already do; new ones got an explicit check or CSS reduce-rule).

### 30.1 Coach dashboard count-up

`renderCoachDash()` (line ~8619) and `loadCoachWeekStats()` (line ~8232) now mark each numeric tile with an id (`stat-subscribers`, `stat-programme`, `stat-pending`, `stat-expiring`, `stat-checkins`, `stat-compliance`, `stat-nocheckin`) and call `animateCount(el, target, 900, format)` immediately after the surface is in the DOM.

The compliance tile keeps the `%` suffix via a custom format function (`n => n + '%'`); it falls back to plain string when the value is `—` (no data).

`animateCount` already honors `prefers-reduced-motion` — paints the final value instantly when the media query matches. No extra guard needed at the call site.

### 30.2 Today tab count-up (client)

`rToday()` (line ~4042) now puts `id="today-streak-num"` on the streak tile and `id="today-weight-num"` on the weight tile. `renderTab()` (line ~3974) detects `i === 0` and runs the count-up after a 150ms tick (so the layout has settled and the `.tab-enter` slide-in below isn't fighting the count animation).

The weight format uses one decimal only when the value isn't whole: `n => n%1 ? n.toFixed(1) : String(n)`. So 72 stays `72`; 72.4 reads `72.4`.

### 30.3 Tab slide-in

`renderTab()` now wraps tab content in `<div class="tab-enter">…</div>` instead of `<div class="fade">…</div>`. CSS:

```css
@keyframes tabEnter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.tab-enter{animation:tabEnter 0.35s cubic-bezier(0.4,0,0.2,1) both}
@media (prefers-reduced-motion: reduce){.tab-enter{animation-duration:.01ms!important}}
```

Every client tab now slides up 16px over 350ms when it switches in. The earlier `.fade` keyframe (`fadeUp`, 0.2s opacity-only) is still defined and used by `.tab-content` itself for the show/hide cycle — kept untouched.

### 30.4 Story headline word stagger

Inside `_initStoryScroll()` (line ~11704), the IntersectionObserver callback now also calls `staggerHeadline(e.target)` when a scene activates. The first scene gets it immediately at boot.

`staggerHeadline(scene)` splits the `.story-headline` `innerHTML` on whitespace, wrapping each word in `<span class="sw" style="animation-delay:Nms">…</span>` while preserving inline `<em>` tags (they stay attached to their word). Each word fades up over 500ms with a 60ms delay between words.

Idempotent — guarded by `h.dataset.staggered = '1'` so a re-render (e.g. language change) doesn't re-stagger an already-staggered headline. Bonus: this means text re-translated by `renderStory()` on language switch shows immediately as plain text (no second cinematic stagger when the user just wanted a quick swap).

CSS:

```css
.sw{display:inline-block;opacity:0;transform:translateY(12px);animation:swIn 0.5s cubic-bezier(0.4,0,0.2,1) both}
@keyframes swIn{to{opacity:1;transform:translateY(0)}}
@media(prefers-reduced-motion: reduce){.sw{animation-duration:.01ms!important;opacity:1;transform:none}}
```

`staggerHeadline` itself also bails when reduced-motion is matched — short-circuit at the top of the function. Belt-and-braces.

### 30.5 Check-in confetti

`spawnConfetti()` lives next to `animateCount` (line ~2412). 28 small particles, 4–10px, gold + cream palette, fan upward + sideways with random rotation over ~1s, then auto-remove via `setTimeout`. Container is `#client-screen` when present (so particles inherit the right stacking context), `body` otherwise.

Wired into `saveDL()` (line ~4630) — fires immediately after `haptic([40,30,80])` on a successful check-in save.

```css
@keyframes confettiP{
  0%{opacity:1;transform:translate(0,0) rotate(0deg) scale(1)}
  100%{opacity:0;transform:translate(var(--dx),-140px) rotate(720deg) scale(0.3)}
}
```

Per-particle randomness: position (% from left, clustered around center), color (5-color palette), shape (circle vs rounded square via `border-radius:50%` vs `2px`), travel offset `--dx` (CSS custom property, ±80px range), and animation duration (0.7–1.3s). The keyframe rotation is a single fixed `720deg` — combined with per-particle position/dir/duration variance, it reads as natural confetti chaos.

`spawnConfetti()` no-ops on `prefers-reduced-motion: reduce` — the function bails before creating any DOM nodes.

### Quick wins reused, not reinvented

- `animateCount` (line ~2393) — already had the reduce-motion check baked in; just called from new sites.
- `staggerCards` (line ~3275) — unchanged, still used for `.client-card` entrance on the dashboard.
- `haptic([40,30,80])` already on save — confetti now sits next to it.
- IntersectionObserver pattern reused across `complianceRing`, `_initStoryScroll`, and the new headline stagger trigger — no third dependency added.

### Verification

`new Function(scriptBody)` parses cleanly post-edit. Manual smoke test:

- Open coach dashboard → 4 overview tiles + 3 weekly stat tiles count up from 0 over 900ms (reduced-motion users see final values immediately).
- Tap a client tab on the bottom nav → slides up 16px over 350ms.
- Open Today tab → streak + weight tiles count up over ~800ms.
- Save a check-in → 28 gold/cream particles fan upward from screen center, ~1s.
- Scroll the landing → each story scene's headline staggers word-by-word as it enters the viewport.

---

## 31. Premium 2026 redesign — Phase 1 (foundation + Today PoC)

This is the start of a longer redesign. Phase 1 lays a parallel design system (`.pm-*` namespace, custom SVG icons, typography tokens) and rebuilds **only the Today screen** as proof-of-concept. Every other tab keeps its old look. **Legacy `--g`/`--tx`/`.card` etc. tokens were not removed** — old surfaces still render unchanged.

### 31.1 Foundation

#### Fraunces font

Already loaded since §16. Weights expanded from `400/700/900` (+ italic 900) to **`300/400/500/700/900` regular and `300/400/900` italic** to support the new typography scale (display weight 300, italic-display weight 400). Single Google Fonts link, line ~23.

#### CSS tokens (line ~38, inside `:root`)

Added alongside existing tokens:

| Group | Tokens |
|---|---|
| Type | `--font-display` (Fraunces serif), `--font-ui` (system stack) |
| Spacing scale | `--space-1` (4px) … `--space-16` (64px) — 11 steps |
| Hairlines | `--hairline` (rgba(255,255,255,0.06)), `--hairline-strong` (0.12) |
| Gold tints | `--gold-soft` (.7), `--gold-faint` (.3), `--gold-trace` (.08) |
| Text tints | `--txt-faint` (.35), `--txt-mute` (.5), `--txt-soft` (.7) |

Old `--tm` / `--ts` / `--g` etc. are still defined and used by non-`.pm-*` surfaces. **Don't remove them until every screen is migrated.**

#### `ICON` object (line ~2435)

8 monochrome stroke SVGs that follow `currentColor`: `bell`, `check`, `arrow`, `flame`, `scale`, `target`, `alert`, `message`. Used inside template literals: `${ICON.bell}`. Each is a `viewBox="0 0 24 24"` Lucide-style line icon with `stroke-width="1.5"`. **Never inline an emoji into a `.pm-*` surface — use `ICON.*` instead.**

#### `.pm-*` CSS classes (line ~150-ish)

A 22-rule design layer scoped to a `.pm-` prefix so it can't collide with legacy classes. Key components:

| Class | Purpose |
|---|---|
| `.pm-screen` | Surface root — sets `font-family: var(--font-ui)` |
| `.pm-display` | Serif display headline — Fraunces 300, tight letter-spacing. `<em>` inside renders gold + italic. |
| `.pm-hero-num` | 64px serif-300 numerical display (e.g. calorie target). `.unit` sub-class for "kcal". |
| `.pm-eyebrow` | 10px wide-tracked uppercase label |
| `.pm-caption` | 12px muted captions |
| `.pm-meta-num` | 14px italic Fraunces — small inline numbers in the meta strip |
| `.pm-tap` | Premium tap row (icon + label + subtitle + trailing arrow). Subtle hairline border, 0.5px. Active state scales to 0.98. |
| `.pm-tap-l` / `.pm-tap-s` / `.pm-tap-arrow` | Sub-elements of `.pm-tap` |
| `.pm-divider` | 0.5px hairline divider |
| `.pm-init` | Round avatar with 2-letter initials — 34×34, gold-trace bg, gold text |
| `.pm-icon-btn` | 34×34 round icon button (header). Has `.pm-dot` for an unread indicator. |
| `.pm-banner` | Inline alert (alert icon + body). Soft-gold tinted. `<b>` inside renders gold. |
| `.pm-today-active` | Class set on `#client-screen` when tab 0 is visible — its only job is to hide the legacy stats bar via CSS rule below. |

The `.pm-today-active` rule:

```css
.pm-today-active .stats-bar,
.pm-today-active #c-stats-bar,
.pm-today-active .top-stats,
.pm-today-active #stats-bar { display: none !important; }
```

Multiple selector targets in case the legacy markup ever changes which id/class it carries. The actual element today is `<div class="stats-bar" id="c-stats-bar">` (line ~1336).

### 31.2 Today screen rebuild

`rToday()` (line ~4098) was rewritten. Data fetching is **identical** — only the returned HTML changed.

New structure (top-down):
1. **Header row**: `.pm-init` initials avatar (left) · `.pm-icon-btn` bell (right) — bell wired to `toggleNotif('client')` (the existing client-side notification panel toggler; `openNotifPanel` doesn't exist).
2. **Greeting**: `<h1 class="pm-display">Bonjour, <em>Sara.</em></h1>` — serif italic, gold accent on the name.
3. **Date caption**: `Lundi 5 mai` (no year, no weekday emoji).
4. **Optional banner** (if `daysLeft <= 7`): subscription expiry alert with `ICON.alert` glyph and gold-tinted background. Replaces the old gradient orange banner.
5. **Hero kcal block**: small `Calories du jour` eyebrow + `${calTarget}kcal` in 64px Fraunces 300 + macro caption (`125g protéines · 180g glucides · 60g lipides`). Macro targets resolved from `CC.calories_target` (or aliases) with `CG`-derived fallback chain.
6. **Check-in tap row**: `.pm-tap` button — when logged shows `Check-in fait !` + check icon, otherwise `Check-in du jour` + arrow icon. Tap → `switchTab(1)`.
7. **Quiet meta strip**: 3 cells with small ICON + italic Fraunces number — streak, current weight, kg-remaining. Last cell only renders if `goal_weight` exists.

**IDs preserved** (so §30 count-up animations keep working): `today-streak-num`, `today-weight-num`, plus new `today-cal-hero` for future expansion.

### 31.3 Stats bar hidden on Today only

`switchTab` (line ~4030) toggles `.pm-today-active` on `#client-screen` based on `i === 0`. `openPortal()` (line ~3989) adds the class once on initial portal entry so the very first paint has the bar already hidden.

When the user taps another tab (Check-in, Plan, Messages, Progrès), the class is removed, the legacy stats bar reappears, and the old surfaces look exactly as before.

### 31.4 Translation

One new key in `UI_TR`: `checkin-btn-short` (`Check-in du jour` / `Today's check-in` / `تسجيل اليوم`). Used by the Today tap row to fit the available width better than the longer `checkin-btn` ("✅ Faire mon check-in").

### What did NOT change

- `Journal`, `Plan`, `Progress`, `Community`, `Moi`, `Messages`, `Leaderboard` — **all untouched**. Their old design remains.
- Coach side — **not touched at all**.
- Data fetching in `rToday` — same Supabase queries, same fallback chain on `lw`, same `getStreak()` call.
- `animateCount` count-up from §30.2 — still finds `today-streak-num` and `today-weight-num` and runs after 150ms.
- Confetti from §30.5 — still fires on `saveDL` success.

### Constraints respected

- ✅ Only `rToday` HTML changed; data fetching identical.
- ✅ Other tabs untouched.
- ✅ Coach side untouched.
- ✅ ICON object used everywhere; no new emojis in `.pm-*` markup.
- ✅ JS parses cleanly (`new Function` test passed).
- ✅ Legacy CSS variables and existing classes left intact for backwards-compat with the un-migrated tabs.

### Verification checklist

- Open the client portal as a client → Today tab loads with: initials top-left, bell top-right, "Bonjour, Sara." with gold italic, date caption, hero `2200kcal`, macro line, premium tap row for check-in, 3 metas at the bottom.
- The legacy 5-stat horizontal scroll bar (Poids/Objectif/Calories…) is **gone** on Today.
- Tap Check-in → bottom nav switches to tab 1, the legacy stats bar reappears above the journal.
- Tap back to Today (🏠) → stats bar hides again, the new layout shows.
- Save a check-in → confetti still fires, the meta strip's streak number animates up.
- Switch language to EN/AR → greeting, captions, banner, tap labels all re-translate via existing `T()` keys.
- Reduced-motion: tap row's `:active` scale still renders (it's a transform on tap, not a continuous animation), but no surprises from the new layer — all transitions are 250ms or less.

### What's deliberately DEFERRED to Phase 2+

- Re-skinning Journal / Check-in form with `.pm-*`.
- Re-skinning Plan / Progress / Messages / Moi.
- Removing legacy `.land-hero`, `.land-feature-*`, `.bottom-nav` legacy rules from CSS once nothing references them.
- Premium bottom nav design (currently still the gold-indicator-on-top legacy style).
- Coach-side premium pass.

---

## 32. Cinematic dark redesign — Phase 2 (4 client screens)

Phase 2 extends the §31 design system and rebuilds **Journal**, **Progress**, **Messages**, the **bottom nav**, and the **client header**. Today (§31) and Moi remain in their respective Phase-1 / legacy states. Coach side untouched.

### 32.1 Foundation extensions

**ICON object** grew from 8 → 18 entries. New: `calendar`, `chartLine`, `food`, `dumbbell`, `send`, `photo`, `mic`, `user`, `trendUp`, `trendDown`. Same conventions: monochrome `currentColor` strokes, viewBox 24×24, stroke-width 1.5.

**CSS layer** added a "cinematic" block right after the §31 `.pm-*` classes (search comment `CINEMATIC DARK REDESIGN`). Key new components:

| Class | Purpose |
|---|---|
| `.pm-glow-line` | Sticky 1px gold-gradient hairline at the top of every premium screen — the unifying visual anchor |
| `.pm-glass` | Glass card — `rgba(255,255,255,0.02)` bg, 0.5px hairline, 18px radius, ::before highlight |
| `.pm-glass-gold` | Gold-tinted variant — used for emphasis cards (weekly bilan, current weight) |
| `.pm-glass-glow` | Optional radial glow positioned behind a card |
| `.pm-section-head` | 9px gold-tracked uppercase eyebrow |
| `.pm-stat-grid` + `.pm-stat-card` + `.pm-stat-v` + `.pm-stat-l` | 2-column stat grid with italic-serif numerals |
| `.pm-pill-tabs` + `.pm-pill-tab` | Pill-shaped tab toggle (replaces `.plan-tog-btn` + `.community-toggle .ctog-btn`) |
| `.pm-msg-coach` / `.pm-msg-client` | Cinematic chat bubbles — coach: white-tint left-aligned; client: gold-tint right-aligned |
| `.pm-msg-text` / `.pm-msg-time` | Sub-elements of a message bubble |
| `.pm-input` | Premium text input — `rgba(255,255,255,0.03)` bg, gold focus ring |
| `.pm-nav` + `.pm-nav-item` + `.pm-nav-icon` + `.pm-nav-lbl` + `.pm-nav-dot` | Cinematic bottom nav — SVG icons, 9px labels, gold glow dot under active |
| `.pm-field` + `.pm-field-label` + `.pm-field-row` | Form-field shells used inside `.pm-glass` |
| `.pm-day-strip` + `.pm-day-btn` (`.day-name`/`.day-num`/`.day-dot`) | Horizontal day picker — gold border on active, gold dot on logged days |
| `.pm-week-strip` + `.pm-week-btn` | Horizontal week-pill picker (S.1, S.2…) |
| `.pm-bar-wrap` + `.pm-bar-fill` | Thin gold progress bar |

### 32.2 Bottom nav rebuild

`<nav class="bottom-nav pm-nav">` — both classes coexist on the wrapper. Each button carries `class="pm-nav-item nav-item"` so:
- The new CSS (`.pm-nav-item`) paints the cinematic look (SVG icon, 9px label, gold dot under active).
- The existing `.nav-item` selector inside `switchTab()` and `openPortal()` (which toggles `.active`) still works **without any JS change**.

Each tab now uses an inline SVG `<path>` instead of an emoji (home / clipboard-check / clipboard / message-bubble / heartbeat). The `nav-indicator` element from §18 stays in the markup — `_moveNavIndicator` still slides it. Badge spans (`#nav-notif-badge`, `#nav-msg-badge`) preserved.

### 32.3 Client header restyle

`<header class="app-hdr">` (line ~1367) keeps its class for backward-compat, but inline-overrides give it the cinematic treatment: `background:#050505`, `border-bottom:0.5px solid rgba(255,255,255,0.05)`. The "CLS" text logo is replaced by a `.pm-init` round badge (still `.js-coach-initials` so `applyAppSettings()` updates it). Bell + logout are now SVG-stroke icons in `.pm-icon-btn` round buttons. The notification dot (`#c-notif-dot`) is preserved.

### 32.4 Stats bar hidden globally

The horizontal stats bar (`#c-stats-bar`, line ~1408) is now hidden on **every** tab — the new screens carry their own contextual data hierarchy (Today's hero kcal, Journal's compliance card, Progress's weight grid, etc.). The previous `.pm-today-active`-scoped rule was widened to a global `display:none !important`. The element is still rendered in the DOM (so `renderStatsBar()` calls don't fail) but never visible.

### 32.5 Journal rebuild (`rJournal` + `renderCheckin`)

Both functions kept their data fetching and Supabase queries identical. Only HTML changed.

**`rJournal`**:
- Glow line at top
- Sunday weekly bilan now lives inside `.pm-glass.pm-glass-gold` with `.pm-pill-tab` chip selectors
- Pill-tab toggle: Check-in / Semaine
- All onclick handlers preserved (`selectChip`, `selectScale`, `submitWeeklyCheckin`, `setJournalView`)

**`renderCheckin`**:
- Week strip uses `.pm-week-strip` / `.pm-week-btn` (was `.week-scroller`/`.wbtn`)
- Day strip uses `.pm-day-strip` / `.pm-day-btn` with `.day-name`/`.day-num`/`.day-dot` sub-elements (was `.day-grid`/`.dbtn`/`.ddot`)
- Day header card: glass with serif-italic date + serif compliance %
- Form: `.pm-field` rows with `.pm-input` text fields, kept ALL IDs (`dl-w`, `dl-cal`, `dl-prot`, `dl-carb`, `dl-fat`, `dl-water`, `dl-train`, `dl-day-type`, `dl-steps`, `dl-sleep`, `dl-hunger`, `dl-energy`, `dl-mood`, `dl-notes`, `dl-date-select`, `dl-date-display`, `dl-date-status`, `dl-ok`, `ci-more`, `dt-training`, `dt-rest`, `dt-cal-target`)
- Training toggle: clean row with `ICON.dumbbell` + label + existing `.tog` switch
- More-details collapsible: still wired through `data-tmore`/`data-tless` per §25.9
- Compliance card: glass with row-by-row breakdown (no chips, just text + colored value)
- Save button + delete link: kept gold + ghost styles, all handlers (`saveDL`, `deleteClientCheckin`) intact

### 32.6 Progress rebuild (`rProgress` + `renderWeightProgress`)

**`rProgress`**:
- Glow line at top
- Pill-tab nav (4 tabs: Poids / Mensurations / Records / Photos) — `.pm-pill-tab` with `.ctog-btn` kept for `setProgressView` compat
- `setProgressView` selector widened: `#tab-progress .pm-pill-tabs .pm-pill-tab, .community-toggle .ctog-btn` so both old and new markup work
- `renderWeeklyReport` output is unchanged; sits above the pill tabs

**`renderWeightProgress`** — overview card:
- `.pm-glass` wrapper instead of `.card.card-glow`
- 4 `.pm-stat-card` tiles (one with `.gold` modifier on Current Weight) using the italic-serif `.pm-stat-v` and `.pm-stat-l` pattern
- Charts (`#chart-weight`, `#chart-cal`) wrapped in `.pm-glass` cards — Chart.js config untouched, canvas IDs preserved, `initProgressCharts` still called with the same selectors
- Progress bar swapped from `.pbw .pbf` to `.pm-bar-wrap .pm-bar-fill`

### 32.7 Messages rebuild (`rMessages` + `loadClientMsgs` bubble update)

**`rMessages`**:
- Glow line at top
- Coach header row: `.pm-init` initials avatar + serif-italic coach name + green "Disponible" pulse dot + small refresh icon button
- Message list container `#client-msgs-wrap-tab` (id preserved so `loadClientMsgs` still finds it)
- Bottom composer: `.pm-input` textarea (auto-grow up to 120px) + gold gradient circular send button (`ICON.send`)
- New helper `sendClientReply()` — inserts `client_comments` row with `sender:'client'`, fires `notifyCoach`, refreshes the message list

**`loadClientMsgs`** (bubble class swap):
- Detects which container is rendering: cinematic (`#client-msgs-wrap-tab`) vs legacy (`#client-msgs-wrap` inside Moi)
- Cinematic path: emits `<div class="pm-msg-coach">` / `pm-msg-client` with `.pm-msg-text` and `.pm-msg-time` children
- Legacy path: keeps the old `.msg-bubble.coach` / `.msg-bubble.client` markup untouched
- All other behaviour (mark-as-read, badge refresh, `ltr()` wrapping for coach-authored Arabic content) preserved

### What did NOT change

- `rToday()` — already rebuilt in §31, untouched here.
- `rMoi()` (Settings tab) — untouched. Still uses legacy `.card` style.
- `rPlan()`, `renderProgramme`, `renderNutritionTab`, `renderOverload`, `renderStepsTracker`, `renderClientExchange` — Plan tab is **not** in this redesign pass.
- Coach side — completely untouched.
- Chart.js config (`initProgressCharts`) — same canvas IDs, same datasets, same colors.
- `spawnConfetti`, `animateCount`, `staggerCards`, `ltr` — all preserved.
- Every JS function call site for `selWeek`, `selDay`, `setJournalView`, `setProgressView`, `setDayType`, `openFoodModal`, `saveDL`, `loadCheckinForDate`, `deleteClientCheckin`, `submitWeeklyCheckin`, `selectChip`, `selectScale`, `loadClientMsgs`, `notifyCoach` — works as before.

### Verification

`new Function(scriptBody)` parses cleanly post-edit. Manual smoke checklist:

- Open client portal → header is dark `#050505` with initials badge + bell + logout SVG icons.
- Bottom nav: 5 tabs with stroke SVG icons, gold dot under active, no emoji.
- Today (tab 0) → still §31 layout.
- Journal (tab 1) → glow line, glass weekly bilan when Sunday, pill toggle, glass cards for week/day/form/compliance.
- Plan (tab 2) → unchanged legacy.
- Messages (tab 7) → coach header row with green Disponible dot, sticky bottom composer with gold circular send.
- Progress (tab 3) → glass rapport, pill toggle, glass weight overview with serif-italic numbers.
- Stats bar (the horizontal scrolling Poids/Calories/etc.) → hidden everywhere.
- Send a message from Messages → inserts row, refreshes list, coach gets notified.
- Save a check-in → confetti still fires, all field IDs read correctly, compliance recalculates.

### Deferred to Phase 3+

- Plan tab + nutrition + training renderers (still legacy `.card`).
- `rMoi` / settings (still legacy).
- Bottom nav indicator slide animation (still 25%-step legacy `_moveNavIndicator`).
- Removing the legacy `.card` / `.tile` / `.fg` / `.fl` / `.sec` / `.dbtn` / `.wbtn` CSS rules once Plan and Moi are migrated.
- Coach-side premium pass.
- Gold glow on hero numbers (subtle text-shadow) — held back to keep first paint legible.

---

## 33. Three.js WebGL particle story (`#land-story` rebuild)

The §28 CSS scroll-driven 5-scene story was replaced by a single fixed-height WebGL canvas with 1400 particles that morph from chaos into a stylized human figure as the user advances through 5 chapters. STORY_TR (§28) is unchanged — same 14 keys (`story-ch1`…`story-ch5`, `story-h1`…`story-h5`, `story-s1`/`s2`/`s4`/`s5`, `story-cta`) — only the read path changed.

### Removed from §28

- All five `.story-scene` divs + their `.story-bg` / `.story-vignette` / `.story-content` / `.story-roman` / `.story-stats` / `.story-cta` children.
- All matching CSS rules (the `.story-*` block in `<style>`).
- `IntersectionObserver`-driven `.is-active` fade-in.
- The hardcoded `.story-stats` cards (Rania / Karim / Yacine).
- The page-height scroll. `#land-story` is now exactly `100vh` — no internal scroll, navigation is wheel/touch driven.

### New structure

`<section id="land-story">` (line ~1059) contains:
- `<canvas id="story-canvas">` — full-bleed, position:absolute, where Three.js paints.
- `#story-ui` — flex column anchored bottom-left, `pointer-events:none` (so canvas mouse interactions could be wired later) with a single `<div>` (`max-width:540px`) containing: `#story-ch` (chapter eyebrow), `#story-hl` (headline, `<em>` allowed), `#story-sb` (sub-paragraph), `#story-cta-btn` (gold pill, hidden until last scene).
- `#story-nav-dots` — vertical 5-dot rail (`.sdot` / `.sdot.active`) on the right, click-to-jump.
- `#story-state-lbl` — top-right state word (CHAOS → ÉVEIL → ÉNERGIE → STRUCTURE → TRANSFORMATION) painted from `SCENES_DATA[i].state`.
- `#story-scroll-hint` — vertical "scroll" hint, fades out on the last scene.
- `#story-prog-fill` — the same fixed-top 1px gold progress bar (now stepped — `((curIdx+1)/5)*100%` per scene).

Three.js loads from CDN at the end of `<head>`: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`.

### `_initStoryScroll()`

One-shot (idempotent guard `window._storyScrollInited`). Bails early if `THREE` is undefined (CDN failed) — the rest of the page is unaffected.

Builds:
- WebGL renderer + perspective camera + scene with `FogExp2`.
- 1400 main particles. `bodyTargets()` generates anatomy-shaped target positions in 8 regions (head, neck, torso, shoulders, arms, hips, legs, feet). `CHAOS_POS` is a uniform random cloud. The active position lerps each frame: `pos = CHAOS + (TARGET - CHAOS) * morphT`, where `morphT` itself eases toward `targetMorphT` set by `goToScene()`.
- 500 ambient gold dust particles (decorative, no morph).
- Per-particle vertex colors (60% gold, 30% white, 10% bronze) baked once.
- Floaty Y-axis modulation kicks in past `morphT > 0.5` so the figure breathes after it forms.
- Camera drifts on a slow Lissajous (`Math.sin/cos` of `tick`) and `lookAt(1.2, 0.15, 0)`.

Navigation:
- 5 `.sdot` buttons built on init; click → `goToScene(i)`.
- `wheel` listener (passive, 600ms cooldown) — `deltaY > 30` advances, `< -30` goes back.
- `touchstart` + `touchend` — vertical swipe ≥ 50px advances/retreats.

`goToScene(n)` does: text fade-out → swap text + state label + CTA visibility + progress bar + active dot → fade-in. Reads `STORY_TR[landLang]` directly.

### `renderStory()`

Now a thin pre-init paint: looks up `(window.landLang||'fr')`, fills `#story-ch` / `#story-hl` / `#story-sb` / `#story-cta-btn` with scene-1's text from `STORY_TR`, calls `_initStoryScroll()` if not yet booted. Hooked into `setLandLang` and `DOMContentLoaded` exactly as before — no boot path change.

> Note: `landLang` is a top-level `let`, not a window property — `window.landLang` is `undefined`. `renderStory()`'s `(window.landLang||'fr')` therefore always falls back to French on the initial paint. `_initStoryScroll`'s `goToScene` reads `landLang` directly, so once the user navigates between scenes the live language wins. If you need the very first paint to honor the saved language, change `window.landLang` → `landLang` in `renderStory`.

### Don't reintroduce

- ❌ Per-scene `<div>`s with `IntersectionObserver` — the canvas is the scene now, navigation is event-driven.
- ❌ Tall scroll-region for the story — it's pinned at `100vh` and uses wheel/touch to drive scene index.
- ❌ Hardcoded translation strings — keep going through `STORY_TR`.
- ❌ Adding more particles without profiling — 1400 + 500 is tuned for mid-tier mobile; bumping to 5k+ tanks low-end Android.

### Verification

- `new Function(scriptBody)` parses cleanly.
- Manual: load landing → particles boot as a chaos cloud, scene 1 text/state shown. Wheel down → scene 2, particles ease toward partial human shape. Continue to scene 5 → full figure breathes, gold "Commencer →" CTA appears, scroll hint fades, progress bar fills. Click any `.sdot` → jumps + correct active state. Switch language mid-story → `goToScene` re-pulls from `STORY_TR[landLang]` on next nav. Offline / CDN blocked → `THREE` undefined, init bails silently, page stays usable (just no canvas content).

---

## 34. Story interaction + copy update + supplements section

### 34.1 Arrow scroll replaces global wheel capture

The global `window.addEventListener('wheel', …)` that hijacked all page scrolling was removed. Navigation is now:
- **Arrow button** (`#story-arrow`, bottom-center, gold-bordered circle with chevron, `arrowBounce` CSS keyframe). Inline `onclick` reads `window._storyCurScene`, advances the scene index, calls `window.goToScene(n+1)`, or `scrollIntoView` past scene 5.
- **Touch swipe** — scoped to `document.getElementById('land-story').addEventListener('touchstart/touchend')` (30px threshold, down to avoid fighting the page scroll). Replaces the former global `window` touch listeners with 50px threshold.
- **Dot nav** (`.sdot` — unchanged).

`goToScene(n)` now also: sets `window._storyCurScene=n` (so the arrow button's inline onclick can read current position) and sets `arrow.style.opacity = n===4 ? '0.3' : '1'` (dims arrow on last scene where it scrolls to programs instead).

`window.goToScene` is assigned at the end of the function definition inside `_initStoryScroll` so inline `onclick` handlers (which run in global scope, not the closure) can reach it via `typeof goToScene === 'function'`.

### 34.2 New STORY_TR copy (5-chapter identity script)

All FR/EN/AR keys replaced. New narrative arc: **Identity → Problem → Method → What you get → Decision**. All five chapters now have both `story-h` and `story-s` keys (the old ch3 had no `story-s3` — now it does). `story-cta` updated to "Commencer maintenant →" / "Start now →" / "← ابدأ دروك".

### 34.3 Supplements section on landing (`#land-supps`)

Static landing section inserted between `<!-- PROGRAMS -->` and `<!-- TRANSFORMATIONS -->`. Three hardcoded product cards (Whey Protéine 2800 DA, Créatine 1900 DA, Oméga 3 2200 DA) each with a "Commander via WhatsApp →" button wired to the existing `openWhatsAppProgram(key, name, price)` function.

Nav button `#nav-supps-btn` added before the Coach button. It calls `showLandSupps()` (a new one-liner that scrolls `#land-supps` into view).

> **Naming note:** `showSupplements()` already existed at line ~3761 — it shows the full `#store-screen` SPA page. The landing-scroll function is intentionally named `showLandSupps()` to avoid collision. Do not rename or merge them.

Products are placeholder content — update prices/names/emojis directly in the HTML when Sammy confirms. A full Supabase-driven admin pass can be added later without changing the nav button or section structure.

---

## 35. Story tap-to-advance · Mobile nav hamburger · Live supplements on landing

### 35.1 Tap-to-advance replaces scroll/wheel capture

All `passive: false` wheel and touchmove listeners removed. The story no longer intercepts the global scroll — it was causing reliable navigation issues across desktop and mobile.

Navigation is now:
- **Tap anywhere on `#land-story`** (delegated `click` listener, 400ms throttle). Clicks on `#story-arrow`, `.story-nav-dots`, or any `<button>` are excluded so dot nav and the CTA button still work independently.
- **`#story-arrow` pill button** (bottom-center) — same onclick as before; now styled as a pill with `border-radius:24px` and a `<span>Touche pour continuer</span>` label. Text swaps to `"Voir les programmes →"` when `n===4` (set inside `goToScene`'s `fadeText` callback).
- **Dot nav** (`.sdot`) — unchanged.

### 35.2 Mobile hamburger nav

On `max-width: 600px`, `#nav-supps-btn` and `#nav-coach-btn` are hidden with CSS. A `#nav-menu-btn` (circular 32px button, hamburger icon) appears in their place.

Tapping opens `#nav-mobile-menu` — a `position:fixed` dropdown anchored below the nav (top: 60px, right: 16px) with blur backdrop and two entries: 💊 Suppléments → `showLandSupps()` + close; 👤 Coach → `openM('m-coach-login')` + close.

`toggleNavMenu()` handles open/close. A delegated `document click` listener closes the menu when tapping outside both `#nav-mobile-menu` and `#nav-menu-btn`.

### 35.3 Landing supplements section — live data from Supabase

`#land-supps` hardcoded placeholder cards replaced with an empty `#supps-grid`. Data is fetched by `loadLandSupps()` (async, reads `supplements` table, `active=true`, ordered by `sort_order` then `created_at`).

Each product card shows: optional image (180px height, cover) or emoji fallback, name, description, price, and two action buttons — 📲 WhatsApp (`orderSupplement`) and `+ Panier` (`addToCart` + `showLandCartFeedback` 1.2s green flash). Out-of-stock products render at 0.5 opacity with a "Rupture" badge and no action buttons.

`loadLandSupps()` is called:
1. Automatically on page load from `DOMContentLoaded` (after `loadLanding()`, guarded by `typeof`).
2. When `showLandSupps()` is called (nav button or any scroll-to-supplements trigger).

`showLandCartFeedback(btn)` is a standalone helper (not tied to the store screen's `showCartAdded`) — swaps button text to `✓ Ajouté` and background to `#4ade80` for 1200ms.

> Do NOT call `renderStoreGrid` or `renderStoreCheckout` from this path — those belong to `#store-screen`. The landing section is a lightweight read-only preview that orders via WhatsApp or drops into the cart silently.

---

## 36. Tutorial system

See §35 implementation notes. Engine in `_showTutorialStep()`. `TUTORIAL_TR` with FR/EN/AR for 5 client steps + 5 coach steps. Auto-shows on first login via `tutorial_seen` flag (see §37 SQL). Replayable from client Moi tab and coach Settings. Tap backdrop to advance.

Client steps target: `nav-0` (Today), `nav-1` (Journal), `nav-2` (Plan), `nav-7` (Messages), `nav-3` (Progress) — the actual bottom nav button IDs.

Coach steps target: `coach-screen` (welcome, center), `coach-add-btn` (add client), `coach-dash` (plans/method), `coach-dash` (tracking), `coach-settings-btn` (customize) — `coach-settings-btn` is the `id` added to the ⋯ menu button at the top of the coach header.

`maybeShowTutorial()` — called at the end of `openPortal()`. Checks `CC.tutorial_seen`; shows client tutorial after 1200ms delay if false/undefined.

`maybeShowCoachTutorial()` — called after `renderCoachDash()` in `loadCoachDash()`. Checks `window._coachProfile?.tutorial_seen`; shows coach tutorial after 1200ms delay. `_coachProfile` is set in `_assertCoachSession()` by adding `tutorial_seen` to the `profiles` select.

`_tutorialDone()` — marks tutorial complete: sets `tutorial_seen=true` via `sb.from('profiles').update(...)` for coaches; for clients writes to `clients` table via `CC.id`. Uses `CC?.language || window.landLang || 'fr'` for language selection.

---

## 37. Coach isolation — `coach_id` column + RLS + empty dashboard state

### SQL — run once in Supabase SQL editor

```sql
-- 1. Add coach_id to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS
  coach_id uuid REFERENCES auth.users(id);

-- 2. Add tutorial_seen column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS
  tutorial_seen boolean DEFAULT false;

-- 3. Index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_coach_id
  ON profiles(coach_id);

-- 4. RLS: coaches only see their own clients
CREATE POLICY "coaches_see_own_clients" ON profiles
  FOR ALL USING (
    auth.uid() = id OR
    coach_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'coach'
      AND id = profiles.coach_id
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'supercoach'
    )
  );
```

> **Role note:** Sammy's current role value is `'coach'` (checked at `_assertCoachSession()` — `prof.role === 'coach'`). The RLS policy also allows `'supercoach'` for future multi-coach setups. If Sammy's role is ever upgraded to `'supercoach'`, update `_assertCoachSession` to accept both: `prof.role === 'coach' || prof.role === 'supercoach'`.

### Empty dashboard state

`renderCoachEmptyState()` is called by `renderCoachDash()` when `coachClients.length === 0`. Shows a centered gold-icon card with "Ta plateforme est prête" + "Ajouter un client" CTA button (calls `openAddCoachClient()`) + "Voir le guide →" button (calls `startCoachTutorial()`). The stats overview tiles, filter bar, and search bar are still rendered above it for a consistent dashboard chrome feel; only the client list area is replaced.

---

## 38. Coach dashboard cinematic rebuild

### Header (`.coach-hdr`)

Old CSS replaced with new cinematic block. Key changes:
- Fixed height 60px (was `var(--hdr-h)`), background `rgba(5,5,5,0.85)` + `backdrop-filter:blur(24px)`.
- Gold glow line via `::after` pseudo-element (120px centered gradient).
- Logo area: `.coach-hdr-logo-mark` (28px circle, gold border + text) + `.coach-hdr-title` (Fraunces italic). Both IDs `coach-logo-mark` + `coach-hdr-name` are wired into `applyAppSettings()` via `.js-coach-initials` class.
- Action buttons: `.coach-hdr-icon-btn` (34px circle ghost) with `.coach-hdr-badge` for unread counts. `.coach-hdr-btn.gold` replaces the old `btn-gold btn-sm`.
- `#coach-add-btn` id preserved (JS sets onclick in `renderCoachDash`).
- `#coach-settings-btn`, `#coach-hdr-menu`, `#notif-btn`, `#coach-msg-btn` all preserved.
- `.coach-hdr-menu` rebuilt: dark `#0d0d0d` bg, `border-radius:14px`, gold top glow line via `::before`. Contains all original actions plus new ones: Aujourd'hui, Modifier la page, Gérer le Store, Broadcast, Revenus, Exporter Excel, Codes promo, Claude Notes, Settings, Guide d'utilisation, Déconnexion.
- Old elements removed: SVG body-logo in header, `coach-hdr-actions` scroll area, `coach-hdr-fixed`, `notif-btn` emoji button, standalone logout button.
- `.coach-content` updated to `padding-top:calc(60px + 14px)` + `background:#050505`.

### `renderCoachDash()`

Fully rebuilt. No more component-string assembly — single `wrap.innerHTML` template. Layout uses `padding:0 18px 100px`.

Key sections (top to bottom):
1. Gold glow divider line.
2. **Today card** — gold-tinted glass card with Fraunces italic headline, `#today-entry-count` badge, chevron. Same `showCoachToday()` onclick.
3. **Live pulse** — `#coach-live-pulse` (green, same id/logic).
4. **Stat grid** — 2×2 using `.pm-hero-num` at 32px. IDs `stat-subscribers`, `stat-programme`, `stat-pending`, `stat-expiring` preserved. Pending amber, expiring red when > 0.
5. **Week stats** — `#coach-week-stats` glass card (Fraunces 24px italic, see §38 Part 4).
6. **Search** — pill input with inline SVG icon (no emoji).
7. **Filter tabs** — segment pills (Tous/Coaching/Programme) in a pill container + scrollable sub-filters. `.ctog-btn.active` injected via `<style>` tag on each render.
8. **Client list** — `#coach-client-list` or `renderCoachEmptyState()`.

All post-render calls preserved: `refreshCoachTodayCount`, `loadCoachWeekStats`, `refreshLivePulse`, `staggerCards`, `animateCount`.

Old bottom button block (landing editor, Excel export, Store, promo) moved to the `⋮` menu — no longer appended to `wrap.innerHTML`.

### `renderClientList()`

Cards rebuilt with inline styles. No longer uses `.client-card`, `.cc-av`, `.cc-tags`, `.cc-stats` classes. Preserved:
- `openCoachClient(id)` onclick
- `toggleClientFlag(id)` flag button with stopPropagation
- `streakBadge(_streak)` inside the name
- `complianceRing(_scoreNum, 28)` (size reduced from 36 to 28)
- `lastCheckinByClient[c.id]` check-in pill (green if today, muted if older, red if absent)
- `needs_attention` → red border on card instead of red left-border on old `.client-card`
- Day-left expiry badge (shown only when ≤ 15 days)

### `loadCoachWeekStats()` HTML

Three-column italic Fraunces grid (24px). Stat IDs `stat-checkins`, `stat-compliance`, `stat-nocheckin` preserved. All three columns remain clickable (`showCoachToday()`, `showCoachToday({section:4})`, `showCoachToday({section:3})`). Count-up animation unchanged.

---

## 39. Food tracker — USDA hybrid + Supabase `foods` cache

The 234-item `FR_DB` array is now a fallback. Primary search: Supabase `foods` table → USDA FoodData Central API. USDA results auto-cache back to `foods`.

### USDA API key

`const USDA_API_KEY = 'DEMO_KEY';` — declared before `openFoodModal()` (~line 7280). `DEMO_KEY` is rate-limited (~1000 req/hr public). Replace with a real key from <https://fdc.nal.usda.gov/api-guide.html>.

### SQL — run once in Supabase SQL editor

```sql
-- Foods cache table (local + USDA results)
CREATE TABLE IF NOT EXISTS foods (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  name_ar text,
  name_fr text,
  calories_100g numeric NOT NULL,
  protein_100g numeric NOT NULL,
  carbs_100g numeric NOT NULL,
  fat_100g numeric NOT NULL,
  fiber_100g numeric DEFAULT 0,
  category text,
  source text DEFAULT 'local',
  fdc_id text,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_foods_name
  ON foods USING gin(to_tsvector('simple', name));
CREATE INDEX IF NOT EXISTS idx_foods_source ON foods(source);
CREATE INDEX IF NOT EXISTS idx_foods_fdc_id ON foods(fdc_id);

-- RLS
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "foods_read_all" ON foods
  FOR SELECT USING (true);
CREATE POLICY "foods_insert_auth" ON foods
  FOR INSERT WITH CHECK (true);

-- Optional: add fiber column to food_logs if not already there
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS fiber numeric DEFAULT 0;
```

### Seed — 100+ Algerian/MENA staple foods

Run after creating `foods`:

```sql
INSERT INTO foods
  (name, name_ar, name_fr, calories_100g, protein_100g,
   carbs_100g, fat_100g, fiber_100g, category, source)
VALUES
-- VIANDES / PROTEINS
('Blanc de poulet cuit', 'صدر دجاج مطبوخ', 'Blanc de poulet cuit', 165, 31, 0, 3.6, 0, 'Viandes', 'local'),
('Cuisse de poulet cuite', 'فخد دجاج مطبوخ', 'Cuisse de poulet cuite', 209, 26, 0, 10.9, 0, 'Viandes', 'local'),
('Poulet entier rôti', 'دجاج مشوي', 'Poulet entier rôti', 215, 25, 0, 12, 0, 'Viandes', 'local'),
('Bœuf haché 5%', 'لحم بقري مفروم', 'Bœuf haché 5%', 137, 21, 0, 5, 0, 'Viandes', 'local'),
('Bœuf haché 15%', 'لحم بقري مفروم دهني', 'Bœuf haché 15%', 215, 17, 0, 15, 0, 'Viandes', 'local'),
('Steak de bœuf', 'ستيك لحم بقري', 'Steak de bœuf', 271, 26, 0, 18, 0, 'Viandes', 'local'),
('Agneau côtelettes', 'ضلع خروف', 'Agneau côtelettes', 294, 25, 0, 21, 0, 'Viandes', 'local'),
('Agneau haché', 'لحم خروف مفروم', 'Agneau haché', 282, 17, 0, 23, 0, 'Viandes', 'local'),
('Merguez', 'مرقاز', 'Merguez', 339, 14, 2, 30, 0, 'Viandes', 'local'),
('Dinde blanche', 'ديك رومي', 'Dinde blanche', 135, 29, 0, 1.7, 0, 'Viandes', 'local'),
('Foie de poulet', 'كبد دجاج', 'Foie de poulet', 172, 25, 1, 6, 0, 'Viandes', 'local'),
('Sardines en conserve', 'سردين معلب', 'Sardines en conserve', 208, 25, 0, 11, 0, 'Poissons', 'local'),
('Thon en conserve (eau)', 'تونة معلبة', 'Thon en conserve (eau)', 116, 26, 0, 1, 0, 'Poissons', 'local'),
('Saumon frais', 'سلمون طازج', 'Saumon frais', 208, 20, 0, 13, 0, 'Poissons', 'local'),
('Crevettes cuites', 'جمبري مطبوخ', 'Crevettes cuites', 99, 24, 0, 0.3, 0, 'Poissons', 'local'),
('Maquereau', 'مكرو', 'Maquereau', 205, 19, 0, 13, 0, 'Poissons', 'local'),
-- ŒUFS / LAITIERS
('Œuf entier', 'بيضة كاملة', 'Œuf entier', 155, 13, 1.1, 11, 0, 'Œufs & Laitiers', 'local'),
('Blanc d œuf', 'بياض البيض', 'Blanc d œuf', 52, 11, 0.7, 0.2, 0, 'Œufs & Laitiers', 'local'),
('Lait entier', 'حليب كامل الدسم', 'Lait entier', 61, 3.2, 4.8, 3.3, 0, 'Œufs & Laitiers', 'local'),
('Lait écrémé', 'حليب خالي الدسم', 'Lait écrémé', 34, 3.4, 5, 0.1, 0, 'Œufs & Laitiers', 'local'),
('Yaourt nature 0%', 'يوغرت طبيعي', 'Yaourt nature 0%', 56, 5.7, 7.7, 0.4, 0, 'Œufs & Laitiers', 'local'),
('Yaourt grec', 'يوغرت يوناني', 'Yaourt grec', 97, 9, 3.6, 5, 0, 'Œufs & Laitiers', 'local'),
('Fromage blanc 0%', 'جبن أبيض', 'Fromage blanc 0%', 45, 8, 3.5, 0.2, 0, 'Œufs & Laitiers', 'local'),
('Fromage blanc 20%', 'جبن أبيض دهني', 'Fromage blanc 20%', 102, 7.8, 3.5, 6.5, 0, 'Œufs & Laitiers', 'local'),
('Fromage edam', 'جبن إيدام', 'Fromage edam', 357, 25, 1.4, 27.8, 0, 'Œufs & Laitiers', 'local'),
('Fromage cheddar', 'جبن شيدر', 'Fromage cheddar', 403, 25, 1.3, 33, 0, 'Œufs & Laitiers', 'local'),
('Beurre', 'زبدة', 'Beurre', 717, 0.9, 0.1, 81, 0, 'Œufs & Laitiers', 'local'),
-- FÉCULENTS / GLUCIDES
('Riz blanc cuit', 'أرز أبيض مطبوخ', 'Riz blanc cuit', 130, 2.7, 28, 0.3, 0.4, 'Féculents', 'local'),
('Riz complet cuit', 'أرز بني مطبوخ', 'Riz complet cuit', 112, 2.6, 23, 0.9, 1.8, 'Féculents', 'local'),
('Pâtes cuites', 'معكرونة مطبوخة', 'Pâtes cuites', 131, 5, 25, 1.1, 1.8, 'Féculents', 'local'),
('Semoule cuite', 'سميد مطبوخ', 'Semoule cuite', 112, 3.8, 23, 0.2, 1.3, 'Féculents', 'local'),
('Couscous cuit', 'كسكس مطبوخ', 'Couscous cuit', 112, 3.8, 23, 0.2, 1.4, 'Féculents', 'local'),
('Pain blanc', 'خبز أبيض', 'Pain blanc', 265, 9, 49, 3.2, 2.7, 'Féculents', 'local'),
('Pain complet', 'خبز كامل الحبوب', 'Pain complet', 247, 13, 41, 4.2, 7, 'Féculents', 'local'),
('Galette (kesra)', 'خبز الدار', 'Galette', 290, 9, 56, 4.5, 2, 'Féculents', 'local'),
('Flocons d avoine', 'شوفان', 'Flocons d avoine', 389, 17, 66, 7, 10, 'Féculents', 'local'),
('Pomme de terre bouillie', 'بطاطس مسلوقة', 'Pomme de terre bouillie', 87, 1.9, 20, 0.1, 1.8, 'Féculents', 'local'),
('Patate douce cuite', 'بطاطا حلوة', 'Patate douce cuite', 90, 2, 21, 0.1, 3.3, 'Féculents', 'local'),
('Lentilles cuites', 'عدس مطبوخ', 'Lentilles cuites', 116, 9, 20, 0.4, 7.9, 'Légumineuses', 'local'),
('Pois chiches cuits', 'حمص مطبوخ', 'Pois chiches cuits', 164, 8.9, 27, 2.6, 7.6, 'Légumineuses', 'local'),
('Haricots blancs cuits', 'لوبيا بيضاء', 'Haricots blancs cuits', 139, 9.7, 25, 0.5, 10, 'Légumineuses', 'local'),
('Haricots rouges cuits', 'فاصوليا حمراء', 'Haricots rouges cuits', 127, 8.7, 23, 0.5, 7.4, 'Légumineuses', 'local'),
('Fèves cuites', 'فول مطبوخ', 'Fèves cuites', 110, 7.6, 20, 0.4, 8, 'Légumineuses', 'local'),
-- LÉGUMES
('Tomate', 'طماطم', 'Tomate', 18, 0.9, 3.9, 0.2, 1.2, 'Légumes', 'local'),
('Concombre', 'خيار', 'Concombre', 15, 0.7, 3.6, 0.1, 0.5, 'Légumes', 'local'),
('Courgette', 'كوسة', 'Courgette', 17, 1.2, 3.1, 0.3, 1, 'Légumes', 'local'),
('Aubergine', 'باذنجان', 'Aubergine', 25, 1, 6, 0.2, 3, 'Légumes', 'local'),
('Poivron', 'فلفل رومي', 'Poivron', 31, 1, 7, 0.3, 2.1, 'Légumes', 'local'),
('Carotte', 'جزر', 'Carotte', 41, 0.9, 10, 0.2, 2.8, 'Légumes', 'local'),
('Oignon', 'بصل', 'Oignon', 40, 1.1, 9.3, 0.1, 1.7, 'Légumes', 'local'),
('Ail', 'ثوم', 'Ail', 149, 6.4, 33, 0.5, 2.1, 'Légumes', 'local'),
('Épinards', 'سبانخ', 'Épinards', 23, 2.9, 3.6, 0.4, 2.2, 'Légumes', 'local'),
('Laitue', 'خس', 'Laitue', 15, 1.4, 2.9, 0.2, 1.3, 'Légumes', 'local'),
('Chou', 'ملفوف', 'Chou', 25, 1.3, 6, 0.1, 2.5, 'Légumes', 'local'),
('Brocoli', 'بروكلي', 'Brocoli', 34, 2.8, 7, 0.4, 2.6, 'Légumes', 'local'),
('Champignons', 'فطر', 'Champignons', 22, 3.1, 3.3, 0.3, 1, 'Légumes', 'local'),
('Céleri', 'كرفس', 'Céleri', 16, 0.7, 3, 0.2, 1.6, 'Légumes', 'local'),
-- FRUITS
('Banane', 'موز', 'Banane', 89, 1.1, 23, 0.3, 2.6, 'Fruits', 'local'),
('Pomme', 'تفاح', 'Pomme', 52, 0.3, 14, 0.2, 2.4, 'Fruits', 'local'),
('Orange', 'برتقال', 'Orange', 47, 0.9, 12, 0.1, 2.4, 'Fruits', 'local'),
('Fraise', 'فراولة', 'Fraise', 32, 0.7, 7.7, 0.3, 2, 'Fruits', 'local'),
('Datte Deglet', 'تمر دقلة', 'Datte Deglet', 282, 2.5, 75, 0.4, 8, 'Fruits', 'local'),
('Figue fraîche', 'تين طازج', 'Figue fraîche', 74, 0.8, 19, 0.3, 2.9, 'Fruits', 'local'),
('Raisin', 'عنب', 'Raisin', 69, 0.7, 18, 0.2, 0.9, 'Fruits', 'local'),
('Pastèque', 'دلاع', 'Pastèque', 30, 0.6, 7.6, 0.2, 0.4, 'Fruits', 'local'),
('Melon', 'بطيخ أصفر', 'Melon', 34, 0.8, 8.2, 0.2, 0.9, 'Fruits', 'local'),
('Myrtilles', 'توت أزرق', 'Myrtilles', 57, 0.7, 14, 0.3, 2.4, 'Fruits', 'local'),
('Abricot', 'مشمش', 'Abricot', 48, 1.4, 11, 0.4, 2, 'Fruits', 'local'),
('Pêche', 'خوخ', 'Pêche', 39, 0.9, 10, 0.3, 1.5, 'Fruits', 'local'),
-- MATIÈRES GRASSES
('Huile d olive', 'زيت زيتون', 'Huile d olive', 884, 0, 0, 100, 0, 'Graisses', 'local'),
('Huile de tournesol', 'زيت عباد الشمس', 'Huile de tournesol', 884, 0, 0, 100, 0, 'Graisses', 'local'),
('Huile de coco', 'زيت جوز الهند', 'Huile de coco', 892, 0, 0, 100, 0, 'Graisses', 'local'),
('Amandes', 'لوز', 'Amandes', 579, 21, 22, 50, 12, 'Fruits secs', 'local'),
('Noix', 'جوز', 'Noix', 654, 15, 14, 65, 6.7, 'Fruits secs', 'local'),
('Arachides', 'فول سوداني', 'Arachides', 567, 26, 16, 49, 8.5, 'Fruits secs', 'local'),
('Noix de cajou', 'كاجو', 'Noix de cajou', 553, 18, 30, 44, 3.3, 'Fruits secs', 'local'),
('Graines de chia', 'بذور الشيا', 'Graines de chia', 486, 17, 42, 31, 34, 'Fruits secs', 'local'),
('Beurre de cacahuète', 'زبدة الفول السوداني', 'Beurre de cacahuète', 588, 25, 20, 50, 6, 'Fruits secs', 'local'),
-- COMPLÉMENTS
('Whey protéine', 'مسحوق بروتين', 'Whey protéine', 400, 80, 8, 5, 0, 'Compléments', 'local'),
('Caséine', 'كازيين', 'Caséine', 360, 80, 5, 2, 0, 'Compléments', 'local'),
('Créatine monohydrate', 'كرياتين', 'Créatine monohydrate', 0, 0, 0, 0, 0, 'Compléments', 'local'),
('BCAA', 'بي سي أيه إيه', 'BCAA', 0, 0, 0, 0, 0, 'Compléments', 'local'),
-- BOISSONS
('Eau', 'ماء', 'Eau', 0, 0, 0, 0, 0, 'Boissons', 'local'),
('Lait de soja', 'حليب صويا', 'Lait de soja', 54, 3.3, 6.3, 1.8, 0.6, 'Boissons', 'local'),
('Lait d amande', 'حليب لوز', 'Lait d amande', 13, 0.4, 0.3, 1.1, 0.3, 'Boissons', 'local'),
('Café noir', 'قهوة سوداء', 'Café noir', 2, 0.3, 0, 0, 0, 'Boissons', 'local'),
('Thé vert', 'شاي أخضر', 'Thé vert', 1, 0, 0.2, 0, 0, 'Boissons', 'local'),
-- CONDIMENTS
('Harissa', 'هريسة', 'Harissa', 47, 1.6, 7, 1.6, 2.8, 'Condiments', 'local'),
('Miel', 'عسل', 'Miel', 304, 0.3, 82, 0, 0.2, 'Condiments', 'local'),
('Sucre blanc', 'سكر أبيض', 'Sucre blanc', 387, 0, 100, 0, 0, 'Condiments', 'local'),
('Ketchup', 'كاتشب', 'Ketchup', 112, 1.3, 27, 0.1, 0.7, 'Condiments', 'local'),
('Mayonnaise', 'مايونيز', 'Mayonnaise', 680, 1, 0.6, 75, 0, 'Condiments', 'local'),
('Sauce tomate', 'صلصة طماطم', 'Sauce tomate', 29, 1.4, 6.3, 0.2, 1.3, 'Condiments', 'local'),
-- PLATS ALGÉRIENS
('Chorba frik', 'شوربة فريك', 'Chorba frik', 95, 6, 14, 2, 2, 'Plats algériens', 'local'),
('Couscous au poulet', 'كسكس بالدجاج', 'Couscous au poulet', 180, 12, 24, 4, 2.5, 'Plats algériens', 'local'),
('Chakhchoukha', 'الشخشوخة', 'Chakhchoukha', 195, 10, 28, 5, 2, 'Plats algériens', 'local'),
('Rechta', 'الرشتة', 'Rechta', 165, 8, 26, 3.5, 2, 'Plats algériens', 'local'),
('Tajine zitoune', 'طاجين زيتون', 'Tajine zitoune', 210, 14, 8, 14, 1.5, 'Plats algériens', 'local'),
('Méchoui (agneau)', 'مشوي', 'Méchoui', 250, 22, 0, 17, 0, 'Plats algériens', 'local'),
('Bourek au thon', 'بوراك بالتونة', 'Bourek au thon', 230, 9, 22, 12, 1, 'Plats algériens', 'local'),
('Dolma (farci)', 'محشي', 'Dolma', 145, 8, 15, 6, 2, 'Plats algériens', 'local');
```

### `searchFood()` flow

1. **Debounce** 350ms after the user stops typing (`_foodSearchTimer`).
2. **Skip duplicates** — `_lastFoodQuery` short-circuits identical re-runs.
3. **Local first** — `sb.from('foods').select(...).or('name.ilike,name_ar.ilike,name_fr.ilike').limit(8)`. If ≥3 hits, render them and call `_searchUSDA()` in the background to top up.
4. **USDA fallback** — `_searchUSDA(q, localResults, res)` calls the FoodData Central `/foods/search` endpoint, parses `Energy/Protein/Carbohydrate, by difference/Total lipid (fat)/Fiber, total dietary` from each `foodNutrients` array, filters out `cal === 0` results.
5. **Combined render** — local entries first, USDA-only entries appended (deduped by lowercase name match).
6. **Cache to Supabase** — new USDA results not already in `localResults` are upserted with `onConflict: 'fdc_id', ignoreDuplicates: true`.

`renderFoodResults(foods, res)` paints the dropdown (gold cal value, optional Arabic subtitle, USDA / ★ source badge). `selectFood` reads the new `{n, n_ar, cal, p, g, l, fib, src}` shape; `updateFoodMacros` writes `f-fib` if present; `addFoodLog` adds `fiber` to the insert.

If USDA fails (no key, rate limit, offline), the function falls back to whatever local results were already fetched. If neither source has results: "Aucun résultat. Essaie en anglais ou scanne le code-barres."

### Modal UI

`#m-food` rebuilt — `padding:0`, `border:0.5px solid rgba(201,168,76,0.2)`, `border-radius:20px`, gold top glow. Sections: Journal label + Fraunces title, meal-type pills (4), search input with inline magnifier SVG + 📷 barcode button, `#f-results` dropdown, `#f-cats` category pills, `#f-status` glass card with quantity input + 50/100/150/200g quick buttons + 4-up macro grid (Fraunces 18px italic), gold "Ajouter au journal" CTA. Hidden `#f-fib` field for fiber. **Preserved**: `#f-meal-slots` / `#f-meal-slots-list` / `#f-meal-slot` blocks (regression safety — `selectMealType()` and `addFoodLog()` still depend on them).

### Don't reintroduce

- ❌ Removing `FR_DB` — kept as offline fallback.
- ❌ Hardcoding USDA results in JSX (always cache through Supabase so the next search hits local first).
- ❌ Calling `renderMealSlots` directly from inline onclick — go through `selectMealType()` which preserves the existing meal-plan slot integration.
