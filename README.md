# Nightstand

A calm, ambient **flip clock** for your phone. Leave it glowing on your desk or
nightstand — split-flap digits tick over against a slow, living background that
shifts color with the time of day.

It's a frontend-only web app that installs to your home screen and works offline.

> **Live:** https://nightstand-clock.vercel.app/

## Features

- **Split-flap flip clock** — each digit sits on a card that folds down when it
  changes, with a hinge and soft shadow for depth.
- **Ambient time-of-day background** — a gradient that blends smoothly all day:
  indigo/violet at night, warm at dawn, soft blue at midday. It drifts slowly so
  it feels alive without being distracting.
- **Dark and minimal** — no buttons or chrome, just the time with a whisper-light
  date below. Tuned to glow gently in a dark room.
- **Mobile-first PWA** — installable to your home screen, opens fullscreen like a
  native app, and keeps working with no internet connection.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- CSS 3D transforms for the flip animation
- A small service worker for offline support
- Deployed on [Vercel](https://vercel.com)

No database, no backend — everything runs in the browser and reads the device's
own clock, so the time is always correct wherever you are.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edits reload live.

```bash
npm run build   # production build
npm start       # serve the production build
```

> The service worker (offline mode) only runs in the production build, not in
> `npm run dev`.

## How it works

- **The clock** ([app/page.tsx](app/page.tsx)) reads the time every second and
  formats it as `HH:MM`, then renders each character as a flip card.
- **The flip** ([components/FlipDigit.tsx](components/FlipDigit.tsx)) stacks four
  layers — two static halves and two folding flaps — and replays a CSS fold
  whenever a digit changes.
- **The background** ([lib/sky.ts](lib/sky.ts)) maps the current hour to two
  gradient colors by interpolating between a handful of color anchors through the
  day. A slow CSS animation keeps it gently drifting.
- **Offline** ([public/sw.js](public/sw.js)) caches the app shell so it loads
  instantly and works without a connection.

## Project structure

```
app/
  layout.tsx     app shell, metadata, fonts, PWA tags
  page.tsx       the clock
  manifest.ts    web app manifest (installability)
  icon.svg       favicon
  globals.css    Tailwind + flip and background styles
components/
  FlipDigit.tsx              one split-flap digit card
  ServiceWorkerRegister.tsx  registers the service worker
lib/
  sky.ts         time-of-day gradient colors
public/
  sw.js          service worker
  icons/         app icons (192 / 512 / maskable / apple)
scripts/
  icon.svg            source icon
  generate-icons.mjs  renders the PNG icons
```
