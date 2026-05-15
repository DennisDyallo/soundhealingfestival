# Sample Request Log Entry

Use this file as a starting template for request records.

```json
{
"request_id": "REQ-XXXX",
"requested_by_role": "<role>",
"request_text_verbatim": "<paste request text exactly>",
"must_not_change": ["<constraint 1>", "<constraint 2>"],
"assumptions": ["<assumption 1>", "<assumption 2>"],
"scope_targets": ["<file-or-path-1>", "<file-or-path-2>"],
"status": "attempted",
"checks_run": ["npm run lint", "npm run check"],
"commits": ["<commit-sha-or-none>"],
"rollback_reference": null,
"escalation_notes": ["<note or empty array>"],
"timestamps": {
"opened_at": "YYYY-MM-DDTHH:MM:SSZ",
"updated_at": "YYYY-MM-DDTHH:MM:SSZ",
"closed_at": null
}
}
```
