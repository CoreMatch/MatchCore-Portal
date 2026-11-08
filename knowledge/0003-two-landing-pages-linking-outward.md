# 0003. Scope Is Two Landing Pages Linking Outward for Docs, Account Portal, and Code

## Status
accepted

## Context
The repository is a portal: it does not host the products themselves, so it had to
settle what content it publishes and where visitors go for docs, account access,
source, and community.

## Decision
The site publishes exactly two pages, each with a zh-cn mirror:

- `/` — the MatchCore Arena product landing, structured as a competitive-platform
  front page rather than a feature list: a hero with the positioning title, a
  one-line value subtitle, the primary CTA to the account portal and a secondary
  CTA anchoring to the how-to section, and a three-item fact bar (match modes,
  ranking engine, account system — capability facts, never usage statistics)
  (src/components/HomePage.astro::facts,
  src/i18n/pages/home.json (field: hero.ctaPrimary)). Below the hero, in order:
  a four-step "How It Works" (register at the account portal, set up the
  client, log in and queue, play and climb) with real entry points
  (src/components/HomePage.astro::steps); modes and rating — Bedwars 1v1/2v2
  cards plus a plain-language summary of the server-side settlement
  (src/components/HomePage.astro::modes); account and security (registration,
  login, TOTP/WebAuthn two-factor); ecosystem entry cards — wiki, source, and
  the arena service's public health endpoint, labeled as an API that opens as
  JSON (src/components/HomePage.astro::ecoLinks). Every claim is backed by the
  MatchCoreArena code: only Bedwars is wired up end to end
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
and its issue tracker, service status -> https://arena.mcnb.dev/api/status
(the arena service's public health endpoint). HRPAuth page: docs ->
https://wiki.mcnb.dev/HRPAuth/, account portal ->
https://auth.mcnb.dev/, source and community -> CoreMatch/HRPAuth and its issue
tracker (src/site.ts::siteConfig, src/site.ts::siteConfigHrpauth). The HRPAuth
docs link follows the wiki's current /<project>/ layout; the former
/projects/hrpauth/ path answers 404 after the wiki migration.
The mcnb.dev domains are the code-authoritative values: SamuelWiki declares
`hostname: 'https://wiki.mcnb.dev'` (SamuelWiki docs/.vitepress/config.mts) [xref], and
HRPAuth defaults `frontend.url` to `https://auth.mcnb.dev/` with WebAuthn
`rp_id` `auth.mcnb.dev` (HRPAuth controllers/startup_controller.go::buildDefaultConfig) [xref].
The homepage primary CTA is labeled "Create your account, start matching"/
"创建账号，开始匹配" and points at the account portal; the secondary CTA is an
in-page anchor to the how-to section
(src/i18n/pages/home.json (field: hero.ctaPrimary);
src/components/HomePage.astro (field: how-it-works)). There is no rules page,
no download page, and no links page. Every footer publishes the team contact
email as a mailto link (src/site.ts (field: contactEmail),
src/i18n/common.json (field: footer.contact)).
Both pages use the arena design tokens defined in src/styles/global.css
(near-black base #0a0c10, single accent #e94560, hard 1px borders, no
shadows/glass/gradients), mirroring the ecosystem's shared design system
(CoreMatch/ha-ui) [xref].

## Consequences
- The portal is a signpost: it owns no documentation, account system, or issue
  tracker, so all deeper content depends on the availability of wiki.mcnb.dev,
  auth.mcnb.dev, and GitHub.
- The Banner takes the project name and both CTA targets as props, so each page
  renders its own product name and links (src/components/Banner.astro (field:
  projectName)); the home page renders its own hero instead of the shared
  Banner because its secondary CTA is an in-page anchor.
- MatchCoreArena-Client has no published releases, so the "How It Works" step 2
  states that prebuilt downloads are not available yet and points to building
  from source; if releases are published later, that copy must be updated.
- The homepage publishes no usage statistics (players/matches/regions) at all;
  the hero fact bar carries capability facts instead. Adding any number to the
  front page requires a real data source behind it.
- Technical detail stays out of the portal: the weighted-Elo settlement formula
  is not rendered on the homepage (plain language only), and no link is written
  until the wiki has a rating page — on 2026-11-08 the wiki served no
  MatchCoreArena page (probed paths answered 404).
- The zh-cn and en bundles carry identical key sets (checked programmatically);
  any future content must be added to both bundles and to the arrays in
  src/components/HomePage.astro (facts, steps, modes, accountItems, ecoLinks).

## Evidence
- src/site.ts:1-19 fp=4df7c467
- src/components/HomePage.astro::facts, src/components/HomePage.astro::steps,
  src/components/HomePage.astro::modes, src/components/HomePage.astro::accountItems,
  src/components/HomePage.astro::ecoLinks,
  src/components/HomePage.astro (field: how-it-works);
  src/components/Banner.astro (field: projectName),
  src/components/Banner.astro (field: primaryHref);
  src/styles/global.css (field: --color-arena-accent)
- src/pages/hrpauth.astro:6 fp=83604345, src/pages/hrpauth.astro:27-29 fp=ed60bb0e,
  src/pages/hrpauth.astro:48-53 fp=e4e5b29b;
  src/i18n/pages/home.json (field: hero.ctaPrimary),
  src/i18n/pages/home.json (field: howto.step2.desc),
  src/i18n/pages/home.json (field: modes.elo.desc),
  src/i18n/pages/home.json (field: eco.status.title);
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
