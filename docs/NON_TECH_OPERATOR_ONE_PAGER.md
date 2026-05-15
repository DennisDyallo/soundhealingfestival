# Non-Technical Website Operator — One Pager

Use this page as your daily operating guide when working with AI agents.

## 1) What you do

1. Describe the business outcome you want.
2. Define what must not change.
3. Review AI evidence before approving.
4. Keep changes small and reversible.

## 2) Copy/paste request format

```text
Goal:
What to change:
What must not change:
Where on site:
Priority:
Done means:
```

## 3) What AI must always do

- Restate your request with clear scope.
- List assumptions before implementing.
- Run checks:
  - `npm run lint && npm run check`
  - plus task checks (`build`, `test:e2e`, `test:visual`, `perf:budget:enforce`) when relevant.
- Create request log entry at task start with status `attempted`.
- Update request log status at finish to `completed`, `blocked`, or `reverted`.
- Record checks run, commit refs, and rollback reference in the request log closeout.
- Update `COMPARISON.md` when SEO/performance/parity-visible behavior changes.
- Commit large changes using **Conventional Commits** in logical slices and include the request-id reference (for example `[REQ-0042]`).

## 4) Approval checklist (you)

- Requested outcome is visible and correct.
- “Must not change” constraints were respected.
- Validation output was provided.
- Changed files look scoped to your request.
- Request log shows final status and includes checks, commits, and rollback reference.
- If large change: multiple clear commits were created.

## 5) Escalate to human fullstack developer when

- Protected files are changed (`scripts/*`, `src/routes/+layout.svelte`, critical `COMPARISON.md` baselines).
- Scope is unclear or conflicts with constraints.
- Validation fails or parity breaks.
- Rollback plan is missing.

## 6) Revert strategy

- Ask AI for the exact commit hash to revert.
- Revert the minimal commit first.
- Re-run `npm run lint && npm run check` and confirm page behavior.
- Update the request log to `reverted` and add the rollback reference used.

## 7) Where to find the full system

- Intake brief: `docs/NON_TECH_PRODUCT_OWNER_BRIEF.md`
- Recipes: `docs/CODEX_WORKFLOWS.md`
- Skill contracts: `docs/CODEX_SKILL_BLUEPRINTS.md`
- Agent templates: `docs/CODEX_AGENT_TEMPLATES.md`
- Release gates: `docs/RELEASE_CHECKLIST.md`
