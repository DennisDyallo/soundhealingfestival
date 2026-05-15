# Codex Workflows (No-Code Friendly)

This file defines safe, repeatable change requests for people using Codex CLI without writing code.

Default for non-technical change requests:
- `docs/request-log/templates/*` (start from `intake.md`; use others for updates/handoffs)
- `docs/request-log/schema.json` (required fields/status lifecycle)
- `docs/request-log/requests/*` (store each `REQ-XXXX.md`)
- `docs/request-log/index.json` (request registry)

If the request is still rough, draft it first in:
- `docs/NON_TECH_PRODUCT_OWNER_BRIEF.md`

## Safety rules

1. Never edit generated source snapshot files directly unless the task is content ingestion.
2. Always run:
   - `npm run check`
   - `npm run test:unit`
   - `npm run build`
   - `npm run perf:budget:enforce`
3. Any SEO/performance-impacting change must update `COMPARISON.md`.
4. If output is unexpected, revert only the changed files and re-run from a clean request.
5. For release/deploy requests, enforce `docs/RELEASE_CHECKLIST.md` before sign-off.
6. At task start, create a request log entry in `docs/request-log/requests/` with `status: "attempted"`.
7. At task finish, update request log status to `completed`, `blocked`, or `reverted`.
8. Every request log closeout must include checks run, commit references, and rollback reference (or `null` with reason).
9. Large changes must be committed with Conventional Commit messages in logical, reversible slices, and each message must include the request-id reference (for example `[REQ-0042]`).

## Task recipes

| Task | What to ask Codex | Done means |
| --- | --- | --- |
| Update hero text | "Update hero headline and subtext on homepage while preserving visual layout and SEO metadata." | Content is updated and no visual breakage. |
| Swap an image | "Replace hero image with `<filename>` and keep responsive loading + dimensions." | New image renders and perf budget remains green. |
| Edit SEO description | "Update `meta description` and Open Graph description with this text: `<text>`." | Description tags updated and tests/build pass. |
| Add a section | "Add a new section under `<existing section>` using existing token system and styleguide patterns." | Section appears on page and styleguide has matching example. |
| Build comparison refresh | "Run build + perf budget and update COMPARISON.md with new numbers and change log row." | Comparison sheet reflects latest canonical values. |

## Protected areas (review required)

- `scripts/migrate-snapshot.mjs`
- `scripts/perf-budget.mjs`
- `src/routes/+layout.svelte` (SEO and structured data)
- `COMPARISON.md` baseline values

Changes in protected areas should be reviewed by a developer before deploy.
