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
| HTML lang | `en` | `en` | ✅ Parity | Set in `src/app.html` |
| Primary heading (`h1`) | Present | Present | ✅ Parity | Preserved in content |
| Crawl policy (`robots.txt`) | Present | Present | ✅ Parity | Allow-all policy currently in `static/robots.txt` |
| Runtime cleanliness | Heavy Wix runtime | Runtime removed | ✅ Improved | Wix scripts removed in migration |

## Maturity Snapshot

| Dimension | Old build | New build | Notes |
|---|---:|---:|---|
| SEO maturity | 7/10 | 8/10 | New build now has metadata parity with cleaner runtime |
| SEO sophistication | 8/10 | 8/10 | Extended OG, Twitter cards, and JSON-LD now ported |
| SEO readiness | 8/10 | 8/10 | Ready for static deployment with current parity set |

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

## Comparison Runs

| Date | Compared artifacts | Method | Result summary | Follow-up |
|---|---|---|---|---|
| 2026-05-15 | Old snapshot HTML vs new `build/index.html` | Tag-level manual diff | Core tags parity; extended metadata and schema gaps | Add SEO parity pass for missing tags/schema |
| 2026-05-15 | Old snapshot HTML vs regenerated `build/index.html` | Tag-level manual diff | Core + extended OG + Twitter + JSON-LD all present | Keep tracking drift via this document |
