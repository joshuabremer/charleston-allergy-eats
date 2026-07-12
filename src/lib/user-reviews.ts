import defaultRestaurantDecisions from '$lib/data/imported/restaurant-decisions.json';
import { DECISION_STATES, type DecisionState, type UserReview } from '$lib/types';

export type UserReviewState = Record<string, UserReview>;

type DefaultRestaurantDecision = {
	slug: string;
	decision: DecisionState;
	rejectionNote?: string;
};

const DEFAULT_REVIEW_BY_SLUG = new Map(
	(defaultRestaurantDecisions as DefaultRestaurantDecision[]).map((entry) => [
		entry.slug,
		{
			decision: entry.decision,
			rejectionNote: entry.decision === 'rejected' ? entry.rejectionNote : undefined,
			comment: undefined,
			personalTags: []
		}
	])
);

export function loadUserReviews(initialState: unknown): UserReviewState {
	return normalizeUserReviewState(initialState);
}

export function getUserReview(reviewState: UserReviewState, slug: string): UserReview {
	return (
		reviewState[slug] ??
		DEFAULT_REVIEW_BY_SLUG.get(slug) ?? {
			decision: 'ready-to-review',
			rejectionNote: undefined,
			comment: undefined,
			personalTags: []
		}
	);
}

export function normalizeUserReviewState(value: unknown): UserReviewState {
	if (!isObjectRecord(value)) {
		throw new TypeError('User review payload must be an object keyed by slug.');
	}

	return Object.fromEntries(
		Object.entries(value).map(([slug, reviewValue]) => [slug, normalizeUserReview(reviewValue)])
	);
}

function normalizeUserReview(value: unknown): UserReview {
	const review = typeof value === 'object' && value ? (value as Record<string, unknown>) : {};
	const personalTags = Array.isArray(review.personalTags)
		? review.personalTags.filter((tag): tag is string => typeof tag === 'string')
		: [];
	const rejectionNote = typeof review.rejectionNote === 'string' ? review.rejectionNote : undefined;
	const comment = typeof review.comment === 'string' ? review.comment : undefined;

	if (isDecisionState(review.decision)) {
		return {
			decision: review.decision,
			rejectionNote: review.decision === 'rejected' ? rejectionNote : undefined,
			comment,
			personalTags
		};
	}

	const approved = review.approved === true;
	const rejected = review.rejected === true;
	const decision: DecisionState = rejected ? 'rejected' : approved ? 'approved' : 'ready-to-review';

	return {
		decision,
		rejectionNote: decision === 'rejected' ? rejectionNote : undefined,
		comment,
		personalTags
	};
}

function isDecisionState(value: unknown): value is DecisionState {
	return typeof value === 'string' && DECISION_STATES.includes(value as DecisionState);
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
