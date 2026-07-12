export const DECISION_STATES = [
	'ready-to-review',
	'needs-more-info',
	'awaiting-restaurant-response',
	'approved',
	'rejected'
] as const;
export type DecisionState = (typeof DECISION_STATES)[number];

export type RestaurantType =
	| 'Sit-down'
	| 'Fast casual'
	| 'Cafe'
	| 'Bakery'
	| 'Fast food'
	| 'Dessert'
	| 'Unknown';

export type MealService = 'Breakfast' | 'Brunch' | 'Lunch' | 'Dinner' | 'Dessert' | 'Late night';

export type ResourceKind = 'menu' | 'allergen' | 'website' | 'review' | 'reservation';

export type MenuFlag = {
	tone: 'green' | 'yellow' | 'red';
	note: string;
};

export type ResourceLink = {
	label: string;
	href: string;
	kind: ResourceKind;
	menuFlags?: MenuFlag[];
};

export type SourceQuote = {
	quote: string;
	sourceLabel: string;
	href?: string;
};

export type Restaurant = {
	slug: string;
	name: string;
	neighborhood: string;
	address: string;
	phone?: string;
	email?: string;
	rating?: number;
	type: RestaurantType;
	cuisineSummary: string;
	summary: string;
	meals: MealService[];
	latitude: number;
	longitude: number;
	resources: ResourceLink[];
	quotes: SourceQuote[];
	notes: string[];
};

export type ResearchEntryKind = 'menu' | 'allergen' | 'review' | 'website' | 'idea' | 'note';

export type ResearchDumpEntry = {
	id: string;
	title: string;
	restaurantSlug?: string;
	restaurantName?: string;
	neighborhood?: string;
	kind: ResearchEntryKind;
	excerpt: string;
	href?: string;
	capturedAt: string;
	status: 'inbox' | 'curated';
};

export type UserReview = {
	decision: DecisionState;
	rejectionNote?: string;
	comment?: string;
	personalTags: string[];
};
