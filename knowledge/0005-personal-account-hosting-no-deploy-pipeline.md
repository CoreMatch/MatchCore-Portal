# 0005. Hosted Under the SamuelCheston Personal Account with No In-Repo Deployment Pipeline

## Status
accepted

## Date
2026-08-21

## Context
Most repositories of the ecosystem this portal links to live under the CoreMatch
GitHub organization (e.g., CoreMatch/MatchCoreArena-Client and CoreMatch/HRPAuth —
src/site.ts (field: CoreMatch/MatchCoreArena-Client),
src/site.ts (field: CoreMatch/HRPAuth)). This repository is the exception: its
remote sits under the author's personal account. How the built site reaches
production is likewise not visible inside the repository.

## Decision
Observed state:

- The repository is hosted at github.com/SamuelCheston/MatchCore-Portal, not under the
  CoreMatch organization. No file in the repository (README.md (field: # MatchCore-Portal)
  is title-only; AGENTS.md covers development only) explains the choice.
- The tracked tree contains no deployment pipeline: no .github/workflows, no hosting
  adapter, no `site` property in astro.config.mjs, and nothing beyond dev-server
  tooling (.vscode/launch.json (field: astro dev) runs `astro dev`). Deployment target
  and mechanism: not verified.
- The only domain signals are the outbound links to wiki.samuelcheston.com and
  auth.samuelcheston.com (src/site.ts (field: samuelcheston.com)). Whether the portal
  itself is published on a samuelcheston.com subdomain or elsewhere is pending author
  confirmation.

## Consequences
- Discovery mismatch: SamuelPortal's project directory links this project as
  CoreMatch/MatchCore-Portal
  (/home/lnb/SamuelPortal/src/projects.ts (field: github.com/CoreMatch/MatchCore-Portal)),
  which does not match the actual remote; anyone following that link will not reach
  this repository unless it is later moved into the organization.
- If the repository is moved to CoreMatch, existing clones' remotes break and must be
  re-pointed; until then, personal-account hosting contrasts with the site's
  CoreMatch-branded content (footer "© 2026 MatchCore",
  src/i18n/common.json (field: footer.rights)).
- With no in-repo deployment configuration, building and releasing the site depends on
  tooling outside this repository; nothing in the tree lets a maintainer verify where
  or how the site is served.

## Evidence
- `git remote -v` of this repository: origin
  https://github.com/SamuelCheston/MatchCore-Portal.git (fetch and push)
- `git ls-files` scan: no .github/, no CI, no deploy-config files;
  .vscode/launch.json (field: astro dev) (astro dev only)
- astro.config.mjs::defineConfig (no `site`, no adapter); package.json (field: scripts)
  (scripts limited to dev/build/preview/astro)
- src/site.ts (field: samuelcheston.com) (outbound samuelcheston.com subdomains);
  src/site.ts (field: github.com/CoreMatch) (CoreMatch organization repositories)
- README.md (field: # MatchCore-Portal) (title-only, no hosting or deployment notes)
- /home/lnb/SamuelPortal/src/projects.ts (field: github.com/CoreMatch/MatchCore-Portal)
  (directory entry using the CoreMatch/MatchCore-Portal URL)
- Reason for personal-account hosting: not verified (no in-repo clue; pending author
  confirmation). Deployment target: not verified
