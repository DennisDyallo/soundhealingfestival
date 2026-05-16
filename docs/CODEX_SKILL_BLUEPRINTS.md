# Codex Skill Blueprints

This repo currently has one repo-local skill:

- `.codex/skills/soundhealing-owner-ops/`

Use it for non-technical owner website operations: content edits, event facts, ticket links, lineup changes, SEO/social metadata, image swaps, parity fixes, performance checks, and release readiness.

## Skill Scope Policy

Do not create new skills or agents for every change type yet. Keep one owner-facing skill, `$soundhealing-owner-ops`, with recipes in `references/` until repeated real usage proves a split is worth it.

Prefer adding a recipe/reference over creating a new skill when the work is still a normal website operation, such as SEO edits, image swaps, ticket links, posts, pages, or release checks.

Consider a new skill only when a workflow becomes frequent, specialized, and confusing inside the main skill. Practical thresholds:

- Mateusz requests the same new content/post/page workflow at least five times.
- A CMS introduces distinct content types with their own validation rules.
- A task needs deterministic scripts or assets that would bloat the owner-ops skill.
- A release workflow becomes complex enough that the existing release reviewer prompt is no longer sufficient.

## Skill Authoring Rules

When adding or changing skills:

1. Use the system `skill-creator` guidance.
2. Keep `SKILL.md` concise and procedural.
3. Put detailed examples in `references/`.
4. Include `agents/openai.yaml`.
5. Validate the skill with `quick_validate.py`.
6. Keep repo-specific execution rules in `AGENTS.md` rather than duplicating them in every skill.

## Role Mapping

| Role | Uses | Owns |
| --- | --- | --- |
| Product owner | `START_HERE.md`, `$soundhealing-owner-ops` | Request, constraints, approval |
| Codex operator | `AGENTS.md`, skill, request log | Scoped implementation and evidence |
| Consultant/release reviewer | `.codex/agents/release-reviewer.md`, `docs/RELEASE_CHECKLIST.md` | Risk review, release sign-off, rollback clarity |

## Skill Lifecycle

1. Create or update the skill.
2. Keep supporting examples in `references/`.
3. Validate the skill.
4. Run repo checks if docs or operating behavior changed.
5. Record material changes in the request log.
