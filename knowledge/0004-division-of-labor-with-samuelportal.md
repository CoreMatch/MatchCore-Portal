# 0004. Division of Labor with SamuelPortal: Product Portal vs Personal Portfolio

## Status
accepted

## Context
The author maintains a second portal repository, SamuelPortal
(github.com/SamuelCheston/SamuelPortal; consulted read-only for this entry). Both are
Astro sites in the same "portal" space, so their content scopes need to be distinct.
Neither repository contains a document stating the division of labor; this entry
records what is verifiable and marks intent as pending author confirmation.

## Decision
Observed arrangement:

- MatchCore-Portal is product-facing: bilingual (en/zh-cn) landing pages for MatchCore
  Arena and HRPAuth that send visitors outward to wiki.samuelcheston.com,
  auth.samuelcheston.com, and CoreMatch repositories (src/site.ts:1-16).
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

## Consequences
- Overlap risk: both sites describe the MatchCore ecosystem from different angles, and
  without a documented split, content can drift or duplicate (project descriptions
  exist both in SamuelPortal src/projects.ts and in this site's i18n bundles).
- SamuelPortal's entry for MatchCore-Portal points to
  https://github.com/CoreMatch/MatchCore-Portal, while this repository's actual remote
  is https://github.com/SamuelCheston/MatchCore-Portal.git — a stale URL in the
  directory (see entry 0005).
- The two codebases are separate and technically different (SamuelPortal is Astro
  ^6.0.4 with MDX and sitemap, no i18n —
  /home/lnb/SamuelPortal/package.json (field: @astrojs/mdx) — while this
  site is Astro ^7 with Tailwind and i18n); nothing is shared between them.
- Because the division of labor is inferred from content rather than stated anywhere,
  the intended scope boundary is pending author confirmation.

## Evidence
- This repository: src/site.ts:1-16; URL scan of src/ shows only
  wiki.samuelcheston.com, auth.samuelcheston.com, github.com/CoreMatch/*, and one
  trae.ai image URL (src/components/Banner.astro (field: text_to_image))
- SamuelPortal (read-only reference):
  /home/lnb/SamuelPortal/astro.config.mjs (field: samuelcheston.com) (site
  'http://samuelcheston.com/'); /home/lnb/SamuelPortal/package.json (field: @astrojs/mdx)
  (astro ^6.0.4, @astrojs/mdx, @astrojs/sitemap; no i18n config);
  /home/lnb/SamuelPortal/src/consts.ts::SITE_TITLE;
  /home/lnb/SamuelPortal/src/pages/index.astro (field: hero-hello);
  /home/lnb/SamuelPortal/src/pages/projects.astro (field: directory-intro);
  /home/lnb/SamuelPortal/src/pages/about.astro (field: about-story);
  /home/lnb/SamuelPortal/src/projects.ts (field: A bilingual portal for the wider MatchCore ecosystem)
- Intended division of labor between the two portals: not verified (no in-repo
  documentation; pending author confirmation)
