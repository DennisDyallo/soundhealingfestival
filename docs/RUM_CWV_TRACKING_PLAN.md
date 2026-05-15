# RUM + Core Web Vitals Tracking Plan

This plan defines production-ready Real User Monitoring (RUM) for this static Svelte deployment and future carbon-copy sites.

## 1) Metrics to collect and thresholds

Track per page path + device class + country (optional) using p75 as the primary KPI.

| Metric | What it indicates | Good | Needs improvement | Poor |
| --- | --- | ---: | ---: | ---: |
| LCP | Main content render speed | <= 2.5s | 2.5s - 4.0s | > 4.0s |
| CLS | Visual stability | <= 0.10 | 0.10 - 0.25 | > 0.25 |
| INP | Interaction responsiveness | <= 200ms | 200ms - 500ms | > 500ms |
| TTFB | Initial server response | <= 800ms | 800ms - 1800ms | > 1800ms |
| FCP | First paint timing | <= 1.8s | 1.8s - 3.0s | > 3.0s |

Operational targets:
- Keep p75 in the **Good** bucket for all metrics on mobile traffic.
- Trigger investigation if p75 worsens >10% week-over-week or enters Needs Improvement/Poor.

## 2) Collection approach options (privacy-safe, vendor-neutral first)

### Option A (recommended): First-party endpoint + `web-vitals`

Use `web-vitals` in browser, send sampled events with `navigator.sendBeacon` to a first-party ingestion endpoint.

Why this is the default:
- Vendor-neutral and portable across hosting providers.
- Privacy-safe by default (no cookies, no PII, short retention).
- Reusable for carbon-copy site rollouts.

Data policy:
- Do **not** collect IP, full user-agent strings, names, emails, query params, or custom PII.
- Store only: metric name/value, rating, page path, anonymized session id, release id, timestamp, viewport bucket.
- Retain raw events max 30-90 days; keep aggregated p75 trend data longer.

Suggested payload shape:

```json
{
  "site": "soundhealingfestivalstockholm.com",
  "release": "git-sha-or-date",
  "metric": "LCP",
  "value": 1820,
  "rating": "good",
  "path": "/",
  "device": "mobile",
  "viewport": "390x844",
  "sampleRate": 0.25,
  "ts": "2026-05-15T10:05:00.000Z"
}
```

### Option B: Privacy analytics vendor (fallback)

If first-party ingestion is not available yet, use a privacy-focused analytics vendor that supports Web Vitals (or custom events) and EU hosting.

Requirements for vendor selection:
- No ad-tech tracking and no third-party cookies.
- Data export API or CSV for parity reporting.
- Metric-level p75 dashboards and alerting.

## 3) Integration points for this project

Use these project locations for implementation:

1. `src/lib/rum/webVitals.ts`
   - Encapsulate metric collection (`onLCP`, `onCLS`, `onINP`, `onTTFB`, `onFCP`).
   - Add sampling and payload normalization.

2. `src/routes/+layout.svelte`
   - Initialize RUM in `onMount` so tracking runs once on client.
   - Attach release metadata (commit SHA/date from env).

3. `static/` / deployment config
   - Add a first-party ingestion route via host platform:
     - Cloudflare Worker, Netlify Function, Vercel Function, or equivalent.
   - Endpoint example: `POST /api/rum`.

4. Existing quality workflow links
   - `scripts/perf-budget.mjs` remains synthetic guardrail.
   - RUM is the real-user complement and should be reviewed during release checks.

Implementation notes:
- Use `sendBeacon` first, fallback to `fetch(..., { keepalive: true })`.
- Start at 25% sampling in production; raise/lower based on traffic volume.
- De-duplicate repeated metric sends per page view.

## 4) Rollout stages

### Stage 0: Local
- Add collector module + logging mode (`console.table`) without network sending.
- Validate metrics emit on route load and interaction.
- Confirm no errors in dev console.

Exit criteria:
- Metrics are captured for all 5 targets locally.
- No impact on hydration/runtime behavior.

### Stage 1: Staging
- Enable real sending to staging endpoint/storage.
- Verify schema, sampling, and aggregation queries (daily p75 by path/device).
- Test ad-blocker/browser limitations and beacon fallback.

Exit criteria:
- 24h of clean staging data.
- Dashboard shows p75 for LCP/CLS/INP/TTFB/FCP.

### Stage 2: Production
- Enable production endpoint + dashboard + alerts.
- Start with 25% sample rate, adjust after first week.
- Include release identifier in each event.

Exit criteria:
- Alerts active.
- Weekly trend report includes p75 movement and regressions by page.

## 5) Alerting and regression handling (must link COMPARISON.md)

Create alerts on rolling 24h p75 per key path (at least `/`):
- Warning: enters Needs Improvement for any metric.
- Critical: enters Poor for any metric or worsens >20% vs previous 7-day baseline.

Regression playbook:
1. Triage within 1 business day.
2. Correlate with latest release and changed files.
3. Re-run synthetic checks (`npm run build && npm run perf:budget && npm run check`).
4. Implement fix and confirm recovery in RUM trend.
5. Update `COMPARISON.md` with:
   - A new **Change Log** row referencing the performance regression/fix.
   - A new **Comparison Runs** row with before/after p75 evidence source.

## 6) Carbon-copy workflow template

For each cloned deployment, keep this same pattern:
- Reuse `src/lib/rum/webVitals.ts` module.
- Set `site` and `release` metadata per project.
- Point to each site's own first-party `/api/rum` endpoint.
- Keep thresholds identical unless business context requires stricter targets.

Minimum go-live checklist:
- [ ] Local emit verified
- [ ] Staging ingestion validated
- [ ] Production alerts enabled
- [ ] `COMPARISON.md` workflow integrated for regressions
