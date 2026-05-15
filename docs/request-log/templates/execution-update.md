# Execution Update Template

Use during implementation so a new AI agent (or owner) can continue fast.

## Owner-friendly update
- What changed:
- What is still pending:
- Risk or impact (if any):

## AI continuation payload (schema-aligned)
```json
{
  "request_id": "REQ-YYYYMMDD-001",
  "requested_by_role": "non-tech-owner",
  "request_text_verbatim": "Original request text (unchanged).",
  "must_not_change": ["Brand voice", "Published ticket prices"],
  "assumptions": ["No backend changes unless requested"],
  "scope_targets": ["src/routes/+page.svelte", "docs/request-log/requests/REQ-YYYYMMDD-001.md"],
  "status": "attempted",
  "checks_run": ["npm run lint"],
  "commits": ["abc1234"],
  "rollback_reference": null,
  "escalation_notes": ["Step complete: hero section copy updated; waiting for final QA."],
  "timestamps": {
    "opened_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ",
    "closed_at": null
  }
}
```
