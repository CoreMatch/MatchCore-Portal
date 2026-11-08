# 0005. Published at the mcnb.dev Apex from the Production aaPanel Site Directory

## Status
accepted

## Context
The repository moved from the author's personal GitHub account to the CoreMatch
organization and gained a build CI. The author designated the ecosystem's main
domain, the mcnb.dev apex ("mcnb" = MatchCore), as the portal's address, served
from the production server's site directory for that domain.

## Decision
Observed state:

- The repository is hosted at github.com/CoreMatch/MatchCore-Portal (the former
  SamuelCheston/MatchCore-Portal URL redirects there). The tracked tree
  contains a build-only CI (.github/workflows/ci.yml (field: npm run build));
  there is no in-repo deployment pipeline. astro.config.mjs carries
  `site: 'https://mcnb.dev'` solely so OG meta tags can emit absolute URLs
  (astro.config.mjs (field: site)).
- The portal is published at https://mcnb.dev/ from the production server
  (aaPanel-managed nginx). The vhost for `server_name mcnb.dev` is purely
  static with root /www/wwwroot/mcnb.dev — no proxy_pass, no rewrite rules
  [xref] (/www/server/panel/vhost/nginx/mcnb.dev.conf). No other vhost claims
  the apex.
- The site directory holds the built portal (index.html, hrpauth/, zh-cn/,
  _astro/, favicons), owned www:www with 644/755 permissions, plus the panel's
  error pages 404.html/502.html (referenced by the vhost `error_page`
  directives) and the panel's .user.ini [xref] (/www/wwwroot/mcnb.dev). The
  pre-existing sample site was backed up in full before replacement [xref]
  (/www/wwwroot/mcnb.dev.bak-20261108).
- Deployment is an operator action, not a repo mechanism: build locally
  (`npm ci && npm run build`) and sync `dist/` into the site root, preserving
  the panel's error pages and ownership pattern.

## Consequences
- Publishing a change requires the manual build-and-sync sequence against the
  production server; nothing in the tree automates it, and CI only proves the
  build.
- The apex serves only this site (verified 2026-11-08: no MX/TXT records, no
  ecosystem code referencing the apex URL, and the directory previously held
  only the panel sample page), so the portal displaces no other service.
- The panel error pages 404.html/502.html are not portal content; they must be
  kept in place during future syncs because the vhost references them.
- The repository homepage field on GitHub is empty; it can now be set to
  https://mcnb.dev/ (author decision outstanding).

## Evidence
- .github/workflows/ci.yml (build job only); astro.config.mjs::defineConfig
  (`site` set to https://mcnb.dev for OG URLs; no adapter); `git ls-files`
  contains no deploy workflow or CNAME
  file
- Probes on 2026-11-08: https://mcnb.dev/ -> 200, title "MatchCore Arena |
  Bedwars matchmaking and rankings for Minecraft"; /zh-cn/ -> 200 zh title;
  /hrpauth/ -> 200 "HRPAuth | One account for the MatchCore ecosystem";
  /zh-cn/hrpauth/ -> 200; unknown path -> 404; outbound hrefs are
  wiki.mcnb.dev, auth.mcnb.dev, and CoreMatch GitHub URLs
- Production (read via operator access) [xref]:
  /www/server/panel/vhost/nginx/mcnb.dev.conf (static vhost, root
  /www/wwwroot/mcnb.dev); /www/wwwroot/mcnb.dev listing (portal artifacts,
  www:www); /www/wwwroot/mcnb.dev.bak-20261108 (full backup of the replaced
  sample site); `grep server_name` over all panel vhosts shows mcnb.dev
  claimed exactly once
- `dig mcnb.dev MX`/`TXT` -> empty (2026-11-08); workspace-wide grep for
  `https://mcnb.dev/` in /home/lnb/Desktop/HA -> no matches
