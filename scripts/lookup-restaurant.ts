/**
 * Looks up a restaurant using the Google Places API (New) — returning name, formatted address,
 * phone, website, rating, business status, opening hours, and coordinates in one call, instead
 * of pasting Google Maps listing text by hand.
 *
 * Setup: the same GOOGLE_MAPS_API_KEY in .env needs the "Places API (New)" enabled
 * (https://console.cloud.google.com/google/maps-apis/credentials), in addition to the
 * Geocoding API used by scripts/geocode.ts.
 *
 * Usage:
 *   npm run lookup -- "Chipotle Mexican Grill, 4953 Centre Pointe Dr, North Charleston SC"
 *   npm run lookup -- "https://maps.app.goo.gl/..."  (paste a Google Maps share link directly)
 *   npm run lookup -- --id ChIJ...   (fetch full details for a known Google Place ID)
 *
 * A text search can return several candidates (Google may return more when biased near a share
 * link's coordinates); the script prints all of them plus full details for the top match, along
 * with a ready-to-edit restaurants.ts entry fragment, so you can confirm it's the right location
 * before pasting coordinates and details into the data file.
 */
import { requireGoogleMapsApiKey } from './lib/env.ts';

const SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const DETAILS_URL = 'https://places.googleapis.com/v1/places';

const SEARCH_FIELD_MASK = [
	'places.id',
	'places.displayName',
	'places.formattedAddress',
	'places.location',
	'places.nationalPhoneNumber',
	'places.websiteUri',
	'places.rating',
	'places.userRatingCount',
	'places.currentOpeningHours',
	'places.businessStatus',
	'places.primaryTypeDisplayName'
].join(',');

const DETAILS_FIELD_MASK = SEARCH_FIELD_MASK.replace(/places\./g, '');

async function main() {
	const apiKey = requireGoogleMapsApiKey();
	const args = process.argv.slice(2);

	if (args[0] === '--id') {
		const placeId = args[1];
		if (!placeId) {
			console.error('Usage: npm run lookup -- --id <googlePlaceId>');
			process.exit(1);
		}
		const place = await getPlaceDetails(placeId, apiKey);
		printPlaceDetails(place);
		return;
	}

	const rawArg = args.join(' ').trim();
	if (!rawArg) {
		console.error('Usage: npm run lookup -- "<restaurant name and city>"');
		console.error('       npm run lookup -- <google maps share link>');
		console.error('       npm run lookup -- --id <googlePlaceId>');
		process.exit(1);
	}

	const query = /^https?:\/\//.test(rawArg) ? await resolveMapsLink(rawArg) : rawArg;

	const results = await searchText(query.text, apiKey, query.locationBias);
	if (results.length === 0) {
		console.error(`No results found for: ${query.text}`);
		process.exit(1);
	}

	console.log(`Found ${results.length} match(es):\n`);
	results.forEach((place, index) => {
		console.log(`${index + 1}. ${place.displayName?.text} — ${place.formattedAddress}`);
	});

	console.log(`\nTop match details:\n`);
	printPlaceDetails(results[0]);

	if (results.length > 1) {
		console.log(
			`\nNot the right one? Re-run with: npm run lookup -- --id ${results[1]?.id} (etc. for other matches above)`
		);
	}
}

main();

type Place = {
	id: string;
	displayName?: { text: string };
	formattedAddress?: string;
	location?: { latitude: number; longitude: number };
	nationalPhoneNumber?: string;
	websiteUri?: string;
	rating?: number;
	userRatingCount?: number;
	currentOpeningHours?: { weekdayDescriptions?: string[] };
	businessStatus?: string;
	primaryTypeDisplayName?: { text: string };
};

/** Searches Google Places (New) by free-text query (name + city works well). Optionally biases
 * results toward a coordinate (e.g. one extracted from a resolved Google Maps share link). */
