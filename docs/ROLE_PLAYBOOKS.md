# Role Playbooks

Use `docs/CODEX_SKILL_BLUEPRINTS.md` as the operational contract. This page is the quick-start by role.

## Non-technical owner (request + approval)

1. Pick a recipe in `docs/CODEX_WORKFLOWS.md`.
2. Submit exact goal, text/assets, and success criteria.
3. Require validation output from `npm run lint && npm run check`.
4. Approve only when requested outcome and evidence match.

## UX designer (spec + visual QA)

1. Use `/styleguide` as the visual source of truth.
2. Provide route, component/token intent, and visual acceptance criteria.
3. Validate in `npm run dev` and verify no regressions on critical sections.
4. Require standard checks before handoff.

## Fullstack developer (implement + validate)

1. Run setup: `npm install && npm run setup`.
2. Read `docs/ARCHITECTURE.md` and `docs/CODEX_SKILL_BLUEPRINTS.md`.
3. Implement scoped changes only; avoid unrelated edits.
4. Run `npm run lint && npm run check` and any risk-based extras before merge.

## Release manager (gates + sign-off)

1. Run and complete `docs/RELEASE_CHECKLIST.md`.
2. Review changed files and confirm scope matches request.
3. Require mandatory validation (`npm run lint && npm run check`).
4. Run `npm run ci:check` for release candidates or protected-area changes.
5. Ensure `COMPARISON.md` is updated when SEO/performance parity changes.
