# Non-Technical Product Owner Brief

Use `START_HERE.md` for daily requests. Use this longer brief when drafting website changes that need more context, approval, or consultant review.

Default Codex instruction:

```text
Use $soundhealing-owner-ops.
```

Codex execution rules live in `AGENTS.md` and `.codex/skills/soundhealing-owner-ops/SKILL.md`.

## 1) Request template (copy/paste)

```text
Business goal:
What should change:
What must not change:
Where on the site:
Priority:
Definition of done:
```

## 2) Good examples

### Content update

```text
Business goal: Clarify event timing.
What should change: Replace the hero subtext with: "February 21, 2027 at Skeppsholmen Church."
What must not change: Existing layout, colors, and SEO metadata.
Where on the site: Homepage hero section.
Priority: High.
Definition of done: New text is visible, no layout shift, lint/check/build pass.
```

### Design update

```text
Business goal: Improve CTA visibility.
What should change: Make the main CTA button more prominent using existing token system.
What must not change: Brand palette and typography style.
Where on the site: Homepage CTA block.
Priority: Medium.
Definition of done: CTA has stronger contrast and visual hierarchy; visual/e2e checks pass.
```

## 3) What Codex should return

- Scoped summary of the request.
- Assumptions that affect the result.
- Files changed.
- Checks run and whether they passed.
- Request-log ID and final status.
- Any owner verification still needed.

## 4) “Do not proceed” triggers

If any of these are true, AI must stop and ask for clarification:

- request conflicts with “what must not change”
- affected page/section is unknown
- success criteria are missing
- protected-file or release risk is reported by Codex

## 5) Large-change commit policy

For any non-trivial change, ask Codex or the consultant to commit in logical, reversible slices using the request ID. Detailed commit rules live in `AGENTS.md`.
