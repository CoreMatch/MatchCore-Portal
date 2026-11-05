# 0003. Scope Is Two Landing Pages Linking Outward for Docs, Demo, and Code

## Status
accepted

## Context
The repository is a portal: it does not host the products themselves, so it had to
settle what content it publishes and where visitors go for docs, demo, source, and
community.

## Decision
The site publishes exactly two pages, each with a zh-cn mirror:

- `/` — the MatchCore Arena product landing: game-mode features (Bedwars, MLG-Rush,
  Skywars, Ultra Hardcore), Elo-MMR ranking and anti-cheat highlights, usage stats,
  and resource cards (src/components/HomePage.astro::features,
  src/i18n/pages/home.json (field: Bedwars)).
- `/hrpauth` — the HRPAuth service landing: unified-authentication and skin-management
  features with technical highlights (src/pages/hrpauth.astro::features,
  src/i18n/pages/hrpauth.json).

All off-site destinations are centralized in src/site.ts and open in new tabs: docs ->
https://wiki.samuelcheston.com/, demo -> https://auth.samuelcheston.com/, source and
community -> CoreMatch/MatchCoreArena-Client and its issue tracker
(src/site.ts::siteConfig). There is no rules page, no download page, and no links page; the
homepage primary CTA is labeled "Download"/"下载" but points at the docs URL
(src/i18n/pages/home.json (field: banner.ctaPrimary);
src/components/Banner.astro (field: ctaPrimary)).

## Consequences
- The portal is a signpost: it owns no documentation, demo, or issue tracker, so all
  deeper content depends on the availability of wiki.samuelcheston.com,
  auth.samuelcheston.com, and GitHub.
- Content is visibly work-in-progress, which limits how much marketing weight the site
  can carry today:
  - English home features item5/item6 are placeholders ("gsd"/"gseg.", "Opmg"/"jiytr.")
    (src/i18n/pages/home.json (field: features.item5.title)); the zh-cn bundle omits
    them and falls back to those placeholders.
  - Stats disagree between locales: zh-cn claims 5,000,000+ matches while en claims
    500k+ (src/i18n/pages/home.json (field: banner.stat2.value)).
  - src/pages/hrpauth.astro (field: < Banner pageUi={hrpauth}) contains the malformed
    tag `< Banner pageUi={hrpauth} />`.
  - The hero image is a hotlinked AI-generation URL whose prompt describes
    "Minecraft authentication and skin management", which does not match the
    MatchCore Arena positioning of the home page
    (src/components/Banner.astro (field: text_to_image)).
  - The shared Banner renders siteConfig.projectName ("MatchCore") as the H1 on every
    page, including /hrpauth (src/components/Banner.astro (field: siteConfig.projectName),
    src/site.ts (field: projectName)).

## Evidence
- src/site.ts:1-16
- src/components/HomePage.astro::features;
  src/components/Banner.astro (field: siteConfig.projectName),
  src/components/Banner.astro (field: ctaPrimary),
  src/components/Banner.astro (field: text_to_image);
  src/components/Header.astro::navItems, src/components/Header.astro (field: nav.demo)
- src/pages/hrpauth.astro (field: import { siteConfig }),
  src/pages/hrpauth.astro::features,
  src/pages/hrpauth.astro (field: < Banner pageUi={hrpauth});
  src/i18n/pages/home.json (field: banner.ctaPrimary),
  src/i18n/pages/home.json (field: banner.stat2.value),
  src/i18n/pages/home.json (field: features.item5.title);
  src/i18n/pages/hrpauth.json (field: meta.title)
- src/i18n/common.json (field: footer.rights) (footer "© 2026 MatchCore")
