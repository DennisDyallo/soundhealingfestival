# Sound Healing Festival Stockholm — Codex-Operated Website

## For the product owner

Start here: `START_HERE.md`

### First-time setup (Windows, one click)

1. Double-click `Onboard-Soundhealing.cmd`.
2. If Windows shows "Windows protected your PC", click **More info → Run anyway**.
3. When a window opens at the end, type `onboard me` and press Enter.

The script installs Git, Node, the Codex app, and the Codex CLI, downloads this repo, and hands off to the `soundhealing-onboarding` skill. Going live later is handled by the `soundhealing-deploy` skill (just say `deploy my site`).

Daily workflow:

1. Open Codex in this repo.
2. Paste your request using the short format in `START_HERE.md`.
3. Ask Codex to use `$soundhealing-owner-ops`.
4. Review the summary, changed files, and checks.
5. Approve only when the result and validation match the request.

Codex operating files:

- `AGENTS.md` — repo-level Codex instructions.
- `.codex/skills/soundhealing-owner-ops/` — default skill for owner-operated website changes.
- `.codex/agents/product-owner-operator.md` — prompt for routine owner requests.
- `.codex/agents/release-reviewer.md` — prompt for release-readiness review.
- `docs/request-log/` — audit trail for owner requests.

This project migrates the saved Wix snapshot into a static SvelteKit site while stripping runtime artifacts from the source export.

## Quick start

```sh
npm install
npm run setup
npm run dev
```

- `npm run dev` starts local dev with HMR.
- `npm run dev:host` exposes dev server on local network.
- `npm run setup` regenerates migrated content and checks Svelte/TS diagnostics.

## Source inputs

- `Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html`
- `Sound Healing Evening Stockholm Sweden, 15 Februar 2026_files/`

## Migration workflow

```sh
npm install
npm run migrate:source
```

`migrate:source` does the following:

1. Removes Wix runtime scripts, DarkReader/browser-extension artifacts, and cookie banner markup from the saved HTML.
2. Extracts remaining style tags into `src/lib/content/wix.css`.
3. Writes cleaned page markup to `src/lib/content/home.html`.
4. Extracts key SEO tags into `src/lib/content/seo.ts`.
5. Copies only media assets (images/icons) into `static/assets/`.

## Styleguide

- Route: `/styleguide`
- Global tokens: `static/design-tokens.css`
- Purpose: shared visual language for developer + UX collaboration.

## Testing and quality checks

```sh
npm run format
npm run lint
npm run check
npm run test:unit
npm run build
npm run test:smoke
npm run test:e2e
npm run test:visual
```

Visual tests are intentionally separate from `npm run test:e2e` (and current CI) to keep the default workflow stable across environments.

When visual baselines should change, update snapshots explicitly:

```sh
npm run test:visual:update
```

## Performance budget workflow

Use this after each optimization pass:

```sh
npm run build
npm run perf:budget
```

- `npm run perf:budget` prints old-vs-new artifact metrics and budget status.
- `npm run perf:budget:enforce` does the same check but exits non-zero if any budget is exceeded.

## CI-ready validation

```sh
npm run ci:check
```

This runs lint, type checks, unit tests, build, script smoke tests, and budget enforcement.

## Build output

The project uses `@sveltejs/adapter-static` and prerendering for a static deploy target.

## Comparison tracking

Use `COMPARISON.md` as the single source of truth for old-vs-new parity.  
It must be updated on every relevant change and each new comparison run.

## Contributor docs

- `START_HERE.md` — one-page product-owner entry point
- `AGENTS.md` + `.codex/skills/soundhealing-owner-ops/` — canonical Codex operating rules
- `.codex/agents/` — reusable Codex prompt files
- `docs/request-log/` — request audit trail
- `CONTRIBUTING.md` — onboarding and contribution workflow
- `docs/ARCHITECTURE.md` — codebase map and data flow
- `docs/CODEX_WORKFLOWS.md` — safe no-code Codex task recipes
- `docs/CODEX_SKILL_BLUEPRINTS.md` — reusable Codex skill contracts and lifecycle blueprint
- `docs/CODEX_AGENT_TEMPLATES.md` — copy-paste agent templates for recurring workflows
- `docs/NON_TECH_PRODUCT_OWNER_BRIEF.md` — free-text intake brief for non-technical product owners
- `docs/NON_TECH_OPERATOR_ONE_PAGER.md` — one-page operating guide for non-technical AI-driven website operations
- `docs/ROLE_PLAYBOOKS.md` — role-specific operating guides
- `docs/RELEASE_CHECKLIST.md` — reproducible release, parity, deploy, and rollback gates
- `docs/RUM_CWV_TRACKING_PLAN.md` — production Core Web Vitals and RUM rollout plan
- `docs/project-map/` — machine-readable project map for agent navigation
- `docs/adr-lite/` — ADR-lite ledger for architecture and workflow decisions
