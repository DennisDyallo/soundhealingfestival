# Release & Parity Checklist

Use this checklist for this repo and future carbon-copy projects to keep releases reproducible and parity-safe.

## 1) Pre-release inputs (required)

- [ ] Scope is documented (what changed, why, and affected files/routes).
- [ ] Original baseline is identified (old artifact/source snapshot path).
- [ ] New candidate artifact is identified (`build/index.html` + relevant assets).
- [ ] Release window, owner, and rollback owner are named.
- [ ] Risk level is declared (low/medium/high) and protected-area impact is noted.
- [ ] Request log entry exists (`docs/request-log/requests/REQ-XXXX.md`) and starts with status `attempted`.

## 2) Validation gates (must pass)

Run gates in this order and capture pass/fail output in the release notes/PR:

| Gate | Command | Pass criteria |
| --- | --- | --- |
| Lint | `npm run lint` | No lint errors |
| Type/Svelte check | `npm run check` | 0 errors, 0 warnings |
| Request-log guardrail | `npm run request-log:verify` | Guarded changes include request-log update |
| Unit | `npm run test:unit` | All tests passing |
| Script smoke | `npm run test:smoke` | Smoke checks passing |
| E2E | `npm run test:e2e` | Critical browser flows passing |
| Visual regression | `npm run test:visual` | No unexpected diffs (`test:visual:update` only for intentional UI change) |
| Perf budget | `npm run build && npm run perf:budget:enforce` | All budget thresholds passing |

> Minimum owner-approval evidence remains `npm run lint && npm run check`.
> Record the executed checks in request-log `checks_run` before release sign-off.

## 3) Parity checks against original

- [ ] Compare old source snapshot vs new build output for SEO/content parity.
- [ ] Re-verify title, meta description, canonical, OG/Twitter tags, and JSON-LD.
- [ ] Re-verify primary visible content parity (hero, lineup/sections, key CTA blocks).
- [ ] Re-verify known parity-sensitive behavior (e.g., motion-reveal visibility states).
- [ ] Record any intentional differences and rationale in `COMPARISON.md`.

## 4) `COMPARISON.md` update requirements

When SEO/performance/content parity or payload profile changes:

- [ ] Update **Current Comparison Matrix** rows impacted by this release.
- [ ] Add a **Change Log** row (date, change summary, touched files, expected SEO impact).
- [ ] Add a **Comparison Runs** row (method, result summary, follow-up).
- [ ] Keep data values traceable to reproducible commands (`build`, budgets, diff method).

If no parity-impacting deltas occurred, note that explicitly in release notes.

## 5) Deploy and post-deploy verification

### Deploy

- [ ] Confirm target environment and artifact source are correct.
- [ ] Run release gate: `npm run ci:check` for release candidates/protected-area changes.
- [ ] Deploy static output from current validated commit.

### Post-deploy verification

- [ ] Confirm homepage loads and key sections render on production URL.
- [ ] Confirm metadata parity on deployed page (title/meta/canonical/OG/Twitter/JSON-LD).
- [ ] Confirm no new console/runtime errors on core route.
- [ ] Re-run quick smoke/e2e checks against deployed URL when feasible.
- [ ] Record deployment timestamp, environment, and verifier.

## 6) Rollback checklist

- [ ] Identify last known-good commit/artifact before deployment.
- [ ] Trigger rollback using the host/provider standard process.
- [ ] Verify rollback site health (page load + critical sections + metadata).
- [ ] Re-run `npm run lint && npm run check` locally on rollback branch/commit if code changed.
- [ ] Document rollback reason, timestamp, and follow-up actions.
- [ ] Update request log status to `reverted` and set rollback reference.

## 7) Request-log closeout (required)

- [ ] Final request status is updated to `completed`, `blocked`, or `reverted`.
- [ ] Request log includes checks run, commit references, and rollback reference (or explicit `null` reason).
- [ ] If validation/deploy is blocked, status is `blocked` with escalation notes.
- [ ] Large-change commits are Conventional Commits and include request-id reference.

## 8) Carbon-copy project reuse notes

For cloned projects, keep this file unchanged except for project-specific artifact paths and environment names. Pair with:

- `README.md` (project commands + quality gates)
- `CONTRIBUTING.md` (daily workflow + pre-PR checks)
- `COMPARISON.md` (living parity/performance log)
- `docs/CODEX_WORKFLOWS.md`, `docs/CODEX_SKILL_BLUEPRINTS.md`, `docs/ROLE_PLAYBOOKS.md` (role-driven execution/playbooks)
