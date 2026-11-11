# 0004. Division of Labor with SamuelPortal: Product Portal vs Personal Portfolio

## Status
accepted

## Context
The author maintains a second portal repository, SamuelPortal
(github.com/SamuelCheston/SamuelPortal; consulted read-only for this entry). Both are
Astro sites in the same "portal" space, so their content scopes need to be distinct.
Neither repository contained a document stating the division of labor; on 2026-11-12
the author ratified the observed split as the formal decision: each site manages its
own content, and the two sites do not link to each other.

## Decision
The division of labor, observed below and ratified by the author (2026-11-12):

- MatchCore-Portal is product-facing: bilingual (en/zh-cn) landing pages for MatchCore
  Arena and HRPAuth that send visitors outward to wiki.mcnb.dev,
  auth.mcnb.dev, and CoreMatch repositories (src/site.ts:1-19 fp=9a602ac6).
- SamuelPortal is the author's personal portfolio at http://samuelcheston.com/
  (/home/lnb/SamuelPortal/astro.config.mjs (field: samuelcheston.com)): English-only,
  with a homepage, a /projects directory, and an /about page (SamuelPortal
  src/pages/index.astro, projects.astro, about.astro;
  /home/lnb/SamuelPortal/src/consts.ts::SITE_TITLE). Its project directory describes
  MatchCore-Portal as "A bilingual portal for the wider MatchCore ecosystem."
  (/home/lnb/SamuelPortal/src/projects.ts (field: A bilingual portal for the wider MatchCore ecosystem)).
- The two sites do not link to each other. MatchCore-Portal references only the
  wiki.* and auth.* subdomains plus GitHub (full URL scan of src/); SamuelPortal
  references MatchCore-Portal only by repository URL, never by a live site URL
  (/home/lnb/SamuelPortal/src/projects.ts (field: github.com/CoreMatch/MatchCore-Portal)).

Anti-drift rule: the product narrative is authoritative in this repository's i18n
bundles (src/i18n/); SamuelPortal's one-line description of MatchCore-Portal is a
citation only and does not evolve independently. If the two ever diverge, the
product site wins and SamuelPortal's copy is synced to it.

## Consequences
- Overlap exists but has a declared winner: both sites describe the MatchCore
  ecosystem from different angles (project descriptions exist both in SamuelPortal
  src/projects.ts and in this site's i18n bundles); on any divergence the product
  site's i18n copy wins and SamuelPortal's citation is synced to it.
- SamuelPortal's entry for MatchCore-Portal points to
  https://github.com/CoreMatch/MatchCore-Portal, which matches this repository's
  remote now that it lives under the CoreMatch organization (see entry 0005); the
  earlier mismatch no longer applies.
- The two codebases are separate and technically different (SamuelPortal is Astro
  ^6.0.4 with MDX and sitemap, no i18n —
  /home/lnb/SamuelPortal/package.json (field: @astrojs/mdx) — while this
  site is Astro ^7 with Tailwind and i18n); nothing is shared between them.
- The boundary is now stated (this entry, author-ratified); future scope questions
  are answered by this split, and changing the split requires a new entry.

## Evidence
- This repository: src/site.ts:1-19 fp=9a602ac6; URL scan of src/ shows only
  wiki.mcnb.dev, auth.mcnb.dev, arena.mcnb.dev, and github.com/CoreMatch/*
- SamuelPortal (read-only reference):
  /home/lnb/SamuelPortal/astro.config.mjs (field: samuelcheston.com) (site
  'http://samuelcheston.com/'); /home/lnb/SamuelPortal/package.json (field: @astrojs/mdx)
  (astro ^6.0.4, @astrojs/mdx, @astrojs/sitemap; no i18n config);
  /home/lnb/SamuelPortal/src/consts.ts::SITE_TITLE;
  /home/lnb/SamuelPortal/src/pages/index.astro (field: hero-hello);
  /home/lnb/SamuelPortal/src/pages/projects.astro (field: directory-intro);
  /home/lnb/SamuelPortal/src/pages/about.astro (field: about-story);
  /home/lnb/SamuelPortal/src/projects.ts (field: A bilingual portal for the wider MatchCore ecosystem)
- Author decision (2026-11-12): the observed split is ratified — each site manages
  its own content, the two sites do not link to each other, and the product
  narrative is authoritative in this repository's i18n bundles
