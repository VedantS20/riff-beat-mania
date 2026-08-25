# RiffSpot — Rock & Metal Guessing Game

A fast, dark-mode music guessing game: hear a 30s snippet, pick the right band + song from four cards, then the official music video fades in full-screen behind a glass result card.

## Screens & Flow

```text
Setup  ->  Round (audio + 4 cards + timer)  ->  Reveal (YouTube bg + result card)  ->  next round...  ->  Game Over
```

1. **Setup** — difficulty (Easy: classic rock / nu-metal; Medium: hard rock / heavy metal / grunge; Hard: thrash / death / prog) and length (5, 10, Endless). Big neon-edged selector cards, animated background.
2. **Round** — pulsing vinyl/visualizer center stage reacting to the audio, countdown ring for the 30s snippet, four high-contrast answer cards (band + song) with keyboard shortcuts 1-4, Skip/Give Up, volume slider with mute.
3. **Reveal** — background music video fades in full-screen (muted, pointer-events off) while the snippet stops; foreground glass card shows CORRECT (green glow) or ROUND OVER (red glow), song title, band, release year, sub-genre tag, score breakdown (base + speed bonus), and a Next Round button with auto-advance countdown.
4. **Game Over** — total score, accuracy %, longest streak, per-track hit/miss list, Play Again and Share Score (clipboard/native share).

## Look & Feel

- Crimson `#E50914` primary, electric violet secondary accent, charcoal `#0F0F12` base, white text — all as semantic tokens in `src/styles.css` (oklch), no hardcoded colors in components.
- Condensed industrial display font for headings + clean sans for body, loaded via `<link>` in the root route.
- Glassmorphism panels, subtle grain, animated gradient/aurora backdrop, glow shadows, Framer Motion transitions between states, Lucide icons.
- Fully responsive: cards stack 1-column on mobile, 2x2 grid on desktop; touch-friendly hit areas.

## Content & Data

- A curated in-repo catalog of rock/metal tracks (~120+ across the three difficulty tiers), each with band, title, year, sub-genre, and a YouTube video ID for the official video. This keeps the game reliable and instant, with no third-party API keys or quota to configure.
- Audio previews are fetched from Deezer through a small server function (Deezer blocks direct browser calls), matched on band + title, with the result cached per round. Tracks whose preview can't be resolved are skipped and replaced so a round never stalls.
- Distractor answers are drawn from other tracks in the same difficulty tier so wrong options stay plausible.

## Technical Notes

- Routes: `/` (setup) and `/play` for the game session, each with its own `head()` metadata; game state lives in a React reducer + context, no backend or accounts.
- Audio: single `HTMLAudioElement` driving a Web Audio `AnalyserNode` for the visualizer; requestAnimationFrame loop for the timer ring so it stays frame-smooth.
- Video: YouTube IFrame API loaded lazily on first reveal, `autoplay + mute + controls=0 + modestbranding`, seeded at the timestamp where the guess landed, wrapped in a container with `pointer-events: none` and an adjustable dark overlay.
- Browser-only pieces (audio graph, YouTube player) are client-gated so SSR and prerender stay clean; the Deezer fetch runs in a `createServerFn` handler.
- Adds `framer-motion` as the only new dependency.

## Out of Scope (for now)

- Accounts, persistent leaderboards, or multiplayer.
- Playing full songs — only the 30s legal previews plus embedded official videos.
