# Non-Technical Product Owner Brief

Use this when drafting website changes in free text.  
Default execution workflow is the request log:
- `docs/request-log/templates/*` (start with `intake.md`)
- `docs/request-log/requests/*` (live request records)
- `docs/request-log/index.json` + `docs/request-log/schema.json` (registry + structure)

## 1) Request template (copy/paste)

```text
Business goal:
What should change:
What must not change:
Where on the site:
Priority:
Definition of done:
```

## 2) Good examples

### Content update

```text
Business goal: Clarify event timing.
What should change: Replace the hero subtext with: "February 21, 2027 at Skeppsholmen Church."
What must not change: Existing layout, colors, and SEO metadata.
Where on the site: Homepage hero section.
Priority: High.
Definition of done: New text is visible, no layout shift, lint/check/build pass.
```

### Design update

```text
Business goal: Improve CTA visibility.
What should change: Make the main CTA button more prominent using existing token system.
What must not change: Brand palette and typography style.
Where on the site: Homepage CTA block.
Priority: Medium.
Definition of done: CTA has stronger contrast and visual hierarchy; visual/e2e checks pass.
```

## 3) AI execution contract (must happen every time)

1. Restate request as scoped file-level plan.
2. List assumptions explicitly when requirement is vague.
3. Run required checks:
   - `npm run lint && npm run check`
   - plus task-specific gates (`build`, `test:e2e`, `test:visual`, `perf:budget:enforce`).
4. Update `COMPARISON.md` when SEO/performance/parity-visible behavior changes.
5. Create a request log entry at task start (`docs/request-log/requests/REQ-XXXX.md`) with status `attempted`.
6. At task finish, update request status to `completed`, `blocked`, or `reverted`, including checks run, commit refs, and rollback reference.
7. Commit large changes using **Conventional Commits** with clear scope and include the request-id reference (for example `[REQ-0042]`).

## 4) “Do not proceed” triggers

If any of these are true, AI must stop and ask for clarification:

- request conflicts with “what must not change”
- affected page/section is unknown
- success criteria are missing
- protected files are changed without review (`scripts/*`, `src/routes/+layout.svelte`, baseline rows in `COMPARISON.md`)

## 5) Large-change commit policy

For any non-trivial change, commit in logical slices with this pattern:

1. `feat|fix(scope): <what changed>`
2. `test(scope): <coverage added>`
3. `docs(scope): <workflow or comparison updates>`

Each large-change commit must include the same request-id reference (for example `[REQ-0042]`).

Each commit should be independently reviewable and reversible.
