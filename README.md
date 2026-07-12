# Charleston Allergy Eats

A static SvelteKit site for researching Charleston-area restaurants for allergy accommodations. No backend/server — the whole app is prerendered at build time and deployed to GitHub Pages.

## What is in the app

- Restaurant list + Leaflet map, sorted by distance from your current location (falls back to alphabetical if location is denied/unavailable)
- Mobile-first swipeable card stack: the closest restaurant's overview shows at the bottom of the screen, swipe to move to the next-closest place
- Filters for restaurant type, meal, and decision state (ready to review / needs more info / awaiting response / approved / rejected)
- Read-only detail page per restaurant: links (menu/website), pulled quotes, green/yellow/red menu analysis flags, and rejection notes
- Map markers: ✅ approved, ❓ ready to review, colored dot otherwise

There is no in-app editing UI. This is a personal research tool — all data changes happen by editing the git-tracked data files directly (in Copilot or by hand), then committing/pushing. That keeps the deployed site simple, static, and free to host.

## Where the data lives

- `src/lib/data/restaurants.ts` — the curated restaurant list rendered by the app (name, address, phone, coordinates, resources/links, quotes, menu analysis flags, and freeform notes)
- `src/lib/data/imported/restaurant-decisions.json` — maps a restaurant `slug` to a decision state (`ready-to-review`, `needs-more-info`, `awaiting-restaurant-response`, `approved`, `rejected`); if a slug has no entry it defaults to `ready-to-review`
- `data/user-reviews.json` — personal tags/comments/rejection notes keyed by slug (loaded read-only at build time)
- `data/raw/charleston-2026/` — raw source material as it's pasted in (Google Maps listings, restaurant menus, PDFs converted to text) before being distilled into `restaurants.ts`

Typical workflow when adding a new restaurant:

1. Paste the listing/menu info in chat.
2. It gets saved as a raw JSON file under `data/raw/charleston-2026/`.
3. A curated entry is added to `restaurants.ts` (with a `resources`/`quotes`/`notes` summary), starting at `ready-to-review`.
4. Once reviewed, the decision is flipped to `approved` (or `rejected`, with a note) in `restaurant-decisions.json`.

## Development

```sh
npm install
npm run dev
```

## Build & typecheck

```sh
npm run check
npm run build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which builds the site with `@sveltejs/adapter-static` (using a `/charleston-allergy-eats` base path for GitHub Pages' project-page subpath hosting) and publishes it via GitHub Pages. No manual deploy steps are needed — every push to `main` redeploys automatically.

To preview a production build locally with the same base path GitHub Pages will use:

```sh
BASE_PATH=/charleston-allergy-eats npm run build
npm run preview
```
