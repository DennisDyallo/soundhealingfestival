# Escalation / Handoff Template

Use when blocked, reverting, or transferring work between AI teammates.

## Owner-facing note
- Why escalation happened:
- Decision needed from owner:
- Earliest next update time:

## AI handoff payload (schema-aligned)
```json
{
  "request_id": "REQ-YYYYMMDD-001",
  "requested_by_role": "non-tech-owner",
  "request_text_verbatim": "Original request text (unchanged).",
  "must_not_change": ["Brand voice", "Published ticket prices"],
  "assumptions": ["No backend changes unless requested"],
  "scope_targets": ["src/routes/+page.svelte", "docs/request-log/requests/REQ-YYYYMMDD-001.md"],
  "status": "blocked",
  "checks_run": ["npm run lint", "npm run check"],
  "commits": ["abc1234", "def5678"],
  "rollback_reference": "git revert def5678",
  "escalation_notes": [
    "Blocker: missing final Swedish copy from owner.",
    "Next AI should resume after copy arrives and rerun npm run lint && npm run check."
  ],
  "timestamps": {
    "opened_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ",
    "closed_at": null
  }
}
```
