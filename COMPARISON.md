# Old vs New Build Comparison Sheet

This is the living comparison document between:

- **Old build:** `Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html` (Wix snapshot)
- **New build:** `build/index.html` (SvelteKit static output)

## Maintenance rule (required)

Update this file whenever either of the following happens:

1. A project change affects markup, metadata, assets, structure, or behavior.
2. A new comparison/ingestion pass is done.

Minimum required updates per pass:

- Update **Current Comparison Matrix**
- Add a row to **Change Log**
- Add a row to **Comparison Runs**

## Current Comparison Matrix

| Area | Old build | New build | Status | Notes |
|---|---|---|---|---|
| `<title>` | Present | Present | ✅ Parity | Same source-derived title |
| Meta description | Present | Present | ✅ Parity | Same source-derived description |
| Canonical | Present | Present | ✅ Parity | Canonical preserved |
| Open Graph core (`og:title`, `og:description`, `og:image`) | Present | Present | ✅ Parity | Extracted to `src/lib/content/seo.ts` |
| Open Graph extended (`og:url`, `og:site_name`, `og:type`, image dimensions) | Present | Present | ✅ Parity | Ported from source metadata |
| Twitter cards (`twitter:*`) | Present | Present | ✅ Parity | Ported from source metadata |
| Structured data (`application/ld+json`) | Present | Present | ✅ Parity | `LocalBusiness` + `WebSite` schema rendered in head |
| Browser-extension injected artifacts | Previously present in captured source | Removed from active source/build outputs | ✅ Clean | DarkReader/ProtonPass/chrome-extension artifacts removed from codebase content |
| HTML lang | `en` | `en` | ✅ Parity | Set in `src/app.html` |
| Primary heading (`h1`) | Present | Present | ✅ Parity | Preserved in content |
| Crawl policy (`robots.txt`) | Present | Present | ✅ Parity | Allow-all policy currently in `static/robots.txt` |
| Runtime cleanliness | Heavy Wix runtime | Runtime removed | ✅ Improved | Wix scripts removed in migration |
| CSS delivery strategy | In-page style-heavy runtime output | Static stylesheet delivery (`/wix.css`) | ✅ Improved | Better cacheability and smaller HTML payload |
| Content delivery strategy | Runtime-generated Wix DOM payload | Server-side file load + prerender output | ✅ Improved | Avoids shipping large raw HTML string in client bundle |
| Performance budget workflow | Not defined | Scripted + enforceable budgets | ✅ Added | `scripts/perf-budget.mjs` + npm scripts provide repeatable budget checks |
| Scroll-triggered lineup reveal | Wix runtime reveals lineup text on scroll | Svelte route now marks motion blocks as entered when intersecting viewport | ✅ Parity restored | Prevents hidden artist lineup caused by paused Wix motion states |
| Automated testing workflow | Not defined | Unit + smoke + browser e2e checks | ✅ Added | `vitest` + `playwright` scripts now scaffolded |
| CI quality gates | Not defined | GitHub Actions workflow for validation + e2e | ✅ Added | `.github/workflows/ci.yml` enforces onboarding-safe checks |
| Styleguide workflow | Wix editor-centric | Source-controlled `/styleguide` + token file | ✅ Added | Supports developer/UX collaboration in codebase |
| No-code Codex workflow docs | Not defined | Task recipes + safety rails + role playbooks | ✅ Added | `docs/CODEX_WORKFLOWS.md` and `docs/ROLE_PLAYBOOKS.md` |
| Reproducible carbon-copy governance docs | Not defined | Project map + ADR-lite + release checklist + Codex templates + RUM plan | ✅ Added | Creates reusable workflow trail for future carbon-copy projects |

## Maturity Snapshot

| Dimension | Old build | New build | Notes |
|---|---:|---:|---|
| SEO maturity | 7/10 | 8/10 | New build now has metadata parity with cleaner runtime |
| SEO sophistication | 8/10 | 8/10 | Extended OG, Twitter cards, and JSON-LD now ported |
| SEO readiness | 8/10 | 8/10 | Ready for static deployment with current parity set |

## Latency & Load-Time Snapshot (old vs new)

These are practical load-time indicators from the current artifacts, using a fair old baseline (extension artifacts removed, site runtime kept):

- **Old baseline:** `Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html` cleaned of extension-injected content only
- **New:** `build/index.html`

| Indicator | Old build | New build | Delta |
|---|---:|---:|---:|
| HTML size | 652,193 B | 464,451 B | **-28.8%** |
| JS files referenced on page | 17 | 8 | **-52.9%** |
| Total referenced JS bytes | 1,591,552 B | 101,526 B | **-93.6%** |
| Largest static image bytes | 518,561 B | 518,561 B | **0.0%** |

### What this means in plain language

