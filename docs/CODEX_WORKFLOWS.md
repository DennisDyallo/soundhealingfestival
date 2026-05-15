# Codex Workflows (No-Code Friendly)

This file defines safe, repeatable change requests for people using Codex CLI without writing code.

## Safety rules

1. Never edit generated source snapshot files directly unless the task is content ingestion.
2. Always run:
   - `npm run check`
   - `npm run test:unit`
   - `npm run build`
   - `npm run perf:budget:enforce`
3. Any SEO/performance-impacting change must update `COMPARISON.md`.
4. If output is unexpected, revert only the changed files and re-run from a clean request.

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
