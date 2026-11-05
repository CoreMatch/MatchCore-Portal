# 0002. Bilingual Content via Duplicated /zh-cn Routes with English Default

## Status
accepted

## Context
The portal addresses both Chinese- and English-speaking audiences.

## Decision
- Astro i18n is configured with `defaultLocale: 'en'`, `locales: ['zh-cn', 'en']`, and
  `prefixDefaultLocale: false` — English pages live at the root, Chinese pages under
  `/zh-cn/` (astro.config.mjs (field: defaultLocale)).
- Each locale is a physical page file: src/pages/index.astro and
  src/pages/zh-cn/index.astro, src/pages/hrpauth.astro and
  src/pages/zh-cn/hrpauth.astro.
- Translations live in JSON bundles: shared nav/footer strings in
  src/i18n/common.json, per-page copy in src/i18n/pages/home.json and
  src/i18n/pages/hrpauth.json. Lookup order is page bundle in the current language,
  then page bundle in the default language, then common strings
  (src/i18n/utils.ts::useTranslations).
- Root pages embed an inline client script that redirects browsers whose language
  starts with "zh" to the /zh-cn/ path once per session (sessionStorage
  'hasRedirected' guard) (src/pages/index.astro (field: hasRedirected),
  src/pages/hrpauth.astro (field: hasRedirected)).

## Consequences
- Every new page must be created twice (root + zh-cn); the two copies can drift, and
  only the English copies carry the redirect script
  (src/pages/zh-cn/index.astro (field: pageUi={home}) and
  src/pages/zh-cn/hrpauth.astro (field: Banner pageUi={hrpauth}) contain no script).
- The redirect is client-side JavaScript: crawlers and no-JS users always land on the
  English page first; there is no hreflang/alternate metadata
  (src/layouts/Layout.astro (field: name="generator") emits only
  description/viewport/generator meta).
- The fallback chain silently surfaces English strings on zh-cn pages when a key is
  missing — currently visible: the zh-cn home bundle has no features.item5/item6, so
  the English placeholders "gsd"/"Opmg" render instead
  (src/i18n/pages/home.json (field: features.item5.title) via
  src/i18n/utils.ts (field: pageUi[defaultLang])).
- URLs without a recognized language prefix are treated as English
  (src/i18n/utils.ts::getLangFromUrl).

## Evidence
- astro.config.mjs (field: defaultLocale)
- src/pages/index.astro (field: hasRedirected);
  src/pages/hrpauth.astro (field: hasRedirected) (browser-language redirect scripts)
- src/pages/zh-cn/index.astro (field: pageUi={home});
  src/pages/zh-cn/hrpauth.astro (field: Banner pageUi={hrpauth}) (zh-cn pages
  without redirect script)
- src/i18n/utils.ts::getLangFromUrl, src/i18n/utils.ts::useTranslations,
  src/i18n/utils.ts::useTranslatedPath; src/i18n/ui.ts::defaultLang
- src/i18n/common.json (field: nav.home); src/i18n/pages/home.json;
  src/i18n/pages/hrpauth.json
