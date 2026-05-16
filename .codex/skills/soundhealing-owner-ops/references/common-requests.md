# Common Owner Requests

Use these patterns to interpret owner requests and select checks.

## Event Date

Owner prompt:

```text
Use $soundhealing-owner-ops to update the event date to <exact date>. Keep layout, images, and ticket links unchanged.
```

Expected work:

- Update visible content and SEO/social metadata when relevant.
- Check for old dates across `src/lib/content/home.html`, `src/lib/content/seo.ts`, and `COMPARISON.md`.
- Run `npm run lint`, `npm run check`, `npm run test:unit`, and `npm run build`.

## Ticket Link

Owner prompt:

```text
Use $soundhealing-owner-ops to update all ticket CTAs to <exact URL>. Keep copy and styling unchanged.
```

Expected work:

- Update all visible ticket links consistently.
- Verify no CTA says tickets are unavailable if the link is live, unless the owner explicitly wants that.
- Run `npm run lint`, `npm run check`, `npm run build`, and `npm run test:e2e`.

## Lineup Copy

Owner prompt:

```text
Use $soundhealing-owner-ops to update the lineup with this exact copy: <copy>. Do not change other sections.
```

Expected work:

- Preserve generated markup structure as much as possible.
- Verify the lineup is visible after scroll.
- Run `npm run lint`, `npm run check`, `npm run build`, and `npm run test:e2e`.

## SEO Preview

Owner prompt:

```text
Use $soundhealing-owner-ops to update the Google/social preview to: title <title>, description <description>, image <URL>.
```

Expected work:

- Update title, meta description, OG, Twitter, and structured data where applicable.
- Update `COMPARISON.md`.
- Run `npm run lint`, `npm run check`, `npm run test:unit`, and `npm run build`.

## New Content, Post, Page, or Section

Owner prompt:

```text
Use $soundhealing-owner-ops to add a new <post|page|section> with this content: <copy/assets>. It must reuse the existing styleguide and components, with no surprise visual changes.
```

Expected work:

- Inspect `/styleguide`, `static/design-tokens.css`, and existing styleguide components before choosing a layout.
- Reuse existing button, card, typography, spacing, and image patterns.
- Add a styleguide example if the work introduces a reusable pattern.
- Return a plain-language note explaining what pattern was reused and what Mateusz should review.
- Run `npm run lint`, `npm run check`, `npm run build`, and visual checks when layout changes are material.

## Release Check

Owner prompt:

```text
Use $soundhealing-owner-ops to check whether this change is ready to publish.
```

Expected work:

- Review the active request log.
- Run `npm run ci:check`.
- Run `npm run test:e2e` for visitor-facing changes if not already run.
- Return blockers first, then residual risk.
