# Codex Agent Templates

Canonical prompt files now live in `.codex/agents/`:

- `.codex/agents/product-owner-operator.md` — routine owner-operated website changes.
- `.codex/agents/release-reviewer.md` — release-readiness and risk review.

Use those files instead of copying long templates from this document. They point Codex to `AGENTS.md` and `$soundhealing-owner-ops`, which are the canonical execution rules.

## When to Use Each Prompt

| Need | Prompt file |
| --- | --- |
| Update copy, date, ticket link, lineup, image, or SEO | `.codex/agents/product-owner-operator.md` |
| Check whether a change is ready to publish | `.codex/agents/release-reviewer.md` |
| Investigate a failed check or protected-file risk | `.codex/agents/release-reviewer.md` first, then consultant review if needed |

## Related References

- `START_HERE.md` — owner daily workflow.
- `AGENTS.md` — repo-level Codex rules.
- `.codex/skills/soundhealing-owner-ops/references/common-requests.md` — concrete common request examples.
- `docs/RELEASE_CHECKLIST.md` — full release checklist.
