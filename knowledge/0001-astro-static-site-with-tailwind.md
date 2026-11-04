# 0001. Astro Static Site with Tailwind CSS

## Status
accepted

## Date
2026-08-21

## Context
The project needed a small, content-first site for publishing product landing pages,
with no dynamic server logic (no login, no API, no database). The repository was
created on 2026-08-21 (commit b80199e8 "Initial commit") and the web project was
initialized the same day (commit 510711e9 "chore: initialize new astro project with
basic configuration").

## Decision
Build the portal as a fully static Astro site:

- Astro ^7.2.4 is the framework, with Tailwind CSS v4 (^4.3.3) integrated through
  `@tailwindcss/vite` as a Vite plugin (package.json:14-18, astro.config.mjs:14-16).
- No SSR adapter dependency and no `output` override, so builds are fully static
  (package.json:14-18, astro.config.mjs:6-17).
- TypeScript strict mode via `astro/tsconfigs/strict` (tsconfig.json:2); Node
  >= 22.12.0 required (package.json:5-7).
- Pages are `.astro` components; copy lives in i18n JSON bundles; styling is Tailwind
  utility classes plus one global import (src/styles/global.css:1).
- AI-agent development guidance ships in-repo as AGENTS.md, with CLAUDE.md as a
  symlink to it (AGENTS.md:1-22).

## Consequences
- Adding or changing copy requires editing components/JSON and rebuilding; there is no
  CMS and no content collection.
- Any future page that needs server logic would require adding an adapter and changing
  hosting; today the site can be served by any static host.
- Costs and limitations: content and markup are interleaved in components, so
  non-developers cannot edit copy without touching code; the site pins a very recent
  framework major (Astro 7) and a very recent Tailwind major (v4), so upgrade and
  ecosystem-compatibility risk is carried by a repository with no test suite or CI
  (see entry 0005).

## Evidence
- package.json:1-19 (name matchcore-portal; engines node >=22.12.0; scripts
  dev/build/preview; dependencies astro ^7.2.4, tailwindcss ^4.3.3,
  @tailwindcss/vite ^4.3.3; no adapter dependency)
- astro.config.mjs:1-17 (tailwindcss Vite plugin; i18n block; nothing else)
- tsconfig.json:2 ("extends": "astro/tsconfigs/strict")
- src/styles/global.css:1 (`@import "tailwindcss";`)
- AGENTS.md:1-22 (development and documentation guidance); CLAUDE.md is a symlink to
  AGENTS.md (repository root)
- commit b80199e8088339911841080bd6133443190b5463 — Initial commit (AGPL-3.0 LICENSE
  plus title-only README)
- commit 510711e9bbbb4042207bc9fc5a6fa0b281bf9585 — chore: initialize new astro
  project with basic configuration
- commit 65ad380606e29a138efe47475b2b2b7bf6686596 — feat: integrate Tailwind CSS and
  build MatchCore portal homepage
