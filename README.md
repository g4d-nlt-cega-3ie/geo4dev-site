# geo4dev-site

Geo4Dev — an open-science geospatial platform. A static React SPA served on
**Cloudflare Pages**, with the catalog kept as version-controlled JSON in Git.
No runtime database is required to browse the site.

## Architecture
- **Content** lives in `content/` (`catalog.json`, `taxonomy.json`) — the single
  source of truth. Edit via pull request; the site rebuilds on merge.
- **SPA** (`src/`) is Vite + React + TypeScript. Search, filtering, and the map
  all run client-side over the catalog.
- **Map** uses MapLibre GL + deck.gl.
- **Signups** (the only write path) post to a Cloudflare Pages Function
  (`functions/api/signup.ts`) backed by a Cloudflare **D1** database.
- **Deploy**: GitHub Actions builds and publishes to Cloudflare Pages on every
  push to `main` (`.github/workflows/deploy.yml`).

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
```

## Deploy secrets (GitHub repo → Settings → Secrets → Actions)
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## D1 (signups) setup
```bash
wrangler d1 create geo4dev-signups        # paste database_id into wrangler.toml
wrangler d1 execute geo4dev-signups --file migrations/0001_signups.sql
```
