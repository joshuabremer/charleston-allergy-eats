import type { Restaurant } from '$lib/types';

// Curated Charleston restaurant list shown in the app. These first entries
// were approved directly by the user from a pasted Google Maps listing
// (see data/raw/charleston-2026/pasted-google-maps-listings-2026-07-12.json).
// They have not yet been researched for allergy accommodations — add menus,
// quotes, and allergen resources as that research comes in.
const RAW_SOURCE_NOTE =
	'Raw source: data/raw/charleston-2026/pasted-google-maps-listings-2026-07-12.json.';
const NOT_YET_RESEARCHED_NOTE =
	'Approved by user request from a pasted Google Maps listing; allergy accommodations have not been independently researched yet.';
const APPROX_LOCATION_NOTE =
	'Exact street address was not in the pasted listing, so this uses an approximate area location. Update with the real address when known.';

const KICKIN_CHICKEN_NOTE =
	"Added at user request as a place to review (not yet approved). Raw source: data/raw/charleston-2026/pasted-kickin-chicken-listings-2026-07-12.json.";
const KICKIN_CHICKEN_MENU_NOTE =
	'Menu analyzed from a user-provided PDF (KC_Menu_Spring.pdf) and the live menu page. Raw source: data/raw/charleston-2026/kickin-chicken-menu-spring-2026.json. Menu prints an explicit cross-contact disclaimer and offers no dedicated allergen guide. Most fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and share fryers, so gluten cross-contact is likely; grilled chicken is available as a substitute on most sandwiches, wraps, and salads. Heavy use of cheese across sandwiches/burgers/shareables.';
const BENNY_RINALDIS_NOTE =
	"Approved by user request. Raw source: data/raw/charleston-2026/pasted-benny-rinaldis-listing-2026-07-12.json. User reported the restaurant said in person that they have a nut-free kitchen.";
const JENIS_NOTE =
	"Approved by user request from a pasted Google Maps listing; allergy accommodations have not been independently researched yet. Raw source: data/raw/charleston-2026/pasted-jenis-ice-cream-listings-2026-07-12.json.";
const HOLY_CITY_BREWING_NOTE =
	"Added at user request as a place to review (not yet approved). Full food menu was pasted and analyzed. Raw source: data/raw/charleston-2026/pasted-holy-city-brewing-listing-2026-07-12.json.";
const MADRA_RUA_NOTE =
	"Approved by user request. Lunch, dinner, and brunch menus were pasted and analyzed; kitchen uses peanut oil for frying (not a household concern). Raw source: data/raw/charleston-2026/pasted-madra-rua-irish-pub-listing-2026-07-12.json.";
const COAST_BREWING_NOTE =
	"Approved by user request. Food menu (Menu+July+2026.pdf) analyzed; this entry was re-added after being lost during an earlier session context compaction. Raw source: data/raw/charleston-2026/coast-brewing-listing-and-menu-2026-07-12.json.";

