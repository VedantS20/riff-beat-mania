# Riff Master

Build a modern, high-energy web application called "RiffSpot" - a fast-paced music guessing game focused exclusively on Rock and Metal bands.

### Aesthetic & UI Theme

- Theme: Modern dark-mode aesthetic with high-contrast accents (crimson red #E50914, electric violet, dark charcoal #0F0F12, and pure white text).

- Vibe: Sleek, high-production, immersive, and polished—resembling Spotify meets a high-end arcade game.

- Background: Dynamic dark glassmorphism gradient during gameplay. When a video reveals, the background transforms into a smooth, muted full-screen background video layer with an adjustable semi-transparent dark overlay.

### Core Gameplay Mechanics & States

1. Game Setup Screen:

   - Select difficulty: Easy (Classic Rock, Nu-Metal), Medium (Hard Rock, Heavy Metal, Grunge), Hard (Thrash, Death Metal, Progressive Rock).

   - Mode options: 5 rounds, 10 rounds, or Endless Mode.

2. Active Round (Guessing State):

   - Center Stage: A stylized, animated retro vinyl record or audio visualizer pulsing to the rhythm of a 30-second audio snippet.

   - Timer Countdown: Visual ring or progress bar for the snippet duration.

   - Input Mechanism: Four multiple-choice cards (Band + Song Title) featuring high-contrast hover effects and keyboard shortcuts (1, 2, 3, 4).

   - Utility Buttons: "Skip / Give Up" button and a volume controller.

3. Reveal State (Correct Guess or Gave Up):

   - Background Transition: Instantly fade in a full-screen background YouTube video embed of the song's official music video starting at the timestamp of the guess.

   - Foreground Overlay: Sleek glassmorphic card displaying:

     - Result banner ("CORRECT!" with green glow or "ROUND OVER" with red glow).

     - Full track metadata: Song Title, Band Name, Release Year, Sub-genre tag (e.g., "Thrash Metal").

     - Scoring breakdown (Speed bonus + Base points).

     - "Next Round" button with countdown.

4. Game Over Screen:

   - Final score total, accuracy percentage, longest streak, and a breakdown of guessed vs. missed tracks.

   - "Play Again" and "Share Score" buttons.

### Technical Implementation Details

- Use Deezer API (or Spotify Preview endpoints) for fetching rock/metal track audio previews and metadata.

- Use the YouTube IFrame API to play the full-screen music video in the background during the Reveal State (with pointer-events disabled so the background video doesn't intercept clicks).

- Ensure smooth framerates, polished motion transitions (using Framer Motion / Lucide icons), and fully responsive layout for both desktop and mobile views.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://riff-beat-mania.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f11640fb-0fd1-47fa-b287-69e9bea26bcf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
