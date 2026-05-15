# Codex Agent Task Templates

Copy-paste templates for recurring Codex jobs in this repo.

Canonical repo-local prompt files:

- `.codex/agents/product-owner-operator.md`
- `.codex/agents/release-reviewer.md`

Use with:

- `AGENTS.md` (repo-level Codex instructions)
- `.codex/skills/soundhealing-owner-ops/` (default owner-ops skill)
- `docs/ARCHITECTURE.md` (file map + ownership)
- `docs/CODEX_WORKFLOWS.md` (safety rails)
- `docs/CODEX_SKILL_BLUEPRINTS.md` (contract lifecycle)
- `COMPARISON.md` (parity and changelog source of truth)

## Commit policy (all templates)

- For large changes, require Conventional Commit messages with a request-id reference (for example `[REQ-0042]`).
- Split large work into logical slices (implementation -> tests -> docs) so each commit is reviewable and reversible.
- Always include validation evidence before commit.

## Request-log policy (all templates)

- At task start, create/update the request log entry in `docs/request-log/requests/REQ-XXXX.md` with `status: "attempted"`.
- At task finish, set `status` to `completed`, `blocked`, or `reverted`.
- Closeout must include checks run, commit references, and rollback reference (or explicit `null` reason).
- Include the request-id in large-change Conventional Commit messages.

---

## 1) Content/Text Updates

### Copy-paste prompt

```text
You are working in /Users/Dennis.Dyall/Code/other/soundhealingfestivalstockholm.com.
Use $soundhealing-owner-ops.

Task: content/text update.
Update: <exact old copy> -> <exact new copy>.
Scope: <route/file/section>.
Do not change layout, SEO metadata, or unrelated files.

Required checks:
- npm run lint && npm run check
- npm run build

Return:
- exact files changed
- short diff summary
- validation results
- whether COMPARISON.md needed an update
- request-log closeout (`REQ-XXXX`, final status, checks, commits, rollback reference)
```

**Required inputs**

- Exact replacement copy (old + new)
- Target route/section
- Locale/tone constraints

**Constraints / safety checks**

- Scoped edits only; no unrelated refactors
- Preserve structure and classes unless explicitly requested
- If SEO-visible text changes materially, update `COMPARISON.md` changelog row

**Expected outputs**

- Updated content in target files
- Validation summary
- File list with rationale

**Required commands/checks**

- `npm run lint && npm run check`
- `npm run build`

**Completion criteria**

- New copy appears in expected location
- Build and checks pass
- Any required `COMPARISON.md` update is included

---

## 2) SEO/Meta Updates

### Copy-paste prompt

```text
You are working in /Users/Dennis.Dyall/Code/other/soundhealingfestivalstockholm.com.
Use $soundhealing-owner-ops.

Task: SEO/meta update.
Update these fields: <title|description|canonical|og:*|twitter:*|json-ld>.
New values: <exact values>.
Keep visual rendering unchanged.

Relevant files are typically:
- src/lib/content/seo.ts
- src/routes/+layout.svelte
- COMPARISON.md

Required checks:
- npm run lint && npm run check
- npm run build

Return:
- updated metadata fields
- affected files
- COMPARISON.md matrix/changelog updates
- validation results
- request-log closeout (`REQ-XXXX`, final status, checks, commits, rollback reference)
```

**Required inputs**

- Exact metadata fields to change
- Final values (title, descriptions, URLs, image URLs, schema details)
- Canonical URL rules

**Constraints / safety checks**

- Preserve existing metadata keys not explicitly changed
- Keep structured data valid JSON-LD
- Update `COMPARISON.md` matrix + changelog for SEO-impacting changes

**Expected outputs**

- Updated metadata sources and rendered head tags
- Documented parity/comparison updates

**Required commands/checks**

- `npm run lint && npm run check`
- `npm run build`

**Completion criteria**

- Requested tags are present with exact values
- No Svelte/TS/lint failures
- `COMPARISON.md` reflects the SEO change

---

## 3) Visual Parity Investigation/Fix

### Copy-paste prompt

```text
You are working in /Users/Dennis.Dyall/Code/other/soundhealingfestivalstockholm.com.
Use $soundhealing-owner-ops.

Task: investigate and fix visual parity issue.
Observed issue: <what differs from baseline>.
Expected behavior: <what should match>.
Reference area: <section/selector/route>.

Use existing visual QA flow and keep fixes minimal.

Required checks:
- npm run lint && npm run check
- npm run build
- npm run test:e2e
- npm run test:visual

Return:
- root cause
- exact fix
- before/after evidence from tests
- files changed
- request-log closeout (`REQ-XXXX`, final status, checks, commits, rollback reference)
```

