# 0003. Scope Is Two Landing Pages Linking Outward for Docs, Demo, and Code

## Status
accepted

## Date
2026-08-22

## Context
The repository is a portal: it does not host the products themselves, so it had to
settle what content it publishes and where visitors go for docs, demo, source, and
community. The homepage started with HRPAuth-flavored positioning and was repurposed
to MatchCore Arena on 2026-08-22 (commit 047b48f6 changed the subtitle from
"authentication and skin management service" to "competitive gaming and esports
platform" and repoUrl from CoreMatch/HRPAuth to CoreMatch/MatchCoreArena-Client); a
dedicated HRPAuth page had been added on 2026-08-21 (commit 8068998a).

## Decision
The site publishes exactly two pages, each with a zh-cn mirror:

- `/` — the MatchCore Arena product landing: game-mode features (Bedwars, MLG-Rush,
  Skywars, Ultra Hardcore), Elo-MMR ranking and anti-cheat highlights, usage stats,
  and resource cards (src/components/HomePage.astro:15-33,
  src/i18n/pages/home.json:43-87).
- `/hrpauth` — the HRPAuth service landing: unified-authentication and skin-management
  features with technical highlights (src/pages/hrpauth.astro:12-30,
  src/i18n/pages/hrpauth.json).

All off-site destinations are centralized in src/site.ts and open in new tabs: docs ->
https://wiki.samuelcheston.com/, demo -> https://auth.samuelcheston.com/, source and
community -> CoreMatch/MatchCoreArena-Client and its issue tracker
(src/site.ts:1-8). There is no rules page, no download page, and no links page; the
homepage primary CTA is labeled "Download"/"下载" but points at the docs URL
(src/i18n/pages/home.json:6,47; src/components/Banner.astro:28-45).

## Consequences
- The portal is a signpost: it owns no documentation, demo, or issue tracker, so all
  deeper content depends on the availability of wiki.samuelcheston.com,
  auth.samuelcheston.com, and GitHub.
- Content is visibly work-in-progress, which limits how much marketing weight the site
  can carry today:
  - English home features item5/item6 are placeholders ("gsd"/"gseg.", "Opmg"/"jiytr.")
    (src/i18n/pages/home.json:65-68); the zh-cn bundle omits them and falls back to
    those placeholders.
  - Stats disagree between locales: zh-cn claims 5,000,000+ matches while en claims
    500k+ (src/i18n/pages/home.json:11 vs :52).
  - src/pages/hrpauth.astro:48 contains the malformed tag
    `< Banner pageUi={hrpauth} />` (introduced by commit 9e34e9f3 and still present).
  - The hero image is a hotlinked AI-generation URL whose prompt still describes
    "Minecraft authentication and skin management" — the site's earlier HRPAuth
    orientation (src/components/Banner.astro:65-69).
  - The shared Banner renders siteConfig.projectName ("MatchCore") as the H1 on every
    page, including /hrpauth (src/components/Banner.astro:21-23, src/site.ts:2).
- src/site.ts:9-16 defines `siteConfigHrpauth` with HRPAuth-specific endpoints, but
  nothing imports it; the HRPAuth page imports `siteConfig` instead
  (src/pages/hrpauth.astro:6), so its Docs/Demo/Source links point at
  MatchCoreArena-Client rather than CoreMatch/HRPAuth. Whether this is a bug or
  intentional reuse is pending author confirmation.

## Evidence
- src/site.ts:1-16
- src/components/HomePage.astro:15-33; src/components/Banner.astro:21-23, 28-45,
  65-69; src/components/Header.astro:10-15, 47-64
- src/pages/hrpauth.astro:6, 12-30, 48; src/i18n/pages/home.json:6, 11, 47, 52, 65-68;
  src/i18n/pages/hrpauth.json:3, 50
- src/i18n/common.json:12, 28 (footer "© 2026 MatchCore")
- commit 8068998a3866ee64da96d25b01abfaead8b73ef3 — feat: add hrpauth page for
  internationalized routing
- commit 047b48f660ebf42ff3ef96bef265d4828f80d322 — content added (siteConfig
  repurposed from HRPAuth to MatchCore Arena; siteConfigHrpauth added)
- commit 8e30ba4570da52a0505a37ed2dc275b84a9b1936 — content added (homepage feature
  icons changed from ID/SK/DX/API to BW/MR/SW/UHC)
- commit 9e34e9f338391936e04948343d5edc42829d49f2 — feat(i18n): refactor translation
  system to support page-specific bundles (introduced the `< Banner` markup in
  src/pages/hrpauth.astro, verified via line history of that file)
