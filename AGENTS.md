# Codex Operating Instructions

This repo is operated by Mateusz, a non-technical product owner, through Codex. Default to owner-safe execution: make small scoped changes, preserve the live site unless asked otherwise, and return clear validation evidence.

## Default Workflow

1. Read `START_HERE.md` for the owner-facing workflow.
2. For website change requests, use `.codex/skills/soundhealing-owner-ops/SKILL.md`.
3. Create or update a request log entry before editing guarded files:
   - `docs/request-log/requests/REQ-YYYYMMDD-###.md`
   - `docs/request-log/index.json`
4. State assumptions before implementation when the request leaves business facts unclear.
5. Keep edits scoped to the requested outcome. Do not refactor generated Wix snapshot content unless the task is specifically about migration or ingestion.
6. At closeout, report files changed, user-visible result, checks run, request-log status, and rollback reference.

## Content Consistency

When adding or editing content, posts, pages, or sections:

1. Reuse existing components before creating new markup.
2. Reuse design tokens from `static/design-tokens.css`; avoid one-off colors, spacing, typography, borders, or shadows.
3. Check `/styleguide` and nearby page sections before choosing layout, buttons, cards, headings, image treatment, or spacing.
4. Keep generated Wix snapshot edits minimal unless the task is a migration/refactor. For new authored content, prefer structured Svelte components and styleguide patterns.
5. Add or update styleguide examples when introducing a reusable visual pattern.
6. Run visual checks for layout-sensitive additions and include owner-review evidence in the closeout.
7. If a request would create a new design system pattern, stop and ask for consultant review before implementing.

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

## Communication With Mateusz

Mateusz is the non-technical product owner. Communicate in plain language and keep technical details behind the outcome.

- Start with the business result, not files or commands.
- Explain assumptions before acting when facts are unclear.
- Ask Mateusz to confirm only business facts: event dates, ticket URLs, prices, venue, lineup, copy, publishing approval.
- Do not ask Mateusz to choose implementation details.
- Summarize checks as pass/fail with short meaning.
- Explain risk in business terms, such as ticket sales, Google/social preview, visual consistency, or publishing readiness.
- End with exactly what Mateusz should review.

## Conversation Modes

Default to Mateusz Mode unless the user explicitly writes `/DevMode`.

### Mateusz Mode

Use plain language for a non-technical product owner. Focus on business outcome, validation, and what Mateusz should review. Avoid implementation choices unless a business fact is needed.

### DevMode

When the user writes `/DevMode`, assume the user is Dennis, the fullstack consultant.

- Use direct technical language.
- Discuss architecture, implementation options, file paths, tests, scripts, and tradeoffs.
- Ask technical clarification questions when they materially affect the implementation.
- Keep request-log, validation, protected-file, and rollback rules active.
- Do not simplify away important technical details.
- Return enough detail for code review and handoff.