- The new site has significantly less JavaScript to download and execute.
- Fewer files and less payload usually means faster first load, especially on mobile networks.
- Approximate JS transfer savings from old to new:
  - At 10 Mbps: ~**1.21s** faster JS transfer
  - At 25 Mbps: ~**0.48s** faster JS transfer

> Note: these are artifact-based indicators (request/payload comparison), not real-user monitoring metrics.

## Performance Budget Guardrails

Budgets are intentionally tied to the current fair baseline and current optimized build outputs:

| Metric | Old baseline (fair) | Current new build | Budget ceiling (new build) | Status |
|---|---:|---:|---:|---|
| Built HTML bytes | 652,193 B | 464,451 B | 560,000 B | ✅ Passing |
| Referenced JS file count | 17 | 8 | 8 | ✅ Passing |
| Referenced JS total bytes | 1,591,552 B | 101,526 B | 620,000 B | ✅ Passing |
| Largest static image bytes | 518,561 B | 518,561 B | 520,000 B | ✅ Passing |

Repeatable commands:

```sh
npm run build
npm run perf:budget
npm run perf:budget:enforce
```

- `perf:budget` reports metrics and flags regressions.
- `perf:budget:enforce` exits non-zero if any budget is exceeded (for CI or release gates).
- Minor byte drift between builds is expected because hashed chunk filenames are embedded in `build/index.html`.

## Wix vs Svelte Platform Comparison

| Dimension | Wix.com (Old) | Bare Svelte source (New) | Practical implication |
|---|---|---|---|
| Delivery model | Managed platform/runtime | Versioned source + static build | Svelte gives full ownership and deterministic outputs |
| Change velocity | Fast for non-dev content edits | Fast for dev-led iterative work | Svelte favors engineering workflows |
| Operational control | Limited platform-level control | Full control over head/meta/assets/build/deploy | Easier to enforce SEO/performance standards in Svelte |
| Vendor lock-in | High | Low | Svelte improves portability and long-term optionality |

### DX (Developer Experience)

| Area | Wix.com | Svelte | Winner |
|---|---|---|---|
| Local development/debugging | Limited | Full local dev, typed tooling, build pipeline | Svelte |
| Code review/version control | Minimal source-level diffing | First-class git diff/review | Svelte |
| Automation/scripts | Limited | Scriptable ingestion/migration/checks | Svelte |
| Refactoring confidence | Lower | Higher with typed checks/build gate | Svelte |

### UX (End-user experience)

| Area | Wix.com | Svelte | Current state |
|---|---|---|---|
| Visual parity | Baseline | Matched via migrated markup/CSS | At parity |
| SEO-visible metadata | Rich | Now matched | At parity |
| Runtime overhead | Higher (Wix runtime) | Lower (static output) | Improved on Svelte |
| Content editability by non-devs | Higher | Lower unless CMS is added | Wix advantage |

### Maintainability

| Area | Wix.com | Svelte | Current stance |
|---|---|---|---|
| Long-term code maintenance | Opaque platform internals | Transparent source control | Svelte advantage |
| Regression tracking | Harder at source level | Easier via `COMPARISON.md` + git history | Svelte advantage |
| Technical debt control | Platform-constrained | Team-controlled | Svelte advantage |

### Flexibility

| Area | Wix.com | Svelte | Current stance |
|---|---|---|---|
| Custom architecture | Constrained | Fully customizable | Svelte advantage |
| Integration options | Platform-dependent | Open ecosystem | Svelte advantage |
| Future migration paths | Platform-tied | Portable static/source assets | Svelte advantage |

## Why this is good for you (plain language)

This offer gives you the **full source code** of your website, not just access to a platform editor.

### What that means for a non-technical owner

- You can ask an AI agent to make updates in plain English (text, sections, images, SEO, layout tweaks).
- You are not forced to hire a developer for every small website change.
- You still can hire developers for bigger work, but day-to-day changes become faster and lower cost.

### Why this is better than being platform-locked

- You own the website code and can move it to different hosting/providers.
- Changes are tracked, so it is clear what was changed and when.
- This comparison sheet gives a simple way to confirm quality and parity after each update.

### Net effect

You get **more control**, **faster updates**, and **lower ongoing dependency** on costly manual developer time, while still keeping professional engineering quality.

## Change Log

