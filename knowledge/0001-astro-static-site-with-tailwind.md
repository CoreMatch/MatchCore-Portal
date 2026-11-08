# 0001. Astro Static Site with Tailwind CSS

## Status
accepted

## Context
The project needed a small, content-first site for publishing product landing pages,
with no dynamic server logic (no login, no API, no database).

## Decision
Build the portal as a fully static Astro site:

- Astro ^7.2.4 is the framework, with Tailwind CSS v4 (^4.3.3) integrated through
  `@tailwindcss/vite` as a Vite plugin (package.json (field: @tailwindcss/vite),
  astro.config.mjs::tailwindcss).
- No SSR adapter dependency and no `output` override, so builds are fully static
  (package.json (field: dependencies), astro.config.mjs::defineConfig).
- TypeScript strict mode via `astro/tsconfigs/strict`
  (tsconfig.json (field: astro/tsconfigs/strict)); Node
  >= 22.12.0 required (package.json (field: >=22.12.0)).
- Pages are `.astro` components; copy lives in i18n JSON bundles; styling is Tailwind
  utility classes plus one global import
  (src/styles/global.css (field: @import "tailwindcss")).
- AI-agent development guidance ships in-repo as AGENTS.md, with CLAUDE.md as a
  symlink to it (AGENTS.md:1-22 fp=258e7155).

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
- package.json (field: matchcore-portal) (name matchcore-portal; engines node
  >=22.12.0; scripts dev/build/preview; dependencies astro ^7.2.4, tailwindcss
  ^4.3.3, @tailwindcss/vite ^4.3.3; no adapter dependency)
- astro.config.mjs::defineConfig (tailwindcss Vite plugin; i18n block; nothing else)
- tsconfig.json (field: astro/tsconfigs/strict) ("extends": "astro/tsconfigs/strict")
- src/styles/global.css (field: @import "tailwindcss") (`@import "tailwindcss";`)
- AGENTS.md:1-22 fp=258e7155 (development and documentation guidance); CLAUDE.md is a symlink to
  AGENTS.md (repository root)
