# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A marketing/landing site for **AgentShark** ("the operating system for the agent economy"). Static front end only — there is no backend. All metrics and the interactive agent data are intentionally fabricated and should be treated as if the product is fully rolled out.

## Commands

- `npm run dev` — Vite dev server (HMR).
- `npm run build` — type-check then build (`tsc -b && vite build`). Run this to validate changes; it fails on any TS error. The "chunk larger than 500 kB" warning is expected — it's the deliberately code-split Three.js/globe chunk, not a problem to fix.
- `npm run lint` — oxlint. There is **no test framework**; build + lint are the only checks.
- `npm run preview` — serve the production build locally. Use this (not `dev`) to verify clean-URL routing.

Dev vs. prod routing note: this is a multi-page app. In `npm run dev`, sub-pages are at `/about.html`; in production (and `npm run preview`) Vercel's `cleanUrls` serves them at `/about` and redirects `/about/` → `/about`.

## Architecture

**Stack:** Vite 8 + React 19 + Tailwind CSS v4 (via `@tailwindcss/vite`, no config file — theme is inline in CSS) + TypeScript. WebGL via `ogl` (aurora) and `@react-three/fiber`/`three`/`drei` (hero constellation). Deployed as a static site on Vercel.

**Multi-page app (MPA).** Each page is its own HTML entry with its own SEO `<title>`/meta/OG/JSON-LD, registered in `vite.config.ts` under `build.rollupOptions.input`:
- `index.html` → `src/main.tsx` → `src/App.tsx` (landing)
- `about.html` → `src/pages/about/main.tsx` → `src/pages/about/About.tsx`

To add a page: create `<name>.html` (copy `about.html`'s head, adjust meta + script src), `src/pages/<name>/main.tsx`, the page component, register the entry in `vite.config.ts`, and add the URL to `public/sitemap.xml`. Footer links to unbuilt pages are intentionally `#` placeholders.

**Design system is the source of truth, in `src/index.css`.** A Tailwind v4 `@theme` block defines all color/font tokens (e.g. `--color-accent`, `--color-success`, `--color-warn`, `--color-danger`, `--font-display`); Tailwind utilities derive from them (`bg-accent`, `text-warn`, etc.). Do not hardcode hex colors in components — use the tokens. The palette is deliberately constrained to blue accent + cyan plus semantic success/warn/danger.

Custom component classes (also in `index.css`) that recur across the site:
- `.bezel-outer` / `.bezel-inner` (and `-accent` variants) — the gradient-bordered "card" system used for every panel.
- `.reveal` / `.reveal-stagger` — scroll-in animations. They start hidden and animate when the class `.visible` is added by an IntersectionObserver. **Any new animated section must use these classes**, or it won't appear/animate. `.reveal-stagger` cascades its direct children (hardcoded nth-child delays up to 12).
- `.kicker` (section eyebrow), `.orb` / `.dot-grid` / `.grain-overlay` (ambient background layers), `.live-dot`, `.cascade-step`.

**Shared page chrome.** `PageShell.tsx` wraps sub-pages with ambient background, `NavBar`, `Footer`, and the reveal IntersectionObserver. The landing page (`App.tsx`) replicates this chrome inline rather than using `PageShell`. `NavBar` and `Footer` take a `routePrefix` prop (default `''` on the landing, `'/'` on sub-pages) so in-page anchors like `#pricing` resolve to `/#pricing` from another page. `App.tsx` also contains a hash-deep-link effect (scrolls to `#id` after render on load), paired with `scroll-margin-top` rules in `index.css` so anchor targets clear the fixed navbar.

**Notable components.** `SoftAurora.tsx` is a WebGL shader background (the lightweight `ogl` dependency). `Hero.tsx`'s right side is the interactive 3D agent constellation: `AgentScene.tsx` lazy-loads `AgentGlobe.tsx` (react-three-fiber + three + drei) behind an error boundary with a static-glow fallback, gating auto-motion on `prefers-reduced-motion` and drag on `(pointer: fine)`. The Three.js bundle is intentionally code-split (its own ~900KB chunk) so it never blocks first paint. Per-node agent data is deterministic in `networkData.ts` (`recordFor(i)`) and shared by both the 3D node colors and the click-to-inspect detail card, so the scene and card always agree. `AgentScene` owns the focus state; clicking a node tells `AgentGlobe` to rotate it front-and-center and opens the card. Note the hero runs **two WebGL contexts** (the aurora plus the globe) — keep that in mind for perf. All animation respects `prefers-reduced-motion`.

**Deploy config.** `vercel.json` sets `cleanUrls`, `trailingSlash: false`, long-cache headers for `/assets`, and a strict CSP. The CSP only allows Google Fonts as an external origin — adding any other third-party script/style/font/origin requires updating the CSP there, or it will be blocked in production.

## Conventions

- TypeScript runs with `verbatimModuleSyntax` (use `import type` for type-only imports) and `noUnusedLocals`/`noUnusedParameters` (no unused identifiers, or the build fails).
- No em dashes in user-visible copy (titles, meta, body) — use periods, commas, or colons. This applies to rendered text and HTML `<title>`/meta.
