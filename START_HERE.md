# Start Here

This repo is set up so a non-technical product owner can ask Codex for website changes in plain English.

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

## What Codex Should Return

- What changed in plain language.
- Files changed.
- Checks run and whether they passed.
- Anything the owner must verify, such as a ticket URL or event fact.
- Request-log ID and final status.

## When to Ask the Consultant

Escalate to a developer when Codex reports failed checks, unclear event facts, protected-file risk, release/deploy uncertainty, or a missing rollback path.