| Date | Change | Files | Expected SEO impact | Matrix updated |
|---|---|---|---|---|
| 2026-05-15 | Initial Svelte migration + sanitization pipeline | `scripts/migrate-snapshot.mjs`, `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/lib/content/*` | Preserved core SEO; dropped extended OG/Twitter/JSON-LD | ✅ |
| 2026-05-15 | SEO parity completion pass | `scripts/migrate-snapshot.mjs`, `src/routes/+layout.svelte`, `src/lib/content/seo.ts` | Restored extended OG, Twitter cards, and JSON-LD parity | ✅ |
| 2026-05-15 | Added latency/load-time baseline section | `COMPARISON.md` | No direct SEO change; improves performance tracking clarity | ✅ |
| 2026-05-15 | Extension artifact cleanup audit/removal | `Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html`, `Sound Healing Evening Stockholm Sweden, 15 Februar 2026_files/*`, `scripts/migrate-snapshot.mjs` | Eliminates non-site browser-extension contamination from source artifacts | ✅ |
| 2026-05-15 | Recomputed fair payload/latency baseline | `COMPARISON.md` | Replaced earlier baseline with extension-clean old snapshot metrics | ✅ |
| 2026-05-15 | Added repeatable performance budget script + thresholds | `scripts/perf-budget.mjs`, `package.json`, `README.md`, `COMPARISON.md` | No direct SEO change; adds payload regression guardrail workflow | ✅ |
| 2026-05-15 | Fleet optimization wave (content + CSS + image delivery) | `src/routes/+page.server.ts`, `src/routes/+page.svelte`, `src/routes/+layout.svelte`, `scripts/migrate-snapshot.mjs`, `static/wix.css`, `src/lib/content/home.html` | Significant payload/latency improvement with strict visual parity | ✅ |
| 2026-05-15 | Onboarding + test + styleguide scaffolding foundation | `README.md`, `CONTRIBUTING.md`, `docs/*`, `.github/workflows/ci.yml`, `package.json`, `src/routes/styleguide/+page.svelte`, `static/design-tokens.css`, `tests/e2e/home.spec.ts`, `scripts/scripts-smoke.test.ts` | Improves delivery reliability and change safety; minor JS payload increase from new styleguide route | ✅ |
| 2026-05-15 | Scroll motion reveal parity fix for hidden lineup block | `src/routes/+page.svelte`, `tests/e2e/home.spec.ts`, `COMPARISON.md` | No metadata impact; restores visibility parity for lineup/animated content | ✅ |
| 2026-05-15 | Workflow governance + reusable Codex execution framework | `docs/project-map/*`, `docs/adr-lite/*`, `docs/RELEASE_CHECKLIST.md`, `docs/CODEX_SKILL_BLUEPRINTS.md`, `docs/CODEX_AGENT_TEMPLATES.md`, `docs/RUM_CWV_TRACKING_PLAN.md`, `README.md`, `CONTRIBUTING.md`, `docs/CODEX_WORKFLOWS.md`, `docs/ROLE_PLAYBOOKS.md` | No direct SEO change; strengthens reproducible delivery and auditability | ✅ |

## Comparison Runs

| Date | Compared artifacts | Method | Result summary | Follow-up |
|---|---|---|---|---|
| 2026-05-15 | Old snapshot HTML vs new `build/index.html` | Tag-level manual diff | Core tags parity; extended metadata and schema gaps | Add SEO parity pass for missing tags/schema |
| 2026-05-15 | Old snapshot HTML vs regenerated `build/index.html` | Tag-level manual diff | Core + extended OG + Twitter + JSON-LD all present | Keep tracking drift via this document |
| 2026-05-15 | Old snapshot vs new build load profile | Artifact-level payload/request comparison | HTML -18.3%, referenced JS files -52.9%, referenced JS bytes -61.3% | Add real-user/Core Web Vitals tracking when deployed |
| 2026-05-15 | Extension contamination audit | Repository-wide string audit + rebuild | No extension markers remain in `src/`, `static/`, or `build/` outputs | Keep extension audit in future ingestion passes |
| 2026-05-15 | Fair old-vs-new payload recomparison | Artifact-level comparison with extension-clean old baseline | HTML -16.6%, referenced JS files -52.9%, referenced JS bytes -61.4% | Use this as the canonical baseline going forward |
| 2026-05-15 | Performance budget script run (`perf:budget`) | Artifact-level script (`scripts/perf-budget.mjs`) against latest `build/` output | HTML 464,394 B, JS refs 8, JS bytes 80,465 B, largest image 518,561 B; all thresholds passing | Keep budgets updated after each optimization pass |
| 2026-05-15 | Onboarding scaffolding validation run | Lint + typecheck + unit + build + smoke + e2e + enforced budgets | HTML 464,451 B, JS refs 8, JS bytes 101,526 B, largest image 518,561 B; all thresholds still passing | Track future payload drift as onboarding surface grows |
| 2026-05-15 | Live vs local scroll-state lineup diagnostics | Playwright DOM/computed-style comparison across scroll fractions | Local lineup block stayed `opacity:0` while live transitioned to visible after scroll; fixed by viewport-driven `data-motion-enter=\"done\"` marking | Keep e2e guard for lineup visibility to prevent regressions |
| 2026-05-15 | Workflow governance completeness sweep | Documentation parity audit against repo docs and workflow artifacts | Confirmed reproducible workflow docs in place; README + comparison ledger refreshed for future carbon-copy reuse | Keep docs synchronized whenever workflow assets change |
