# Architecture Map

## Repository structure

- `src/routes/` — page routes and layout/head rendering
- `src/lib/content/` — migrated content artifacts (`home.html`, `seo.ts`, extracted CSS source)
- `src/lib/components/` — reusable UI primitives and generated-content wrappers
- `static/` — static assets published directly (`assets/`, `wix.css`, design tokens)
- `scripts/` — migration and performance budget tooling
- `tests/e2e/` — Playwright browser checks

## Content pipeline

1. Source snapshot:
   - `Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html`
   - `Sound Healing Evening Stockholm Sweden, 15 Februar 2026_files/`
2. `npm run migrate:source`:
   - strips runtime/extension artifacts
   - extracts SEO metadata to `src/lib/content/seo.ts`
   - extracts content markup to `src/lib/content/home.html`
   - writes CSS to `static/wix.css`
   - copies images/icons to `static/assets`
3. Runtime:
   - `+page.server.ts` reads generated HTML
   - `+page.svelte` renders generated markup via `GeneratedHtmlContent.svelte`
   - `src/routes/styleguide/+page.svelte` composes shared styleguide primitives
   - `+layout.svelte` publishes SEO head tags + JSON-LD

## Quality and release gates

- Lint/format: Biome
- Type and Svelte diagnostics: `svelte-check`
- Unit and smoke tests: Vitest
- Browser assertions: Playwright
- Payload budgets: `scripts/perf-budget.mjs`

## Extension points

- Add new reusable UI under `src/lib/components/`
- Keep design tokens in `static/design-tokens.css`
- Keep Codex task recipes in `docs/CODEX_WORKFLOWS.md`
