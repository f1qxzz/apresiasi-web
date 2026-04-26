# Apresiasi Web

Interactive appreciation web app built with Next.js.
The app includes a cinematic intro, interactive flow, and memory-based mini game experience.

## Repository

- GitHub: [https://github.com/f1qxzz/apresiasi-web](https://github.com/f1qxzz/apresiasi-web)
- Clone:

```bash
git clone https://github.com/f1qxzz/apresiasi-web.git
cd apresiasi-web
```

## Features

- Multi-step interaction flow
- Cinematic intro scene
- Memory match mini game
- Animated UI with Framer Motion
- Optional background music

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Customization

- Update interaction logic in `components/InteractionFlow.tsx`
- Update intro behavior in `components/CinematicIntro.tsx`
- Update game flow in `components/MemoryMatch.tsx`
- Replace music file at `public/pretty.mp3` if needed

## Notes

- This repository is published under your own GitHub account (`f1qxzz`).
- Personal photo files are intentionally not pushed by default.
- If needed, add your own photo assets in `public/` (for example `1.jpeg` to `15.jpeg`) and keep filenames consistent with app logic.
