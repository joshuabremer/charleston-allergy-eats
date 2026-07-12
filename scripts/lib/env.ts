/** Loads KEY=VALUE pairs from the project's .env file into process.env, shared by scripts/*.ts. */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ENV_FILE = fileURLToPath(new URL('../../.env', import.meta.url));

/** Reads .env (if present) into process.env, without overwriting values that are already set. */
export function loadEnvFile() {
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

/** Reads GOOGLE_MAPS_API_KEY from .env, exiting the process with a helpful message if missing. */
export function requireGoogleMapsApiKey(): string {
	loadEnvFile();
	const apiKey = process.env.GOOGLE_MAPS_API_KEY;
	if (!apiKey) {
		console.error(
			'Missing GOOGLE_MAPS_API_KEY. Copy .env.example to .env and set your Google API key.'
		);
		process.exit(1);
	}
	return apiKey;
}
