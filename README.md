# Sound Healing Festival Stockholm — SvelteKit Migration

This project migrates the saved Wix snapshot into a static SvelteKit site while stripping runtime artifacts from the source export.

## Source inputs

- `Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html`
- `Sound Healing Evening Stockholm Sweden, 15 Februar 2026_files/`

## Migration workflow

```sh
npm install
npm run migrate:source
```

`migrate:source` does the following:

1. Removes Wix runtime scripts, DarkReader/browser-extension artifacts, and cookie banner markup from the saved HTML.
2. Extracts remaining style tags into `src/lib/content/wix.css`.
3. Writes cleaned page markup to `src/lib/content/home.html`.
4. Extracts key SEO tags into `src/lib/content/seo.ts`.
5. Copies only media assets (images/icons) into `static/assets/`.

## Development

```sh
npm run dev
```

## Quality checks

```sh
npm run format
npm run lint
npm run check
npm run build
```

## Build output

The project uses `@sveltejs/adapter-static` and prerendering for a static deploy target.

## Comparison tracking

Use `COMPARISON.md` as the single source of truth for old-vs-new parity.  
It must be updated on every relevant change and each new comparison run.
