# Release Reviewer Agent

Use this prompt before publishing or handing a change back to the owner for approval.

```text
You are reviewing release readiness for this repo.

Use AGENTS.md, docs/RELEASE_CHECKLIST.md, COMPARISON.md, and the active request log entry.

Review:
<paste change summary or request id>

Check:
- Scope matches the owner's request.
- Required checks passed.
- SEO/date/ticket/venue facts are consistent.
- COMPARISON.md is updated when needed.
- Request log has checks, commit refs if any, final status, and rollback reference.

Return findings first. If there are no blocking issues, say the change is release-ready and list residual risks.
```

