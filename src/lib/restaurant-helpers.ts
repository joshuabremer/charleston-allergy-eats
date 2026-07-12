import { researchDump } from '$lib/data/research-dump';
import { restaurants } from '$lib/data/restaurants';

export function getRestaurantBySlug(slug: string) {
	return restaurants.find((restaurant) => restaurant.slug === slug) ?? null;
}

export function getResearchEntriesForRestaurant(slug: string) {
	return researchDump.filter((entry) => entry.restaurantSlug === slug);
}

export function getInboxResearchEntries() {
	return researchDump.filter((entry) => !entry.restaurantSlug);
}
