# Codex Skill Blueprints

Operational blueprint for reusing Codex workflows in this repo and future carbon-copy projects.

## 1) Role-oriented skill set

| Role | Primary skill bundle | Inputs they must provide | Outputs they own | Mandatory checks |
| --- | --- | --- | --- | --- |
| Owner (non-technical) | **Request Framing + Approval** | business goal, exact copy/image, priority, deadline | approved request brief, sign-off decision | `npm run lint && npm run check` must be green before approval |
| UX designer | **UX Spec + Visual QA** | route, style intent, component/token references, expected visual result | UX change brief, visual acceptance notes, styleguide impact | `npm run lint && npm run check`; run visual confirmation in `npm run dev` |
| Fullstack developer | **Implementation + Technical QA** | scoped plan, files to change, constraints, rollback note | code/doc changes, validation output, updated comparison log when required | `npm run lint && npm run check`; add targeted tests/checks as needed (`test:unit`, `build`, `perf:budget:enforce`) |
| Release manager | **Gatekeeping + Release Readiness** | change summary, risk level, validation evidence, affected protected areas | release decision, rollout/rollback note, completed `docs/RELEASE_CHECKLIST.md` | at minimum `npm run ci:check` for release candidates; verify `COMPARISON.md` when SEO/perf changed |

### Role handoff protocol

1. Owner/UX supplies a complete request brief.
2. Fullstack executes and returns evidence.
3. Release manager validates gates and signs off deployment readiness.

## 2) Skill contract schema (copy/paste template)

Use this schema for every Codex task request:

```yaml
skill_contract:
  name: "<short-task-name>"
  role: "<owner|ux|fullstack|release-manager>"
  goal: "<single measurable outcome>"
  inputs:
    required:
      - "<business or UX requirement>"
      - "<target route/file>"
      - "<constraints (no scope creep, no unrelated edits)>"
    optional:
      - "<assets, screenshots, copy blocks>"
      - "<deadline or release window>"
  outputs:
    files_changed:
      - "<explicit file paths>"
    behavior_delta:
      - "<what changed for users>"
    evidence:
      - "<command output summary>"
  acceptance_checks:
    - "npm run lint && npm run check"
    - "<extra checks if feature/risk requires them>"
  safety_rails:
    - "Do not modify generated snapshot inputs unless task is content ingestion."
    - "Do not edit unrelated files."
    - "Update COMPARISON.md when SEO/perf-visible behavior changes."
    - "Escalate protected-area changes for review."
  done_definition: "<all acceptance checks pass and outputs are documented>"
```

## 3) Execution lifecycle

Follow this lifecycle every time:

1. **Request**  
   Capture a one-task brief using the contract schema above.
2. **Plan**  
   List exact files, commands, acceptance checks, and rollback path.
3. **Implement**  
   Apply scoped edits only in planned files.
4. **Validate**  
   Run required checks (`npm run lint && npm run check`) plus risk-based checks.
5. **Compare log**  
   If SEO/performance/content parity changed, update `COMPARISON.md`.
6. **Commit**  
   Commit only validated changes with a clear message and attached evidence.

## 4) Mapping to this repo's scripts/tests/checks

| Lifecycle stage | Repo command/check | Use when | Pass criteria |
| --- | --- | --- | --- |
| Plan baseline | `npm run setup` | local onboarding or refreshed source migration needed | migration + `check` succeed |
| Validate (mandatory) | `npm run lint && npm run check` | every Codex task | no lint or Svelte/TS diagnostics |
| Feature validation | `npm run test:unit` | logic or component behavior changed | all unit tests pass |
| Build validation | `npm run build` | layout/content/rendering changes | static build succeeds |
| Script integrity | `npm run test:smoke` | script/tooling changes in `scripts/` | smoke tests pass |
| Perf gate | `npm run perf:budget:enforce` | asset, CSS, or rendering payload changes | no budget exceeded |
| Release gate | `npm run ci:check` | release-ready validation | all CI checks pass |
| Compare logging | `COMPARISON.md` update | SEO/perf parity-impacting changes | comparison row updated with current run |

## 5) Protected areas and safety rails

Protected files requiring explicit review:

- `scripts/migrate-snapshot.mjs`
- `scripts/perf-budget.mjs`
- `src/routes/+layout.svelte`
- `COMPARISON.md` baseline-critical rows

If a task touches protected areas, require release-manager review before deployment.
