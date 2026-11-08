# Knowledge Base

This knowledge base is the project's memo to itself, hosted and maintained in this
repository. It records internal design decisions so that future work understands why
things are the way they are; entries describe the project's current state only, not
its history. It does not define and does not override outward behavior. Outward behavior is defined by HA-Contract
(https://github.com/SamuelCheston/HA-Contract). If an entry here ever conflicts with
HA-Contract, fix the entry, not the contract.

## Entries

| ID | Title | Status | Summary |
|----|-------|--------|---------|
| [0001](0001-astro-static-site-with-tailwind.md) | Astro Static Site with Tailwind CSS | accepted | The portal is a fully static Astro 7 site styled with Tailwind CSS v4, with no server runtime or adapter. |
| [0002](0002-bilingual-content-via-duplicated-zh-cn-routes.md) | Bilingual Content via Duplicated /zh-cn Routes with English Default | accepted | English pages live at the root; each zh-cn page is a physical duplicate under /zh-cn/, with a client-side browser-language redirect. |
| [0003](0003-two-landing-pages-linking-outward.md) | Scope Is Two Landing Pages Linking Outward for Docs, Account Portal, and Code | accepted | The site publishes exactly two product landing pages (MatchCore Arena and HRPAuth) written from a user's point of view, and delegates docs, account access, source, and community to external endpoints. |
| [0004](0004-division-of-labor-with-samuelportal.md) | Division of Labor with SamuelPortal: Product Portal vs Personal Portfolio | accepted | MatchCore-Portal is the product-facing bilingual portal; SamuelPortal is the author's English-only personal portfolio; the two sites do not link to each other. |
| [0005](0005-personal-account-hosting-no-deploy-pipeline.md) | Repository Under the CoreMatch Organization; Build CI Only, No In-Repo Deployment Pipeline | accepted | The repository now lives under the CoreMatch organization with a build-only CI workflow; no deployment configuration exists in the tree and no live URL for the portal was found. |

## Maintenance

- New entries are numbered sequentially as `NNNN-<slug>.md` starting from 0001 and use
  the fixed structure: Status / Context / Decision / Consequences / Evidence.
- Every claim must be checked against the repository's files and cited in Evidence
  as `path/to/file:Lstart-Lend`. Anything that cannot be verified is marked
  "not verified". Never fabricate.
- Consequences must include costs and limitations, not only benefits.
