# Visual Rules

Used by `ui-ux-advisor`, `landing-copywriter` (when proposing layouts), and `reel-scriptwriter` (for b-roll direction).

## Palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#050505` | Page background. Never pure black `#000`. |
| `--surface` | `rgba(255,255,255,.02)` | Cards over `--bg` |
| `--surface-2` | `rgba(255,255,255,.04)` | Elevated cards |
| `--gold` | `#C9A84C` | Brand primary. Use sparingly — accents only. |
| `--gold-soft` | `rgba(201,168,76,.15)` | Gold tints (backgrounds, borders) |
| `--green` | `#4ade80` | Success / today / positive progress |
| `--amber` | `#FF9500` | Streaks, energy |
| `--red` | `#ef4444` | Errors / danger / expiring |
| `--text` | `#fff` | Primary text |
| `--text-mute` | `rgba(255,255,255,.4)` | Secondary text |
| `--text-faint` | `rgba(255,255,255,.25)` | Captions, timestamps |
| `--hairline` | `rgba(255,255,255,.06)` | Card borders |

## Typography

- **Display / emotional**: Fraunces, italic, font-weight 300. Used for hero headers, identity lines, day labels.
- **UI**: Inter (or system `-apple-system, BlinkMacSystemFont, sans-serif`). Weights 400 / 600 / 700 / 800.
- **Numbers as data**: serif italic (Fraunces / Georgia) at large sizes — "32 kg perdus". Never bodybuilding-bold.
- **Numbers in dense UI**: sans-serif, weight 700.

## Layout principles

- **One decision per screen.** If a screen asks for two unrelated actions, split it.
- **Edge padding 16–20px** on mobile. Cards stack with 10–14px gap.
- **Border radius**: 12px for inline elements, 16–18px for cards, 20–24px for hero zones, 99px for pills.
- **Blur backgrounds** (`backdrop-filter: blur(12px–40px)`) on overlays only. Not on inline cards.
- **Animations**: 150–400ms, cubic-bezier(.22,.84,0,1) for slides, ease for fades. Never linear.
- **Haptics on confirms only.** Never on scroll, hover, or polling.

## Icon style

- Stroke-based SVG, `stroke-width: 1.5–2`, `stroke-linecap: round`.
- Emojis only as section markers (✦ for premium, ⚡ for streaks, 🏆 for PRs).
- No filled icons. No flat material-style icons.

## Photo direction (for Reels/landing imagery)

- Low-key lighting. One dominant warm light source. Shadows preserved.
- Clients in motion, not posed. Never gym-selfie energy.
- Equipment textured: matte black, brushed steel, leather.
- Avoid: white gym backgrounds, neon, flexing poses, before/after with date stamps.

## Mistakes to flag

- Pure black backgrounds → too harsh, use `#050505`
- Pure white text on light gold → low contrast, use `#000` on gold
- Centered body copy on long blocks → only headers and CTAs are centered
- Multiple gold accents in one card → gold is a spotlight, one per card
- Two competing CTAs → primary + ghost only