export const restaurants: Restaurant[] = [
	{
		slug: 'chick-fil-a-centre-pointe',
		name: 'Chick-fil-A',
		neighborhood: 'North Charleston (Centre Pointe)',
		address: '4926 Centre Pointe Dr, North Charleston, SC 29418',
		phone: '(843) 744-9051',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Chick-fil-A with dine-in, drive-through, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.86595,
		longitude: -80.02114,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chick-fil-a-north-charleston-delivery',
		name: 'Chick-fil-A',
		neighborhood: 'North Charleston',
		address: 'North Charleston, SC (exact address unconfirmed)',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Delivery-only Chick-fil-A location (no dine-in or takeout per pasted listing).',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8546,
		longitude: -79.9748,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chick-fil-a-the-citadel',
		name: 'Chick-fil-A',
		neighborhood: 'Charleston (The Citadel)',
		address: '4 Ave of Remembrance, Charleston, SC 29409',
		phone: '(843) 953-2556',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Delivery-only Chick-fil-A on The Citadel campus (no dine-in or takeout per pasted listing).',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.79798,
		longitude: -79.95854,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'jimmy-johns-north-charleston',
		name: "Jimmy John's",
		neighborhood: 'North Charleston',
		address: 'North Charleston, SC (exact address unconfirmed)',
		phone: '(843) 225-8083',
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Fast casual sandwich shop.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8546,
		longitude: -79.9748,
		resources: [],
		quotes: [
			{
				quote: 'Super Clean, super friendly, fast, they hooked up my sandwiches too!',
				sourceLabel: 'Google review'
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'jimmy-johns-westedge',
		name: "Jimmy John's",
		neighborhood: 'Charleston (WestEdge)',
		address: '99 Westedge St Suite 1500, Charleston, SC 29403',
		phone: '(843) 724-7771',
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Fast casual sandwich shop in the WestEdge development.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7834,
		longitude: -79.9551,
		resources: [],
		quotes: [
			{
				quote: 'The food was good, and the ingredients were fresh.',
				sourceLabel: 'Google review'
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'jimmy-johns-savannah-hwy',
		name: "Jimmy John's",
		neighborhood: 'West Ashley',
		address: '1300 Savannah Hwy Unit 12, Charleston, SC 29407',
		phone: '(843) 573-4735',
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Fast casual sandwich shop on Savannah Highway.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7871,
		longitude: -80.0127,
		resources: [],
		quotes: [
			{
				quote: 'Consistently great sandwiches served quickly with friendly staff',
				sourceLabel: 'Google review'
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'jimmy-johns-mt-pleasant',
		name: "Jimmy John's",
		neighborhood: 'Mt Pleasant',
		address: 'Mt Pleasant, SC (exact address unconfirmed)',
		phone: '(843) 388-7012',
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Fast casual sandwich shop.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8323,
		longitude: -79.8284,
		resources: [],
		quotes: [
			{
				quote: 'Ordered takeout online, everything came out perfectly.',
				sourceLabel: 'Google review'
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-north-charleston-1',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'North Charleston',
		address: 'North Charleston, SC (exact address unconfirmed)',
		phone: '(843) 747-6707',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8546,
		longitude: -79.9748,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-north-charleston-2',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'North Charleston',
		address: 'North Charleston, SC (exact address unconfirmed)',
		phone: '(843) 553-2106',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8546,
		longitude: -79.9748,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-charleston-area-3',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Charleston area',
		address: 'Charleston, SC area (exact address unconfirmed)',
		phone: '(854) 214-6932',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, drive-through, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8546,
		longitude: -79.9748,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-king-street',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Downtown Charleston',
		address: '374 King St, Charleston, SC 29401',
		phone: '(843) 577-2345',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.786594,
		longitude: -79.935244,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-savannah-hwy',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'West Ashley',
		address: '975 Savannah Hwy, Charleston, SC 29407',
		phone: '(854) 999-4231',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7846,
		longitude: -79.9729,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-ladson',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Ladson',
		address: 'Ladson, SC (exact address unconfirmed)',
		phone: '(843) 376-6818',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9857,
		longitude: -80.1101,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-goose-creek',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Goose Creek',
		address: 'Goose Creek, SC (exact address unconfirmed)',
		phone: '(854) 300-4182',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, drive-through, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0007,
		longitude: -80.0331,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-mt-pleasant',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Mt Pleasant',
		address: 'Mt Pleasant, SC (exact address unconfirmed)',
		phone: '(843) 856-1170',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8323,
		longitude: -79.8284,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-hanahan',
		name: "Famulari's Pizzeria: Hanahan",
		neighborhood: 'Hanahan',
		address: 'Hanahan, SC (exact address unconfirmed)',
		phone: '(843) 572-7105',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in Hanahan.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9257,
		longitude: -80.0087,
		resources: [],
		quotes: [
			{
				quote: "I've been with famularis since there was only one In Summerville!",
				sourceLabel: 'Google review'
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-west-ashley',
		name: "Famulari's Pizzeria: West Ashley",
		neighborhood: 'West Ashley',
		address: '2408 Ashley River Rd, Charleston, SC 29414',
		phone: '(843) 571-0555',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in West Ashley.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8234,
		longitude: -80.0418,
		resources: [],
		quotes: [{ quote: 'Mind blowing!', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-cainhoy',
		name: "Famulari's Pizzeria: Cainhoy",
		neighborhood: 'Cainhoy',
		address: '1721 Clements Ferry Rd, Charleston, SC 29492',
		phone: '(843) 972-8001',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in Cainhoy.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9224597,
		longitude: -79.8712401,
		resources: [],
		quotes: [{ quote: 'Great for families', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-oakbrook',
		name: "Famulari's Pizzeria: Oakbrook",
		neighborhood: 'Summerville (Oakbrook)',
		address: 'Summerville, SC (Oakbrook area; exact address unconfirmed)',
		phone: '(843) 832-2222',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in the Oakbrook area of Summerville.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9822,
		longitude: -80.1794,
		resources: [],
		quotes: [{ quote: 'Twenty minutes away but totally worth the drive', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'fams-brewing-co',
		name: "Fam's Brewing Co.",
		neighborhood: 'James Island',
		address: '1291 Folly Rd, Charleston, SC 29412',
		phone: '(843) 225-4646',
		type: 'Sit-down',
		cuisineSummary: 'Brewery and pizza',
		summary: 'Brewery and pizzeria on Folly Road.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.73055,
		longitude: -79.95565,
		resources: [],
		quotes: [{ quote: 'You can see the pics.', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-cane-bay',
		name: "Famulari's Pizzeria: Cane Bay",
		neighborhood: 'Summerville (Cane Bay)',
		address: 'Summerville, SC (Cane Bay area; exact address unconfirmed)',
		phone: '(843) 809-5423',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in the Cane Bay area of Summerville.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.121,
		longitude: -80.181,
		resources: [],
		quotes: [{ quote: 'Complete transformation from the previous management.', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'johnnys-garage',
		name: "Johnny's Garage",
		neighborhood: 'Hanahan',
		address: '1256 Yeamans Hall Rd, Hanahan, SC 29410',
		rating: 4.4,
		type: 'Sit-down',
		cuisineSummary: 'American',
		summary: 'Sit-down American restaurant, $10-20 per person.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.93,
		longitude: -79.9777,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'santis-restaurante-mexicano-meeting-st',
		name: "Santi's Restaurante Mexicano",
		neighborhood: 'Charleston (Meeting St)',
		address: '1302 Meeting St, Charleston, SC 29405',
		rating: 4.4,
		type: 'Sit-down',
		cuisineSummary: 'Mexican & Southwest',
		summary: 'Mexican & Southwest food with margaritas.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.809,
		longitude: -79.9537,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'santis-west-ashley',
		name: "Santi's West Ashley",
		neighborhood: 'West Ashley',
		address: '1660 Savannah Hwy, Charleston, SC 29407',
		rating: 4.0,
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7933,
		longitude: -80.0202,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'santis-mount-pleasant',
		name: "Santi's Mount Pleasant",
		neighborhood: 'Mt Pleasant',
		address: 'Mt Pleasant, SC (exact address unconfirmed)',
		rating: 4.1,
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8323,
		longitude: -79.8284,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, APPROX_LOCATION_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'kickin-chicken-charleston-1',
		name: "The Kickin' Chicken",
		neighborhood: 'Charleston',
		address: 'Charleston, SC (exact address unconfirmed)',
		phone: '(843) 766-5292',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, curbside pickup, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7765,
		longitude: -79.9311,
		resources: [
			{
				label: 'Menu',
				href: 'https://kickinchickensamrittenberg.com/food-menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'Menu prints an explicit cross-contact disclaimer: kitchen environment may involve cross-contact with allergens; a complete absence cannot be guaranteed.'
					},
					{
						tone: 'yellow',
						note: 'Fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and likely share fryers, so gluten cross-contact is likely.'
					},
					{
						tone: 'green',
						note: 'Grilled chicken is available as a substitute on most sandwiches, wraps, and salads instead of fried/breaded chicken.'
					}
				]
			}
		],
		quotes: [
			{
				quote:
					"Our kitchen environment may involve cross-contact with allergens or non-vegan ingredients. While we will do our best to accommodate all requests, we cannot guarantee a complete absence of these ingredients.",
				sourceLabel: 'KC_Menu_Spring.pdf allergy disclaimer'
			}
		],
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE, APPROX_LOCATION_NOTE]
	},
	{
		slug: 'kickin-chicken-charleston-2',
		name: "The Kickin' Chicken",
		neighborhood: 'Charleston',
		address: 'Charleston, SC (exact address unconfirmed)',
		phone: '(843) 805-5020',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7854,
		longitude: -79.9399,
		resources: [
			{
				label: 'Menu',
				href: 'https://kickinchickensamrittenberg.com/food-menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'Menu prints an explicit cross-contact disclaimer: kitchen environment may involve cross-contact with allergens; a complete absence cannot be guaranteed.'
					},
					{
						tone: 'yellow',
						note: 'Fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and likely share fryers, so gluten cross-contact is likely.'
					},
					{
						tone: 'green',
						note: 'Grilled chicken is available as a substitute on most sandwiches, wraps, and salads instead of fried/breaded chicken.'
					}
				]
			}
		],
		quotes: [
			{
				quote:
					"Our kitchen environment may involve cross-contact with allergens or non-vegan ingredients. While we will do our best to accommodate all requests, we cannot guarantee a complete absence of these ingredients.",
				sourceLabel: 'KC_Menu_Spring.pdf allergy disclaimer'
			}
		],
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE, APPROX_LOCATION_NOTE]
	},
	{
		slug: 'kickin-chicken-johns-island',
		name: "The Kickin' Chicken",
		neighborhood: 'Johns Island',
		address: 'Johns Island, SC (exact address unconfirmed)',
		phone: '(843) 990-5711',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.706,
		longitude: -80.0392,
		resources: [
			{
				label: 'Menu',
				href: 'https://kickinchickensamrittenberg.com/food-menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'Menu prints an explicit cross-contact disclaimer: kitchen environment may involve cross-contact with allergens; a complete absence cannot be guaranteed.'
					},
					{
						tone: 'yellow',
						note: 'Fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and likely share fryers, so gluten cross-contact is likely.'
					},
					{
						tone: 'green',
						note: 'Grilled chicken is available as a substitute on most sandwiches, wraps, and salads instead of fried/breaded chicken.'
					}
				]
			}
		],
		quotes: [
			{
				quote:
					"Our kitchen environment may involve cross-contact with allergens or non-vegan ingredients. While we will do our best to accommodate all requests, we cannot guarantee a complete absence of these ingredients.",
				sourceLabel: 'KC_Menu_Spring.pdf allergy disclaimer'
			}
		],
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE, APPROX_LOCATION_NOTE]
	},
	{
		slug: 'kickin-chicken-mount-pleasant',
		name: "The Kickin' Chicken",
		neighborhood: 'Mt Pleasant',
		address: 'Mt Pleasant, SC (exact address unconfirmed)',
		phone: '(843) 881-8734',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, curbside pickup, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8323,
		longitude: -79.8284,
		resources: [
			{
				label: 'Menu',
				href: 'https://kickinchickensamrittenberg.com/food-menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'Menu prints an explicit cross-contact disclaimer: kitchen environment may involve cross-contact with allergens; a complete absence cannot be guaranteed.'
					},
					{
						tone: 'yellow',
						note: 'Fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and likely share fryers, so gluten cross-contact is likely.'
					},
					{
						tone: 'green',
						note: 'Grilled chicken is available as a substitute on most sandwiches, wraps, and salads instead of fried/breaded chicken.'
					}
				]
			}
		],
		quotes: [
			{
				quote:
					"Our kitchen environment may involve cross-contact with allergens or non-vegan ingredients. While we will do our best to accommodate all requests, we cannot guarantee a complete absence of these ingredients.",
				sourceLabel: 'KC_Menu_Spring.pdf allergy disclaimer'
			}
		],
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE, APPROX_LOCATION_NOTE]
	},
	{
		slug: 'kickin-chicken-summerville-1',
		name: "The Kickin' Chicken",
		neighborhood: 'Summerville',
		address: 'Summerville, SC (exact address unconfirmed)',
		phone: '(843) 225-3535',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, curbside pickup, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0185,
		longitude: -80.1756,
		resources: [
			{
				label: 'Menu',
				href: 'https://kickinchickensamrittenberg.com/food-menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'Menu prints an explicit cross-contact disclaimer: kitchen environment may involve cross-contact with allergens; a complete absence cannot be guaranteed.'
					},
					{
						tone: 'yellow',
						note: 'Fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and likely share fryers, so gluten cross-contact is likely.'
					},
					{
						tone: 'green',
						note: 'Grilled chicken is available as a substitute on most sandwiches, wraps, and salads instead of fried/breaded chicken.'
					}
				]
			}
		],
		quotes: [
			{
				quote:
					"Our kitchen environment may involve cross-contact with allergens or non-vegan ingredients. While we will do our best to accommodate all requests, we cannot guarantee a complete absence of these ingredients.",
				sourceLabel: 'KC_Menu_Spring.pdf allergy disclaimer'
			}
		],
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE, APPROX_LOCATION_NOTE]
	},
	{
		slug: 'kickin-chicken-summerville-2',
		name: "The Kickin' Chicken",
		neighborhood: 'Summerville',
		address: 'Summerville, SC (exact address unconfirmed)',
		phone: '(843) 875-6998',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in and drive-through.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0287,
		longitude: -80.1893,
		resources: [
			{
				label: 'Menu',
				href: 'https://kickinchickensamrittenberg.com/food-menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'Menu prints an explicit cross-contact disclaimer: kitchen environment may involve cross-contact with allergens; a complete absence cannot be guaranteed.'
					},
					{
						tone: 'yellow',
						note: 'Fried items (tenders, nuggets, wings, fried pickles, mozzarella bites) are hand-breaded and likely share fryers, so gluten cross-contact is likely.'
					},
					{
						tone: 'green',
						note: 'Grilled chicken is available as a substitute on most sandwiches, wraps, and salads instead of fried/breaded chicken.'
					}
				]
			}
		],
		quotes: [
			{
				quote:
					"Our kitchen environment may involve cross-contact with allergens or non-vegan ingredients. While we will do our best to accommodate all requests, we cannot guarantee a complete absence of these ingredients.",
				sourceLabel: 'KC_Menu_Spring.pdf allergy disclaimer'
			}
		],
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE, APPROX_LOCATION_NOTE]
	},
	{
		slug: 'benny-rinaldis',
		name: "Benny Rinaldi's",
		neighborhood: 'North Charleston',
		address: '1079 E Montague Ave Ste 100, North Charleston, SC 29405',
		phone: '(843) 900-3885',
		rating: 4.3,
		type: 'Sit-down',
		cuisineSummary: 'Pizza',
		summary: 'Pizza restaurant with dine-in, takeout, and delivery, $10-20 per person.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.881238,
		longitude: -79.977158,
		resources: [
			{
				label: 'Website',
				href: 'https://bennysva.com',
				kind: 'website'
			}
		],
		quotes: [],
		notes: [BENNY_RINALDIS_NOTE]
	},
	{
		slug: 'jenis-splendid-ice-creams-king-st',
		name: "Jeni's Splendid Ice Creams",
		neighborhood: 'Charleston (Upper King)',
		address: '501-A King St, Charleston, SC 29403',
		phone: '(843) 212-5113',
		rating: 4.7,
		type: 'Dessert',
		cuisineSummary: 'Ice cream',
		summary: 'Frozen treats in inventive flavors, with dine-in, takeout, and no-contact delivery.',
		meals: ['Dessert'],
		latitude: 32.79008,
		longitude: -79.93933,
		resources: [],
		quotes: [],
		notes: [JENIS_NOTE]
	},
	{
		slug: 'jenis-splendid-ice-creams-mt-pleasant',
		name: "Jeni's Splendid Ice Creams",
		neighborhood: 'Mt Pleasant',
		address: '1242 Belk Dr #101, Mt Pleasant, SC 29464',
		phone: '(843) 628-6824',
		rating: 3.9,
		type: 'Dessert',
		cuisineSummary: 'Ice cream',
		summary: 'Frozen treats in inventive flavors, delivery only.',
		meals: ['Dessert'],
		latitude: 32.835,
		longitude: -79.8246,
		resources: [],
		quotes: [],
		notes: [JENIS_NOTE]
	},
	{
		slug: 'holy-city-brewing',
		name: 'Holy City Brewing',
		neighborhood: 'Charleston (Park Circle area)',
		address: '1021 Aragon Ave, Charleston, SC 29405',
		phone: '(843) 459-2948',
		rating: 4.5,
		type: 'Sit-down',
		cuisineSummary: 'Brewery / pub food',
		summary:
			'Craft brewery with a garagelike tasting room, pool table, and live music, plus free tours. Dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.87,
		longitude: -79.98,
		resources: [
			{
				label: 'Website',
				href: 'https://holycitybrewing.com',
				kind: 'website'
			},
			{
				label: 'Menu',
				href: 'https://holycitybrewing.com/menu',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: 'No dedicated allergen guide or menu labeling published online; ask staff directly about cross-contact for shared-fryer items (chicken nuggets, wings, fries, mozzarella wedges).'
					},
					{
						tone: 'yellow',
						note: 'Boiled peanuts and chickpea hummus are on the shareables menu (not a concern for this household, but worth noting for a peanut-allergic guest).'
					},
					{
						tone: 'green',
						note: 'Burgers and sandwiches can be subbed to grilled chicken or a black bean patty, giving flexible non-fried options beyond the fryer-heavy shareables.'
					}
				]
			}
		],
		quotes: [],
		notes: [HOLY_CITY_BREWING_NOTE]
	},
	{
		slug: 'madra-rua-irish-pub-park-circle',
		name: 'Madra Rua Irish Pub',
		neighborhood: 'North Charleston (Park Circle)',
		address: '1034 E Montague Ave, North Charleston, SC 29405',
		phone: '843-554-2522',
		rating: 4.6,
		type: 'Sit-down',
		cuisineSummary: 'Irish pub fare',
		summary: "Authentic Irish eats & ample beer selection, $20-30 per person.",
		meals: ['Breakfast', 'Brunch', 'Lunch', 'Dinner'],
		latitude: 32.8814,
		longitude: -79.9742,
		resources: [
			{
				label: 'Website',
				href: 'https://madraruapub.com',
				kind: 'website'
			}
		],
		quotes: [],
		notes: [MADRA_RUA_NOTE]
	},
	{
		slug: 'madra-rua-irish-pub-summerville',
		name: 'Madra Rua Irish Pub',
		neighborhood: 'Summerville',
		address: '2066 N Main St, Summerville, SC 29486',
		phone: '843-821-9434',
		rating: 4.6,
		type: 'Sit-down',
		cuisineSummary: 'Irish pub fare',
		summary: "Shepherd's pie & soccer on TV, $20-30 per person.",
		meals: ['Breakfast', 'Brunch', 'Lunch', 'Dinner'],
		latitude: 33.073047,
		longitude: -80.161702,
		resources: [
			{
				label: 'Website',
				href: 'https://madraruapub.com',
				kind: 'website'
			}
		],
		quotes: [],
		notes: [MADRA_RUA_NOTE]
	},
	{
		slug: 'coast-brewing-company',
		name: 'COAST Brewing Company',
		neighborhood: 'North Charleston',
		address: '1250 2nd St N, North Charleston, SC 29405',
		phone: '(843) 343-4727',
		type: 'Sit-down',
		cuisineSummary: 'Brewery / pub food',
		summary:
			'Family-owned craft brewery since 2007 on an old Navy base, with outdoor seating, live performances, and food at the bar. $20-30 per person.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.87354,
		longitude: -79.9722,
		resources: [
			{
				label: 'Menu',
				href: 'https://coastbrewing.com',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'All dressings and sauces are house-made without seed oils, and fried items (cheese curds, crispy potatoes, chicken wings) are fried in beef tallow rather than peanut or other seed oils.'
					},
					{
						tone: 'green',
						note: 'Kids quesadilla and the green chorizo tacos use corn tortillas, a naturally gluten-free option.'
					},
					{
						tone: 'yellow',
						note: 'No dedicated allergen guide or per-item allergen labeling; most sandwiches/burgers use wheat-based Normandy Bakery bread/buns with no gluten-free substitute mentioned.'
					}
				]
			}
		],
		quotes: [],
		notes: [COAST_BREWING_NOTE]
	}
];
