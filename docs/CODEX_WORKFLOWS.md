# Codex Workflows (No-Code Friendly)

This file defines safe, repeatable change requests for people using Codex CLI without writing code.

Default Codex entry points:

- `AGENTS.md` — repo-level operating instructions
- `START_HERE.md` — product-owner daily workflow
- `.codex/skills/soundhealing-owner-ops/` — default skill for website changes
- `.codex/agents/` — reusable agent prompt files

If the request is still rough, draft it first in:
- `docs/NON_TECH_PRODUCT_OWNER_BRIEF.md`

## Safety rules

Follow `AGENTS.md` for required checks, request-log lifecycle, protected areas, comparison updates, and commit discipline.

## Task recipes

| Task | What to ask Codex | Done means |
| --- | --- | --- |
| Update hero text | "Use `$soundhealing-owner-ops` to update hero headline and subtext on homepage while preserving visual layout and SEO metadata." | Content is updated and no visual breakage. |
| Swap an image | "Use `$soundhealing-owner-ops` to replace hero image with `<filename>` and keep responsive loading + dimensions." | New image renders and perf budget remains green. |
| Edit SEO description | "Use `$soundhealing-owner-ops` to update `meta description` and Open Graph description with this text: `<text>`." | Description tags updated and tests/build pass. |
| Add a section | "Use `$soundhealing-owner-ops` to add a new section under `<existing section>` using existing token system and styleguide patterns." | Section appears on page and styleguide has matching example. |
| Build comparison refresh | "Use `$soundhealing-owner-ops` to run build + perf budget and update COMPARISON.md with new numbers and change log row." | Comparison sheet reflects latest canonical values. |

## Protected areas (review required)

The canonical protected-area list lives in `AGENTS.md`.
