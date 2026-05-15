# Request Intake Template

For a non-technical owner: fill the short brief first, then hand to AI.

## Owner brief (plain language)
- Outcome wanted:
- What must stay unchanged:
- Deadline / urgency:
- Who asked:

## AI handoff payload (schema-aligned)
```json
{
  "request_id": "REQ-YYYYMMDD-001",
  "requested_by_role": "non-tech-owner",
  "request_text_verbatim": "Paste the exact request text here.",
  "must_not_change": ["Brand voice", "Published ticket prices"],
  "assumptions": ["No backend changes unless requested"],
  "scope_targets": ["src/routes/+page.svelte", "docs/request-log/requests/REQ-YYYYMMDD-001.md"],
  "status": "attempted",
  "checks_run": [],
  "commits": [],
  "rollback_reference": null,
  "escalation_notes": ["Initial intake created; waiting for execution update."],
  "timestamps": {
    "opened_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ",
    "closed_at": null
  }
}
```