async function searchText(
	query: string,
	apiKey: string,
	locationBias?: { latitude: number; longitude: number }
): Promise<Place[]> {
	const body: Record<string, unknown> = { textQuery: query };
	if (locationBias) {
		body.locationBias = {
			circle: { center: locationBias, radius: 200 }
		};
	}

	const response = await fetch(SEARCH_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': apiKey,
			'X-Goog-FieldMask': SEARCH_FIELD_MASK
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Places API search failed: ${response.status} ${response.statusText}\n${body}`);
	}

	const data = (await response.json()) as { places?: Place[] };
	return data.places ?? [];
}

/** Follows a Google Maps share link (e.g. https://maps.app.goo.gl/...) to its resolved URL and
 * extracts the place name and coordinates embedded in it, for use as a precise search query. */
async function resolveMapsLink(
	url: string
): Promise<{ text: string; locationBias?: { latitude: number; longitude: number } }> {
	const response = await fetch(url, { redirect: 'follow' });
	const resolvedUrl = response.url;
	// Google Maps stops the response body from being needed; just read the final URL.
	await response.text().catch(() => undefined);

	const nameMatch = resolvedUrl.match(/\/place\/([^/]+)\//);
	const name = nameMatch ? decodeURIComponent(nameMatch[1]).replace(/\+/g, ' ') : '';

	const coordsMatch = resolvedUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
	const locationBias = coordsMatch
		? { latitude: Number(coordsMatch[1]), longitude: Number(coordsMatch[2]) }
		: undefined;

	if (!name) {
		throw new Error(`Could not extract a place name from resolved URL: ${resolvedUrl}`);
	}

	return { text: name, locationBias };
}

/** Fetches full details for a specific Google Place ID (e.g. copied from a Google Maps URL). */
async function getPlaceDetails(placeId: string, apiKey: string): Promise<Place> {
	const response = await fetch(`${DETAILS_URL}/${placeId}`, {
		headers: {
			'X-Goog-Api-Key': apiKey,
			'X-Goog-FieldMask': DETAILS_FIELD_MASK
		}
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Places API details failed: ${response.status} ${response.statusText}\n${body}`);
	}

	return (await response.json()) as Place;
}

/** Prints a place's details plus a ready-to-edit restaurants.ts entry fragment. */
function printPlaceDetails(place: Place) {
	const name = place.displayName?.text ?? 'Unknown';
	const address = place.formattedAddress ?? '(no address)';
	const phone = place.nationalPhoneNumber ?? '';
	const website = place.websiteUri ?? '';
	const rating = place.rating;
	const lat = place.location?.latitude;
	const lng = place.location?.longitude;
	const status = place.businessStatus;
	const hours = place.currentOpeningHours?.weekdayDescriptions ?? [];

	console.log(`Name:      ${name}`);
	console.log(`Address:   ${address}`);
	console.log(`Phone:     ${phone || '(none listed)'}`);
	console.log(`Website:   ${website || '(none listed)'}`);
	console.log(`Rating:    ${rating ? `${rating} (${place.userRatingCount} reviews)` : '(none)'}`);
	console.log(`Status:    ${status ?? '(unknown)'}`);
	console.log(`Coords:    ${lat}, ${lng}`);
	console.log(`Place ID:  ${place.id}`);
	if (hours.length > 0) {
		console.log(`Hours:`);
		for (const line of hours) console.log(`  ${line}`);
	}

	const slug = slugify(name, address);
	const neighborhood = guessNeighborhood(address);

	console.log(`\n--- Suggested restaurants.ts entry (review/adjust before pasting) ---\n`);
	console.log(`	{
		slug: '${slug}',
		name: ${JSON.stringify(name)},
		neighborhood: '${neighborhood}',
		address: '${address.replace(', USA', '')}',${phone ? `\n\t\tphone: '${phone}',` : ''}${rating ? `\n\t\trating: ${rating},` : ''}
		type: 'Fast casual', // TODO: confirm (Sit-down / Fast casual / Cafe / Bakery / Fast food / Dessert)
		cuisineSummary: '', // TODO
		summary: '', // TODO
		meals: ['Lunch', 'Dinner'],
		latitude: ${lat},
		longitude: ${lng},
		resources: [${website ? `\n\t\t\t{ label: 'Website', href: '${website}', kind: 'website' }\n\t\t` : ''}],
		quotes: [],
		notes: [] // TODO: add a note constant referencing how this was sourced
	},`);
}

/** Builds a kebab-case slug from a name and address (last non-empty word of the street line). */
function slugify(name: string, address: string): string {
	const streetLine = address.split(',')[0] ?? '';
	const streetSlug = streetLine
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	const nameSlug = name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return `${nameSlug}-${streetSlug}`.replace(/-+/g, '-');
}

/** Best-effort neighborhood guess: the city segment of a "street, city, state zip, country" address. */
function guessNeighborhood(address: string): string {
	const parts = address.split(',').map((part) => part.trim());
	return parts.length >= 2 ? parts[1] : '';
}
