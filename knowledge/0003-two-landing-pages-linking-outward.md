# 0003. Scope Is Two Landing Pages Linking Outward for Docs, Account Portal, and Code

## Status
accepted

## Context
The repository is a portal: it does not host the products themselves, so it had to
settle what content it publishes and where visitors go for docs, account access,
source, and community.

## Decision
The site publishes exactly two pages, each with a zh-cn mirror:

- `/` — the MatchCore Arena product landing, written from a player's point of view:
  what you can play (Bedwars matchmaking 1v1/2v2, weighted Elo ratings, season
  rankings, match history), a four-step "How It Works" path (register at the
  account portal, set up the client, queue, play), and resource cards
  (src/components/HomePage.astro::features,
  src/i18n/pages/home.json (field: features.item1.title)). Every claim is backed
  by the MatchCoreArena code: only Bedwars is wired up end to end
  (MatchCoreArena-Server `match_type` is a free-form string with bedwars as the
  only integrated mode via BedwarsRel-MCA), the rating engine is a server-side
  weighted Elo (MatchCoreArena-Server knowledge/0001), and the client provides
  queue/career/rankings/friends (MatchCoreArena-Client README). No anti-cheat
  claims and no usage statistics are published, because neither exists in code.
- `/hrpauth` — the HRPAuth service landing: one account for the ecosystem,
  registration/login, TOTP and WebAuthn two-factor, account management, OAuth2
  for connected services, AGPL-3.0 open source
  (src/pages/hrpauth.astro::features, src/i18n/pages/hrpauth.json). The
  positioning follows the HRPAuth README: general-purpose authentication core
  and OAuth2 authorization center; Yggdrasil and skin features live in dedicated
  sibling services, which the page states as current scope.

All off-site destinations are centralized in src/site.ts and open in new tabs.
MatchCore Arena page: docs -> https://wiki.mcnb.dev/, account portal ->
https://auth.mcnb.dev/, source and community -> CoreMatch/MatchCoreArena-Client
and its issue tracker. HRPAuth page: docs ->
https://wiki.mcnb.dev/projects/hrpauth/, account portal ->
https://auth.mcnb.dev/, source and community -> CoreMatch/HRPAuth and its issue
tracker (src/site.ts::siteConfig, src/site.ts::siteConfigHrpauth). The mcnb.dev
domains are the code-authoritative values: SamuelWiki declares
`hostname: 'https://wiki.mcnb.dev'` (SamuelWiki docs/.vitepress/config.mts) [xref], and
HRPAuth defaults `frontend.url` to `https://auth.mcnb.dev/` with WebAuthn
`rp_id` `auth.mcnb.dev` (HRPAuth controllers/startup_controller.go::buildDefaultConfig) [xref].
The homepage primary CTA is labeled "Create Your Account"/"注册账号" and points at
the account portal; the secondary CTA is the docs
(src/i18n/pages/home.json (field: banner.ctaPrimary);
src/components/Banner.astro (field: primaryHref)). There is no rules page, no
download page, and no links page.

## Consequences
- The portal is a signpost: it owns no documentation, account system, or issue
  tracker, so all deeper content depends on the availability of wiki.mcnb.dev,
  auth.mcnb.dev, and GitHub.
- The Banner takes the project name and both CTA targets as props, so each page
  renders its own product name and links (src/components/Banner.astro (field:
  projectName)); the previous shared-"MatchCore"-everywhere behavior and the
  hotlinked AI hero image are gone.
- MatchCoreArena-Client has no published releases, so the "How It Works" step 2
  states that prebuilt downloads are not available yet and points to building
  from source; if releases are published later, that copy must be updated.
- The zh-cn and en bundles carry the same four features and four steps; any
  future feature must be added to both bundles and to the arrays in
  src/components/HomePage.astro::features.

## Evidence
- src/site.ts:1-17 fp=a9bfb5fc
- src/components/HomePage.astro:15-27 fp=dac094d3;
  src/components/Banner.astro:6-17 fp=217079b5, src/components/Banner.astro:28-50 fp=a0b6d06c
- src/pages/hrpauth.astro:6 fp=45ba16ed, src/pages/hrpauth.astro:27-29 fp=ed60bb0e,
  src/pages/hrpauth.astro:48-53 fp=e4e5b29b;
  src/i18n/pages/home.json (field: banner.ctaPrimary),
  src/i18n/pages/home.json (field: features.item1.title),
  src/i18n/pages/home.json (field: highlights.item2.desc);
  src/i18n/pages/hrpauth.json (field: meta.title),
  src/i18n/pages/hrpauth.json (field: features.item3.title),
  src/i18n/pages/hrpauth.json (field: about.p2);
  src/i18n/common.json (field: nav.demo),
  src/i18n/common.json (field: footer.rights) (footer "© 2026 MatchCore")
- Cross-checked read-only references [xref]: MatchCoreArena-Server
  knowledge/0001-server-side-weighted-elo-rating.md (weighted Elo),
  MatchCoreArena-Server internal/service/match.go::TeamReportInput [xref] (free-form
  match_type), MatchCoreArena-Client README.md (queue/career/rankings/friends,
  no releases on GitHub), HRPAuth README.md (authentication core and OAuth2
  authorization center; Yggdrasil/skins split into sibling services),
  HRPAuth LICENSE (AGPL-3.0),
  HRPAuth controllers/startup_controller.go::buildDefaultConfig [xref]
  (frontend.url https://auth.mcnb.dev/, rp_id auth.mcnb.dev),
  SamuelWiki docs/.vitepress/config.mts (hostname https://wiki.mcnb.dev);
  wiki.mcnb.dev and auth.mcnb.dev answered HTTP 200 on 2026-11-08
