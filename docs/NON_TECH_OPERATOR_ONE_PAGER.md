# Non-Technical Website Operator — One Pager

Use `START_HERE.md` as the shortest daily guide. This page adds only approval and escalation detail.

## 1) What you do

1. Describe the business outcome you want.
2. Define what must not change.
3. Review AI evidence before approving.
4. Keep changes small and reversible.

## 2) Copy/paste request format

```text
Use $soundhealing-owner-ops.

Goal:
What to change:
What must not change:
Where on site:
Priority:
Done means:
```

## 3) What AI must always do

- Follow `AGENTS.md` and `.codex/skills/soundhealing-owner-ops/SKILL.md`.
- Restate your request with clear scope.
- List assumptions before implementing.
- Run the checks required by `AGENTS.md`.
- Keep the request log current from start to closeout.
- Tell you what changed, what passed, and what still needs owner verification.

## 4) Approval checklist (you)

- Requested outcome is visible and correct.
- “Must not change” constraints were respected.
- Validation output was provided.
- Changed files look scoped to your request.
- Request log has final status, checks, commits if any, and rollback reference.

## 5) Escalate to human fullstack developer when

- Codex reports protected-file risk under `AGENTS.md`.
- Scope is unclear or conflicts with constraints.
- Validation fails or parity breaks.
- Rollback plan is missing.

## 6) Revert strategy

- Ask AI for the exact commit hash to revert.
- Revert the minimal commit first.
- Re-run `npm run lint && npm run check` and confirm page behavior.
- Ask AI to update the request log to `reverted`.

## 7) Where to find the full system

- Daily start: `START_HERE.md`
- Codex instructions: `AGENTS.md`
- Codex skill: `.codex/skills/soundhealing-owner-ops/`
- Codex agent prompts: `.codex/agents/`
- Intake brief: `docs/NON_TECH_PRODUCT_OWNER_BRIEF.md`
- Recipes: `docs/CODEX_WORKFLOWS.md`
- Skill contracts: `docs/CODEX_SKILL_BLUEPRINTS.md`
- Agent templates: `docs/CODEX_AGENT_TEMPLATES.md`
- Release gates: `docs/RELEASE_CHECKLIST.md`
