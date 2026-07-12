import { browser } from '$app/environment';

const EARTH_RADIUS_MILES = 3958.8;

/** Great-circle distance between two lat/lng points, in miles. */
export function distanceInMiles(
	fromLatitude: number,
	fromLongitude: number,
	toLatitude: number,
	toLongitude: number
): number {
	const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
	const deltaLatitude = toRadians(toLatitude - fromLatitude);
	const deltaLongitude = toRadians(toLongitude - fromLongitude);
	const a =
		Math.sin(deltaLatitude / 2) ** 2 +
		Math.cos(toRadians(fromLatitude)) * Math.cos(toRadians(toLatitude)) * Math.sin(deltaLongitude / 2) ** 2;

	return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a));
}

export type GeoStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable';

/**
 * Shared browser geolocation store used by the map and the distance-sorted
 * restaurant list/card stack, so there is a single geolocation watcher.
 */
class GeoStore {
	latitude = $state<number | null>(null);
	longitude = $state<number | null>(null);
	status = $state<GeoStatus>('idle');
	private watchId: number | null = null;

	get position(): [number, number] | null {
		return this.latitude !== null && this.longitude !== null ? [this.latitude, this.longitude] : null;
	}

	/** Start watching the user's position. Safe to call multiple times. */
	start() {
		if (!browser || !navigator.geolocation) {
			this.status = 'unavailable';
			return;
		}

		if (this.watchId !== null) {
			return;
		}

		this.status = 'requesting';
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.status = 'granted';
			},
			(error) => {
				console.warn('Unable to read current location.', error);
				this.status = 'denied';
			},
			{
				enableHighAccuracy: true,
				maximumAge: 60_000,
				timeout: 10_000
			}
		);
	}

	stop() {
		if (browser && this.watchId !== null) {
			navigator.geolocation.clearWatch(this.watchId);
		}

		this.watchId = null;
	}

	/** Distance in miles from the current position to a place, or null if unknown. */
	distanceTo(latitude: number, longitude: number): number | null {
		if (!this.position) {
			return null;
		}

		return distanceInMiles(this.position[0], this.position[1], latitude, longitude);
	}
}

export const geoStore = new GeoStore();
