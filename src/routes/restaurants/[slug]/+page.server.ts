import { error } from '@sveltejs/kit';
import { restaurants } from '$lib/data/restaurants';
import { getRestaurantBySlug } from '$lib/restaurant-helpers';
import { normalizeUserReviewState } from '$lib/user-reviews';
import userReviews from '../../../../data/user-reviews.json';

export function entries() {
	return restaurants.map((restaurant) => ({ slug: restaurant.slug }));
}

export function load({ params }) {
	const place = getRestaurantBySlug(params.slug);

	if (!place) {
		throw error(404, 'Restaurant not found');
	}

	return {
		place,
		reviewReadOnly: true,
		reviewState: normalizeUserReviewState(userReviews)
	};
}
