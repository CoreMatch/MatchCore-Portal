# 0005. Repository Under the CoreMatch Organization; Build CI Only, No In-Repo Deployment Pipeline

## Status
accepted

## Context
The repository originally lived under the author's personal GitHub account while
the ecosystem repositories it links to sit under the CoreMatch organization. It
has since moved to CoreMatch, and a minimal build CI was added; how the built
site reaches production is still not visible inside the repository.

## Decision
Observed state:

- The repository is hosted at github.com/CoreMatch/MatchCore-Portal. The former
  SamuelCheston/MatchCore-Portal URL redirects there (both URLs resolve to the
  same HEAD via `git ls-remote`, and the GitHub API reports full_name
  CoreMatch/MatchCore-Portal for both). No file in the repository (README.md
  (field: # MatchCore-Portal) is title-only; AGENTS.md covers development only)
  documents the hosting choice.
- The tracked tree contains a CI workflow that only installs dependencies and
  builds (.github/workflows/ci.yml (field: npm run build)). There is no hosting
  adapter, no `site` property in astro.config.mjs, no Pages configuration
  (GitHub API `pages` endpoint returns 404 for the repository), and no deploy
  step. Deployment target and mechanism: not verified.
- The site publishes outbound links to wiki.mcnb.dev and auth.mcnb.dev plus
  CoreMatch GitHub repositories (src/site.ts (field: mcnb.dev)). No live URL
  serving this portal was found on 2026-11-08: GitHub Pages paths under
  samuelcheston.github.io return 404, and the mcnb.dev subdomains that answer
  (matchcore.*, portal.*) serve the HRPAuth web app, not this site. Whether or
  where the portal is published: pending author confirmation.

## Consequences
- With no in-repo deployment configuration and no observed live URL, building
  and releasing the site depends on tooling and decisions outside this
  repository; a maintainer cannot verify from the tree where or how the site is
  served. Publishing it (e.g. GitHub Pages or a mcnb.dev subdomain) is an
  author decision still outstanding.
- The repository homepage field on GitHub is empty; once a live URL exists it
  should be set there and reflected here.
- The local clone's origin should point at
  https://github.com/CoreMatch/MatchCore-Portal.git; the old personal-account
  URL keeps working only through GitHub's redirect.

## Evidence
- `git ls-remote` of both https://github.com/SamuelCheston/MatchCore-Portal.git
  and https://github.com/CoreMatch/MatchCore-Portal.git returned the same HEAD
  (6ec19a6) on 2026-11-08; GitHub API `repos/SamuelCheston/MatchCore-Portal`
  reports full_name CoreMatch/MatchCore-Portal (redirect)
- .github/workflows/ci.yml (build job only: checkout, setup-node, `npm ci`,
  `npm run build`)
- astro.config.mjs::defineConfig (no `site`, no adapter); package.json (field:
  scripts) (scripts limited to dev/build/preview/astro)
- GitHub API `repos/CoreMatch/MatchCore-Portal/pages` -> 404, `has_pages` false,
  `homepage` null (checked 2026-11-08)
- Probes on 2026-11-08: samuelcheston.github.io/MatchCore-Portal and
  /matchcore-portal -> 404; matchcore.mcnb.dev and portal.mcnb.dev -> 200 but
  serve the HRPAuth web app (title "HRPAuth")
- src/site.ts (field: mcnb.dev) (outbound destinations); README.md (field:
  # MatchCore-Portal) (title-only)
