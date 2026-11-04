# 0004. Division of Labor with SamuelPortal: Product Portal vs Personal Portfolio

## Status
accepted

## Date
2026-11-02

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
  (SamuelPortal astro.config.mjs:9): English-only, with a homepage, a /projects
  directory, and an /about page (SamuelPortal src/pages/index.astro, projects.astro,
  about.astro; src/consts.ts:1-9). Its project directory describes MatchCore-Portal as
  "A bilingual portal for the wider MatchCore ecosystem." (SamuelPortal
  src/projects.ts:97).
- The two sites do not link to each other. MatchCore-Portal references only the
  wiki.* and auth.* subdomains plus GitHub (full URL scan of src/); SamuelPortal
  references MatchCore-Portal only by repository URL, never by a live site URL
  (SamuelPortal src/projects.ts:97).

## Consequences
- Overlap risk: both sites describe the MatchCore ecosystem from different angles, and
  without a documented split, content can drift or duplicate (project descriptions
  exist both in SamuelPortal src/projects.ts and in this site's i18n bundles).
- SamuelPortal's entry for MatchCore-Portal points to
  https://github.com/CoreMatch/MatchCore-Portal, while this repository's actual remote
  is https://github.com/SamuelCheston/MatchCore-Portal.git — a stale URL in the
  directory (see entry 0005).
- The two codebases are separate and have diverged technically (SamuelPortal is Astro
  ^6.0.4 with MDX and sitemap, no i18n — SamuelPortal package.json:14-19 — while this
  site is Astro ^7 with Tailwind and i18n), so nothing is shared between them.
- Because the division of labor is inferred from content rather than stated anywhere,
  the intended scope boundary is pending author confirmation.

## Evidence
- This repository: src/site.ts:1-16; URL scan of src/ shows only
  wiki.samuelcheston.com, auth.samuelcheston.com, github.com/CoreMatch/*, and one
  trae.ai image URL (src/components/Banner.astro:66)
- SamuelPortal (read-only reference): astro.config.mjs:9 (site
  'http://samuelcheston.com/'); package.json:14-19 (astro ^6.0.4, @astrojs/mdx,
  @astrojs/sitemap; no i18n config); src/consts.ts:1-9; src/pages/index.astro:16-41;
  src/pages/projects.astro:17-44; src/pages/about.astro:46-60; src/projects.ts:97
- SamuelPortal commit 2f7d11fd4366e9d1e80d6bdfab32a08e37068d77 — refactor: update
  personal portfolio site structure and content (added the MatchCore-Portal
  description)
- SamuelPortal commit 894faeec681255ab73a5a9db52aedb10c63151bd — Add GitHub repository
  links to project entries (added the CoreMatch/MatchCore-Portal URL)
- Intended division of labor between the two portals: not verified (no in-repo
  documentation; pending author confirmation)
