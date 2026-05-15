# Contributing Guide

## 1. First-time setup

```sh
npm install
npm run setup
```

`npm run setup` regenerates migrated content and verifies TypeScript/Svelte health.

## 2. Daily workflow

```sh
npm run dev
```

- Vite dev server provides HMR by default.
- Use `npm run dev:host` to expose the server on your local network.
- Use `/styleguide` for component and token review.

## 3. Pre-PR checklist

```sh
npm run lint
npm run check
npm run request-log:verify
npm run test:unit
npm run build
npm run test:smoke
npm run perf:budget:enforce
```

## 4. Role-based entry points

- Fullstack dev: `docs/ARCHITECTURE.md`
- UX designer: `/styleguide` + `docs/ROLE_PLAYBOOKS.md`
- Codex operator / non-technical owner: `docs/CODEX_WORKFLOWS.md` (default workflow below)

### Non-technical request-log workflow (default)

- `docs/request-log/index.json` — request registry
- `docs/request-log/schema.json` — required request structure
- `docs/request-log/templates/*` — intake and update templates
- `docs/request-log/requests/*` — request files (`REQ-XXXX.md`)

## 5. Visual regression workflow

For UI-heavy changes, run visual checks against stable key surfaces:

```sh
npm run test:visual
```

If the UI change is intentional, refresh baselines:

```sh
npm run test:visual:update
```

## 6. Comparison discipline

Any performance, SEO, UX, or payload-affecting change must update `COMPARISON.md`.

## 7. Release and rollback discipline

Use `docs/RELEASE_CHECKLIST.md` for release-candidate validation, parity checks, deploy verification, and rollback readiness.

## 8. Commit discipline

- Use **Conventional Commits** (`feat:`, `fix:`, `test:`, `docs:`, `chore:`).
- For large changes, split commits into logical/reversible slices.
- Keep each commit independently reviewable with clear scope.
