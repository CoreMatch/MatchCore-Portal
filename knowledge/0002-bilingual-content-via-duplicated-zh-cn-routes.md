# 0002. Bilingual Content via Duplicated /zh-cn Routes with English Default

## Status
accepted

## Date
2026-08-21

## Context
The portal addresses both Chinese- and English-speaking audiences. Internationalization
was introduced on the same day as the site itself (commit 548ed2c6, 2026-08-21) with
default locale 'zh-CN'; during the page-bundle refactor the default was switched to
'en' and the locale renamed 'zh-cn' (commit 9e34e9f3, 2026-08-21).

## Decision
- Astro i18n is configured with `defaultLocale: 'en'`, `locales: ['zh-cn', 'en']`, and
  `prefixDefaultLocale: false` — English pages live at the root, Chinese pages under
  `/zh-cn/` (astro.config.mjs:7-13).
- Each locale is a physical page file: src/pages/index.astro and
  src/pages/zh-cn/index.astro, src/pages/hrpauth.astro and
  src/pages/zh-cn/hrpauth.astro.
- Translations live in JSON bundles: shared nav/footer strings in
  src/i18n/common.json, per-page copy in src/i18n/pages/home.json and
  src/i18n/pages/hrpauth.json. Lookup order is page bundle in the current language,
  then page bundle in the default language, then common strings
  (src/i18n/utils.ts:10-26).
- Root pages embed an inline client script that redirects browsers whose language
  starts with "zh" to the /zh-cn/ path once per session (sessionStorage
  'hasRedirected' guard) (src/pages/index.astro:12-22, src/pages/hrpauth.astro:34-44).

## Consequences
- Every new page must be created twice (root + zh-cn); the two copies can drift, and
  only the English copies carry the redirect script (src/pages/zh-cn/index.astro:1-13
  and src/pages/zh-cn/hrpauth.astro:33-38 contain no script).
- The redirect is client-side JavaScript: crawlers and no-JS users always land on the
  English page first; there is no hreflang/alternate metadata (src/layouts/Layout.astro
  emits only description/viewport/generator meta, lines 16-23).
- The fallback chain silently surfaces English strings on zh-cn pages when a key is
  missing — currently visible: the zh-cn home bundle has no features.item5/item6, so
  the English placeholders "gsd"/"Opmg" render instead (src/i18n/pages/home.json:65-68
  via src/i18n/utils.ts:16-18).
- URLs without a recognized language prefix are treated as English
  (src/i18n/utils.ts:4-8).

## Evidence
- astro.config.mjs:7-13
- src/pages/index.astro:12-22; src/pages/hrpauth.astro:34-44 (browser-language
  redirect scripts)
- src/pages/zh-cn/index.astro:1-13; src/pages/zh-cn/hrpauth.astro:33-38 (zh-cn pages
  without redirect script)
- src/i18n/utils.ts:4-8, 10-26, 28-34; src/i18n/ui.ts:1-6
- src/i18n/common.json:1-34; src/i18n/pages/home.json; src/i18n/pages/hrpauth.json
- commit 548ed2c6a091d630af47ce3d10cbf7932f671f05 — feat(i18n): add
  internationalization support for zh-CN and en locales (defaultLocale was 'zh-CN' in
  astro.config.mjs at that commit)
- commit 9e34e9f338391936e04948343d5edc42829d49f2 — feat(i18n): refactor translation
  system to support page-specific bundles (defaultLocale 'zh-CN' -> 'en', locale
  'zh-CN' -> 'zh-cn')
- commit e4aea25e6d4a7ae6e2ce2d8c664ef02a6190ef21 — fix(i18n): correct language code
  case and fix import paths (added the automatic redirect)
- commit 48db1953d5cb6e972f5b274af893d369bc3e0e37 — refactor(i18n): migrate
  translation files from TypeScript to JSON