**Required inputs**

- Clear defect description with expected parity behavior
- Route/section/selector
- Optional screenshot or DOM clues

**Constraints / safety checks**

- Prefer smallest fix that restores parity
- Reuse existing patterns from `src/routes/+page.svelte`, `static/wix.css`, `/styleguide`
- No broad CSS rewrites unless required

**Expected outputs**

- Root cause summary
- Minimal patch restoring parity
- Test evidence from e2e/visual checks

**Required commands/checks**

- `npm run lint && npm run check`
- `npm run build`
- `npm run test:e2e`
- `npm run test:visual`

**Completion criteria**

- Reported visual mismatch is resolved
- Visual + e2e checks pass
- No regressions introduced elsewhere

---

## 4) Performance Budget Optimization Pass

### Copy-paste prompt

```text
You are working in /Users/Dennis.Dyall/Code/other/soundhealingfestivalstockholm.com.
Use $soundhealing-owner-ops.

Task: run a performance budget optimization pass.
Optimization target: <html bytes|js bytes|js file count|largest image>.
Maintain visual and SEO parity.

Required checks:
- npm run lint && npm run check
- npm run build
- npm run perf:budget
- npm run perf:budget:enforce

Return:
- what was optimized
- old vs new metrics
- budget status
- COMPARISON.md updates
- request-log closeout (`REQ-XXXX`, final status, checks, commits, rollback reference)
```

**Required inputs**

- Target metric(s) and priority order
- Constraints (no feature loss, no parity regression)
- Acceptance threshold if stricter than current budgets

**Constraints / safety checks**

- Keep functionality and parity intact
- Use existing script `scripts/perf-budget.mjs` via npm scripts
- Update `COMPARISON.md` when metrics change

**Expected outputs**

- Optimized assets/code paths
- Metric deltas and budget results
- Updated comparison documentation

**Required commands/checks**

- `npm run lint && npm run check`
- `npm run build`
- `npm run perf:budget`
- `npm run perf:budget:enforce`

**Completion criteria**

- Budget checks pass
- Target metrics improved or justified if unchanged
- `COMPARISON.md` updated with current run data

---

## 5) Comparison Refresh + Changelog Update

### Copy-paste prompt

```text
You are working in /Users/Dennis.Dyall/Code/other/soundhealingfestivalstockholm.com.

Task: refresh COMPARISON.md and changelog after recent changes.
Include:
- Current Comparison Matrix updates
- New Change Log row
- New Comparison Runs row

Recompute metrics using project scripts.

Required checks:
- npm run build
- npm run perf:budget
- npm run lint && npm run check

Return:
- exact COMPARISON.md sections updated
- metrics inserted
- consistency check against current build output
- request-log closeout (`REQ-XXXX`, final status, checks, commits, rollback reference)
```

**Required inputs**

- Summary of recent code changes
- Date/version marker for new rows
- Any SEO or performance claims that must be logged

**Constraints / safety checks**

- Keep prior historical rows intact
- Use script-generated metrics (no guessed numbers)
- Ensure matrix, changelog, and runs remain internally consistent

**Expected outputs**

- Fully refreshed `COMPARISON.md` entries for the pass
- Traceable metrics tied to command output

**Required commands/checks**

- `npm run build`
- `npm run perf:budget`
- `npm run lint && npm run check`

**Completion criteria**

- All three required sections are updated
- Numbers match current build/script output
- File is ready for release review

---

## 6) Pre-release Validation + Commit Prep

### Copy-paste prompt

```text
You are working in /Users/Dennis.Dyall/Code/other/soundhealingfestivalstockholm.com.

Task: run pre-release validation and prepare commit summary.
Scope: <PR/release scope>.

Required checks:
- npm run ci:check
- git --no-pager status --short
- git --no-pager diff --stat

Also verify COMPARISON.md is updated when SEO/performance/content parity changed.

Return:
- pass/fail per gate
- final changed file list
- concise commit message suggestion
- release-readiness verdict
- request-log closeout (`REQ-XXXX`, final status, checks, commits, rollback reference)
```

**Required inputs**

- Release scope and risk level
- Expected changed files/features
- Any protected-area touchpoints

**Constraints / safety checks**

- Do not claim release-ready without successful gate output
- Flag protected-area changes for reviewer sign-off
- Ensure commit summary matches actual diff

**Expected outputs**

- Validation gate report
- Accurate commit-prep summary
- Clear go/no-go decision

**Required commands/checks**

- `npm run ci:check`
- `git --no-pager status --short`
- `git --no-pager diff --stat`

**Completion criteria**

- CI-equivalent checks pass
- Change scope and commit message are consistent with diff
- Release decision is explicit and evidence-backed
