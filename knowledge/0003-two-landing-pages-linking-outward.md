# 0003. Scope Is Two Landing Pages Linking Outward for Docs, Account Portal, and Code

## Status
accepted

## Context
The repository is a portal: it does not host the products themselves, so it had to
settle what content it publishes and where visitors go for docs, account access,
source, and community.

## Decision
The site publishes exactly two pages, each with a zh-cn mirror:

- `/` — the MatchCore Arena product landing, rebuilt to the information
  hierarchy of competitive matchmaking platforms: every section answers one
  player question. Sticky top bar with real anchors plus login/register
  buttons to the account portal; full-width hero with one heading, one
  subtitle, one CTA, and a service-status chip driven by a real probe of the
  arena health endpoint (see below); horizontal mode cards for Bedwars 1v1/2v2
  answering how you team up, how a match ends, and what you win
  (src/components/HomePage.astro::modes); a ranking section answering why
  climb, how scores move (plain language, no formula), and where to see them
  (src/components/HomePage.astro::rankingPoints); a three-step start —
  register, install the client (honestly: no prebuilt downloads, build from
  the repository docs, linked), queue up and play
  (src/components/HomePage.astro::steps); account and security
  (registration, login, TOTP/WebAuthn two-factor); ecosystem entries — wiki,
  source, and service status. The service-status chip reads /status.json,
  written at deploy time from an actual probe of
  https://arena.mcnb.dev/api/status, and displays the check time; the browser
  cannot call the endpoint directly because it sends no CORS headers, and no
  live player/match counts are shown anywhere because no such data source
  exists. Every claim is backed by the MatchCoreArena code: only Bedwars is
  wired up end to end (MatchCoreArena-Server `match_type` is a free-form
  string with bedwars as the only integrated mode via BedwarsRel-MCA), the
  rating engine is a server-side weighted Elo (MatchCoreArena-Server
  knowledge/0001), and the client provides queue/career/rankings/friends
  (MatchCoreArena-Client README). No anti-cheat claims and no usage
  statistics are published, because neither exists in code.
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
(the arena service's public health endpoint), and the rating-model deep link
https://wiki.mcnb.dev/dev/matchcorearena-server#评分模型-加权-elo (probed 200).
HRPAuth page: docs ->
https://wiki.mcnb.dev/HRPAuth/, account portal ->
https://auth.mcnb.dev/, source and community -> CoreMatch/HRPAuth and its issue
tracker (src/site.ts::siteConfig, src/site.ts::siteConfigHrpauth). The HRPAuth
docs link follows the wiki's current /<project>/ layout; the former
/projects/hrpauth/ path answers 404 after the wiki migration.
The mcnb.dev domains are the code-authoritative values: SamuelWiki declares
`hostname: 'https://wiki.mcnb.dev'` (SamuelWiki docs/.vitepress/config.mts) [xref], and
HRPAuth defaults `frontend.url` to `https://auth.mcnb.dev/` with WebAuthn
`rp_id` `auth.mcnb.dev` (HRPAuth controllers/startup_controller.go::buildDefaultConfig) [xref].
The homepage hero carries exactly one CTA, labeled "Create your account, start
matching"/"创建账号，开始匹配", pointing at the account portal
(src/i18n/pages/home.json (field: hero.cta)); the top bar repeats it as
login/register buttons (src/i18n/common.json (field: nav.login)). There is no
rules page,
no download page, and no links page. Every footer publishes the team contact
email as a mailto link (src/site.ts (field: contactEmail),
src/i18n/common.json (field: footer.contact)).
Both pages use the arena design tokens defined in src/styles/global.css
(near-black base #0a0c10, single accent #e94560, hard 1px borders, no
shadows/glass/gradients), mirroring the ecosystem's shared design system
(CoreMatch/ha-ui) [xref].
The home page carries five author-provided voxel-style illustrations with
their generator watermarks cropped off, served locally (never hotlinked) as
WebP from public/images/ in 1x/2x variants plus a portrait hero crop for
small screens; the hero loads eagerly with explicit width/height, everything
below the fold loads lazily, and the shared OG image is emitted as an
absolute URL through the `site` config
(src/components/HomePage.astro (field: hero-portrait.webp),
src/layouts/Layout.astro (field: og:image)).

## Consequences
- The portal is a signpost: it owns no documentation, account system, or issue
  tracker, so all deeper content depends on the availability of wiki.mcnb.dev,
  auth.mcnb.dev, and GitHub.
- The Banner takes the project name and both CTA targets as props, so each
  page renders its own product name and links (src/components/Banner.astro
  (field: projectName)). The home page renders its own sticky top bar (with
  login/register buttons) and its own hero carrying the service-status chip;
  the hrpauth page keeps the shared Header/Banner components.
- MatchCoreArena-Client has no published releases, so the "Three Steps In"
  client step states that prebuilt downloads are not available yet and points
  to the repository and its USAGE.md; if releases are published later, that
  copy must be updated.
- The homepage publishes no usage statistics (players/matches/regions) at all;
  the only dynamic element is the deploy-time service probe. Adding any number
  to the front page requires a real data source behind it.
- Technical detail stays out of the portal: the weighted-Elo settlement formula
  is not rendered on the homepage (plain language only). The ranking section
  links out to the wiki's rating-model section
  (https://wiki.mcnb.dev/dev/matchcorearena-server#评分模型-加权-elo, probed 200
  with the anchor id present on 2026-11-08) for anyone who wants the formula.
- The zh-cn and en bundles carry identical key sets (checked programmatically);
  any future content must be added to both bundles and to the arrays in
  src/components/HomePage.astro (modes, rankingPoints, steps, accountItems).

## Evidence
- src/site.ts:1-20 fp=fee346a9
- src/components/HomePage.astro::modes, src/components/HomePage.astro::rankingPoints,
  src/components/HomePage.astro::steps, src/components/HomePage.astro::accountItems,
  src/components/HomePage.astro (field: data-arena-status),
  src/components/HomePage.astro (field: status.json),
  src/components/HomePage.astro (field: ratingDocsUrl);
  src/components/Banner.astro (field: projectName),
  src/components/Banner.astro (field: primaryHref);
  src/styles/global.css (field: --color-arena-accent),
  src/styles/global.css (field: data-arena-status);
  public/images (hero-wide-1x/2x, hero-portrait, mode-1v1-1x/2x,
  mode-2v2-1x/2x, rank-bg-1x/2x, og — WebP, watermarks cropped)
- src/pages/hrpauth.astro:6 fp=83604345, src/pages/hrpauth.astro:27-29 fp=ed60bb0e,
  src/pages/hrpauth.astro:48-53 fp=e4e5b29b;
  src/i18n/pages/home.json (field: hero.cta),
  src/i18n/pages/home.json (field: start.s2.desc),
  src/i18n/pages/home.json (field: modes.m1.team),
  src/i18n/pages/home.json (field: ranking.how.desc),
  src/i18n/pages/home.json (field: rating.wiki),
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
