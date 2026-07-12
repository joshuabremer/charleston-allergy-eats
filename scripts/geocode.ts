/**
 * Geocodes street addresses using the Google Geocoding API, which handles suite/unit numbers
 * and shopping-center-style addresses far more reliably than free alternatives (Nominatim
 * returned "no result" for ~1 in 5 addresses in this project). Replaces the previous workflow
 * of asking an AI web-search tool for coordinates, which was slow, costly, and produced several
 * inaccurate results.
 *
 * Setup: copy .env.example to .env and set GOOGLE_MAPS_API_KEY to a key with the Geocoding API
 * enabled (https://console.cloud.google.com/google/maps-apis/credentials).
 *
 * Usage:
 *   npm run geocode -- "1205 Ashley River Rd, Charleston, SC 29407"
 *   npm run geocode -- --verify
 *
 * "--verify" re-geocodes every address already in src/lib/data/restaurants.ts and reports any
 * entry whose stored latitude/longitude is more than half a mile from the freshly geocoded
 * result, so mistakes can be caught and fixed.
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const RESTAURANTS_FILE = fileURLToPath(
	new URL('../src/lib/data/restaurants.ts', import.meta.url)
);
const ENV_FILE = fileURLToPath(new URL('../.env', import.meta.url));
const VERIFY_FLAG_MILES = 0.5;
const REQUEST_DELAY_MS = 100;

async function main() {
	loadEnvFile();
	const apiKey = process.env.GOOGLE_MAPS_API_KEY;
	if (!apiKey) {
		console.error(
			'Missing GOOGLE_MAPS_API_KEY. Copy .env.example to .env and set your Google Geocoding API key.'
		);
		process.exit(1);
	}

	const args = process.argv.slice(2);

	if (args[0] === '--verify') {
		await verifyExistingCoordinates(apiKey);
		return;
	}

	const address = args.join(' ').trim();
	if (!address) {
		console.error('Usage: npm run geocode -- "<address>"');
		console.error('       npm run geocode -- --verify');
		process.exit(1);
	}

	const result = await geocodeAddress(address, apiKey);
	if (!result) {
		console.error(`No geocoding result found for: ${address}`);
		process.exit(1);
	}
	console.log(`${result.latitude}, ${result.longitude}  (${result.formattedAddress})`);
}

main();

type GeocodeResult = {
	latitude: number;
	longitude: number;
	formattedAddress: string;
};

/** Reads KEY=VALUE pairs from .env (if present) into process.env, without overwriting existing values. */
function loadEnvFile() {
	if (!existsSync(ENV_FILE)) return;

	const lines = readFileSync(ENV_FILE, 'utf8').split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const equalsIndex = trimmed.indexOf('=');
		if (equalsIndex === -1) continue;

		const key = trimmed.slice(0, equalsIndex).trim();
		const value = trimmed.slice(equalsIndex + 1).trim().replace(/^['"]|['"]$/g, '');
		if (key && process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}

/** Queries the Google Geocoding API for a single address and returns the best-guess coordinates. */
async function geocodeAddress(address: string, apiKey: string): Promise<GeocodeResult | null> {
	const url = new URL(GEOCODE_URL);
	url.searchParams.set('address', address);
	url.searchParams.set('key', apiKey);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Google Geocoding request failed: ${response.status} ${response.statusText}`);
	}

	const body = (await response.json()) as {
		status: string;
		error_message?: string;
		results: Array<{
			formatted_address: string;
			geometry: { location: { lat: number; lng: number } };
		}>;
	};

	if (body.status === 'ZERO_RESULTS') return null;
	if (body.status !== 'OK') {
		throw new Error(`Google Geocoding error: ${body.status} ${body.error_message ?? ''}`.trim());
	}

	const [best] = body.results;
	return {
		latitude: best.geometry.location.lat,
		longitude: best.geometry.location.lng,
		formattedAddress: best.formatted_address
	};
}

/** Extracts { slug, address, latitude, longitude } entries out of restaurants.ts via regex. */
function parseRestaurantEntries(): Array<{
	slug: string;
	address: string;
	latitude: number;
	longitude: number;
}> {
	const source = readFileSync(RESTAURANTS_FILE, 'utf8');
	const entryPattern =
		/slug: '([^']+)'[\s\S]*?address: '([^']+)'[\s\S]*?latitude: (-?[\d.]+),\s*longitude: (-?[\d.]+)/g;

	const entries: Array<{ slug: string; address: string; latitude: number; longitude: number }> = [];
	for (const match of source.matchAll(entryPattern)) {
		const [, slug, address, latitude, longitude] = match;
		entries.push({ slug, address, latitude: Number(latitude), longitude: Number(longitude) });
	}
	return entries;
}

/** Great-circle distance between two coordinates, in miles. */
function distanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const EARTH_RADIUS_MILES = 3958.8;
	const toRad = (deg: number) => (deg * Math.PI) / 180;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
	return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Re-geocodes every restaurant address and flags entries far from their stored coordinates. */
async function verifyExistingCoordinates(apiKey: string) {
	const entries = parseRestaurantEntries();
	console.log(`Checking ${entries.length} restaurant addresses against Google Geocoding...\n`);

	const mismatches: string[] = [];
	for (const entry of entries) {
		const result = await geocodeAddress(entry.address, apiKey);
		if (!result) {
			console.log(`⚠️  ${entry.slug}: no geocoding result for "${entry.address}"`);
			mismatches.push(entry.slug);
			await sleep(REQUEST_DELAY_MS);
			continue;
		}

		const miles = distanceInMiles(entry.latitude, entry.longitude, result.latitude, result.longitude);
		if (miles > VERIFY_FLAG_MILES) {
			console.log(
				`❌ ${entry.slug}: stored (${entry.latitude}, ${entry.longitude}) is ${miles.toFixed(
					2
				)} mi from geocoded (${result.latitude}, ${result.longitude}) for "${entry.address}"`
			);
			mismatches.push(entry.slug);
		} else {
			console.log(`✅ ${entry.slug}: within ${miles.toFixed(2)} mi`);
		}

		await sleep(REQUEST_DELAY_MS);
	}

	console.log(`\n${mismatches.length} of ${entries.length} entries need a closer look.`);
	if (mismatches.length > 0) {
		console.log(mismatches.join(', '));
	}
}
