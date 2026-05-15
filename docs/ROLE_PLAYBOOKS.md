# Role Playbooks

## Fullstack developer

1. Run setup: `npm install && npm run setup`
2. Build context: read `docs/ARCHITECTURE.md`
3. Work loop: `npm run dev`, implement, run quality gates
4. Before merge: run `npm run ci:check` and update `COMPARISON.md` if relevant

## UX designer

1. Use `/styleguide` as the visual language source
2. Request token or component updates through Codex with explicit visual intent
3. Validate changes locally with `npm run dev`
4. Confirm visual parity on critical pages before release

## Non-technical owner using Codex CLI

1. Pick a task recipe in `docs/CODEX_WORKFLOWS.md`
2. Ask Codex with plain language goal + exact text/image you want changed
3. Require Codex to run checks before finalizing
4. Review preview and approve only if the page looks right and comparison data is updated when needed
