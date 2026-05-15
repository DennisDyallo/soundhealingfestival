# Codex Operating Instructions

This repo is operated by a non-technical product owner through Codex. Default to owner-safe execution: make small scoped changes, preserve the live site unless asked otherwise, and return clear validation evidence.

## Default Workflow

1. Read `START_HERE.md` for the owner-facing workflow.
2. For website change requests, use `.codex/skills/soundhealing-owner-ops/SKILL.md`.
3. Create or update a request log entry before editing guarded files:
   - `docs/request-log/requests/REQ-YYYYMMDD-###.md`
   - `docs/request-log/index.json`
4. State assumptions before implementation when the request leaves business facts unclear.
5. Keep edits scoped to the requested outcome. Do not refactor generated Wix snapshot content unless the task is specifically about migration or ingestion.
6. At closeout, report files changed, user-visible result, checks run, request-log status, and rollback reference.

## Required Checks

Run the smallest sufficient check set, but every completed change must include:

- `npm run lint`
- `npm run check`

Also run:

- `npm run build` for content, route, metadata, styling, or asset changes.
- `npm run test:unit` for logic or metadata helpers.
- `npm run test:e2e` for visible page behavior or navigation changes.
- `npm run test:visual` for layout/design parity changes.
- `npm run perf:budget:enforce` for image, CSS, JS, payload, or performance-sensitive changes.
- `npm run ci:check` before release/deploy sign-off.

If a browser test cannot start because the sandbox blocks a local server, request escalation and rerun the same command.

## Protected Areas

Treat these as review-required:

- `scripts/*`
- `src/routes/+layout.svelte`
- `static/wix.css`
- `src/lib/content/home.html`
- `src/lib/content/seo.ts`
- `COMPARISON.md` baseline/performance rows
- `.codex/*` operating instructions, skills, and agent prompts

Protected changes can still be made, but call them out in the final answer and make the rollback path explicit.

## Owner Safety Rules

- Do not ask the owner to edit code manually.
- Do not expose unnecessary technical detail in the final answer.
- If event facts conflict, stop and ask for the exact truth before publishing-facing changes.
- If a request changes SEO, dates, ticketing, pricing, lineup, venue, or external links, update `COMPARISON.md` when the rendered or metadata surface changes.
- Never overwrite user changes. Work with the current dirty tree and mention unrelated changes only if they block the task.

