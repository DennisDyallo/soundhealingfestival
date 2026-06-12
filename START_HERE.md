# Start Here

This repo is set up so Mateusz can ask Codex for website changes in plain English.

## First-Time Setup (do this once)

1. Double-click `Onboard-Soundhealing.cmd` (Dennis will send it to you).
2. If Windows shows a blue "Windows protected your PC" box, click **More info**, then **Run anyway**.
3. Wait a few minutes while it installs everything and downloads the website.
4. When a window opens, type **`onboard me`** and press Enter.

That's it. The assistant takes over from there and walks you through the rest.

## Daily Workflow

1. Open Codex in this repo.
2. Paste a request using this format:

```text
Goal:
What to change:
What must not change:
Where on site:
Priority:
Done means:
```

3. Ask Codex to use `$soundhealing-owner-ops`.
4. Review Codex's summary, changed files, and validation checks.
5. Approve only when the page behavior and checks match the request.

## Common Requests

```text
Use $soundhealing-owner-ops to update the homepage event date to <exact date>. Do not change layout, images, or ticket links. Done means the visible page and SEO title/description are consistent and checks pass.
```

```text
Use $soundhealing-owner-ops to update the ticket link to <exact URL>. Do not change copy or styling. Done means all ticket CTAs point to the correct place and browser checks pass.
```

```text
Use $soundhealing-owner-ops to replace the hero image with <filename>. Keep the current visual layout and performance budget. Done means the new image is visible on desktop/mobile and checks pass.
```

```text
Use $soundhealing-owner-ops to update the artist lineup with this exact text: <copy>. Do not change other sections. Done means the lineup is visible after scrolling and checks pass.
```

```text
Use $soundhealing-owner-ops to add a new <post|page|section> using the existing styleguide and reusable components. Do not invent new colors, spacing, typography, or card/button styles. Done means it looks coherent with the current site, `/styleguide` still represents the pattern, and visual/build checks pass.
```

## What Codex Should Return

- What changed in plain language.
- Files changed.
- Checks run and whether they passed.
- How the change reused existing styleguide/components, when the request adds content, posts, pages, or sections.
- Anything the owner must verify, such as a ticket URL or event fact.
- Request-log ID and final status.

## When to Ask the Consultant

Escalate to a developer when Codex reports failed checks, unclear event facts, protected-file risk, release/deploy uncertainty, or a missing rollback path.

## Consultant Override

Dennis can write `/DevMode` when taking over from Mateusz. This switches Codex to technical consultant communication while keeping all safety rules active.
