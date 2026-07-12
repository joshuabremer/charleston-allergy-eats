// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.geojson' {
	const value: {
		name: string;
		features: Array<{
			properties: {
				Name: string;
			};
			geometry: {
				coordinates: [number, number, number?];
			};
		}>;
	};

	export default value;
}

export {};
