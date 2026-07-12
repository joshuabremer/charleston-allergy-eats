# Charleston Allergy Eats Copilot Instructions

## Project shape

- This is a static SvelteKit site (`@sveltejs/adapter-static`, `prerender = true`) with no server/API — there is no in-app editing UI. All data edits happen by modifying the git-tracked data files (via Copilot or by hand), then committing/pushing.
- Deployed to GitHub Pages under the `/charleston-allergy-eats` base path via `.github/workflows/deploy-pages.yml` on every push to `main`. Any new internal link (`<a href>`, `goto()`, etc.) must be prefixed with SvelteKit's `base` from `$app/paths` — plain `/restaurants/...` or `/` hrefs will 404 once deployed under the subpath.
- `reviewReadOnly` is hardcoded `true` in `+page.server.ts` and `restaurants/[slug]/+page.server.ts` and will never be `false`. Do not add UI gated on `!data.reviewReadOnly` — it is dead code by construction.
- Default homepage sort is distance from the user's current location (geolocation), falling back to alphabetical if location is denied/unavailable.

## Data organization

- `src/lib/data/restaurants.ts` is the curated restaurant list shown in the app (name, address, phone, coordinates, resources/links, quotes, `menuFlags`, notes).
- `src/lib/data/imported/restaurant-decisions.json` maps a restaurant `slug` to a decision state; a slug with no entry defaults to `ready-to-review`.
- `data/user-reviews.json` is git-tracked shared state for personal tags/comments/rejection notes, keyed by slug — treat it as durable, not disposable runtime state.
- `data/raw/charleston-2026/` stores raw pasted source material (Google listings, full menu text extracted from PDFs, etc.) before it's distilled into `restaurants.ts`. Keep one raw file per restaurant/menu import so the original source is always recoverable.
- `src/lib/data/research-dump.ts` exists as an inbox for not-yet-curated notes/links/quotes, matching the Chicago project's pattern — it's intentional infrastructure, not unused cruft, even while empty.

## Curation workflow

- When the user pastes a new restaurant listing/menu, save the raw text under `data/raw/charleston-2026/` first, then add a curated entry to `restaurants.ts` starting at `ready-to-review`.
- Only flip a restaurant to `approved` when the user explicitly says so (e.g. "X is approved").
- Do not add restaurants to the curated list unless the user provides them or explicitly asks.

## Decision state model

- States: `ready-to-review`, `needs-more-info`, `awaiting-restaurant-response`, `approved`, `rejected`. There is no separate research-tag taxonomy — it was removed as cruft.
- `ready-to-review` renders with a "❓" map marker; `approved` renders with a "✅" map marker; other states use a colored dot.
- Preserve rejection reasons when the user supplies them.

## Allergy scope

- For this project, do not treat peanuts or almonds as allergy red flags.

## Menu analysis conventions

- Menu links live in the main resource/links section alongside other links (Website, Order, etc.).
- Curated menu analysis goes in a separate "Menu analysis" section (`menuFlags` on the relevant resource) rather than mixed into general review evidence or quotes.
- Use `✅` for green flags, `⚠️` for yellow flags, and `🚩` for red flags. Keep notes menu-specific and focused on the current allergy scope, not generic allergen disclaimers.

## Detail page

- No freeform "Notes" section on the detail page — use decision state / menu analysis instead of note text.
- The detail page is read-only: no decision dropdown, no comment textarea, no reject-note form. If you find yourself adding editable UI controls, stop — this project deliberately has none.

## PDF extraction

- `pdftotext` is broken on this machine (missing `libgpgmepp.6.dylib`). Use Python's `pdfplumber` to extract text from menu PDFs instead.
