---
name: soundhealing-owner-ops
description: Operate the Sound Healing Festival Stockholm website safely for a non-technical product owner using Codex. Use for homepage/content edits, event fact updates, ticket links, lineup changes, SEO/social metadata updates, image swaps, visual parity fixes, performance budget refreshes, release-readiness checks, and request-log governed website maintenance in this repo.
---

# Sound Healing Owner Ops

## Overview

Use this skill to turn Mateusz's plain-English owner request into a scoped, validated repo change. Mateusz should not need to understand SvelteKit, generated Wix markup, request-log schema details, styleguide enforcement, or test selection.

## First Steps

1. Read `AGENTS.md`.
2. Read `START_HERE.md` if the owner workflow is unclear.
3. Identify whether the request changes:
   - visible content
   - SEO/social metadata
   - event facts: date, venue, lineup, ticket URL, price
   - new content, posts, pages, or reusable sections
   - assets/performance
   - release/deploy readiness
4. If event facts conflict or are missing, ask for the exact fact before changing public-facing content.
5. Create or update a request log entry before editing guarded files.

## Request Log

Use the next ID format: `REQ-YYYYMMDD-###`.

At task start:

- Add `docs/request-log/requests/REQ-YYYYMMDD-###.md`.
- Add a matching record in `docs/request-log/index.json`.
- Set status to `attempted`.
- Include the owner request verbatim, assumptions, scope targets, and must-not-change constraints.

At task finish:

- Set status to `completed`, `blocked`, or `reverted`.
- Include checks run, commit refs or `none`, and rollback reference or `null` with a reason.

## Change Patterns

For content/text edits:

- Prefer the smallest edit that changes the requested text.
- Preserve layout classes and generated structure unless the request is a redesign.
- Run `npm run lint`, `npm run check`, and `npm run build`.
- Run `npm run test:e2e` when the changed text is part of a tested route or scroll behavior.

For new content, posts, pages, or sections:

- Inspect `/styleguide`, `static/design-tokens.css`, `src/lib/components/styleguide/*`, and nearby route/page patterns before editing.
- Reuse existing components and tokens first. Do not introduce ad hoc colors, spacing, typography, cards, buttons, or layout styles.
- Prefer structured Svelte components for new authored content. Avoid expanding generated Wix snapshot markup unless the request is specifically about snapshot parity.
- If a new visual pattern is genuinely needed, add a matching styleguide example and state why existing patterns were insufficient.
- Run `npm run lint`, `npm run check`, `npm run build`, and `npm run test:visual` for layout-sensitive changes.
- In the closeout, explain which existing styleguide/component pattern was reused and what Mateusz should visually review.

For SEO/social metadata:

- Keep visible page facts, `<title>`, meta description, OG, Twitter, and JSON-LD consistent.
- Update `COMPARISON.md` for SEO-visible changes.
- Add or update tests when a field can drift silently.
- Run `npm run test:unit` and `npm run build`.

For ticket/venue/date/lineup facts:

- Treat these as business-critical.
- If values conflict, ask the owner for the exact truth.
- Check visible CTAs and metadata for consistency.
- Run browser checks when links or navigation are affected.

For images/performance:

- Preserve dimensions, loading attributes, and visual framing.
- Run `npm run build` and `npm run perf:budget:enforce`.
- Run visual checks for layout-sensitive image changes.

For release readiness:

- Use `docs/RELEASE_CHECKLIST.md`.
- Run `npm run ci:check`.
- Run `npm run test:e2e` if the release includes visitor-facing changes and CI/e2e was not already run.
- Return findings first if anything is risky.

## Owner-Facing Closeout

Keep the final answer short and practical:

- Say what changed.
- List checks run and pass/fail status.
- Name any owner verification needed.
- Include the request ID and final status.
- Mention protected files touched.
- Explain business risk or uncertainty in plain language.
- Do not ask Mateusz to choose technical implementation details.

## References

- `references/common-requests.md`: owner prompt patterns and expected checks.
- `docs/NON_TECH_OPERATOR_ONE_PAGER.md`: owner daily guide.
- `docs/CODEX_WORKFLOWS.md`: full safety workflow.
- `docs/request-log/templates/intake.md`: request-log starter.
