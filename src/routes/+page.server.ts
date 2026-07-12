import userReviews from '../../data/user-reviews.json';
import { normalizeUserReviewState } from '$lib/user-reviews';

// Static site: there is no server to edit review state at runtime. Decisions,
// comments, and tags are set directly in the git-tracked JSON files
// (data/user-reviews.json and src/lib/data/imported/restaurant-decisions.json)
// and displayed read-only in the app.
export function load() {
	return {
		reviewReadOnly: true,
		reviewState: normalizeUserReviewState(userReviews)
	};
}
