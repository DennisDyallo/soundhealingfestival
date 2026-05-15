# Role Playbooks

Use `AGENTS.md` as the operational contract. This page is only the quick-start by role.

## Non-technical owner (request + approval)

0. Use `START_HERE.md` as your daily operating sheet.
1. Pick a recipe in `docs/CODEX_WORKFLOWS.md`.
2. Submit exact goal, text/assets, and success criteria.
3. Approve only when requested outcome and validation evidence match.

## UX designer (spec + visual QA)

1. Use `/styleguide` as the visual source of truth.
2. Provide route, component/token intent, and visual acceptance criteria.
3. Validate in `npm run dev` and verify no regressions on critical sections.
4. Require Codex to follow `AGENTS.md` before handoff.

## Fullstack developer (implement + validate)

1. Run setup: `npm install && npm run setup`.
2. Read `docs/ARCHITECTURE.md` and `AGENTS.md`.
3. Implement scoped changes only; avoid unrelated edits.
4. Run the required checks from `AGENTS.md` before merge.

## Release manager (gates + sign-off)

1. Run and complete `docs/RELEASE_CHECKLIST.md`.
2. Review changed files and confirm scope matches request.
3. Require the validation and comparison evidence defined in `AGENTS.md`.
