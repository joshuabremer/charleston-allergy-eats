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
const CHICK_FIL_A_UPDATE_NOTE =
	"Added/updated from a user-pasted Google Maps location list (2026-07-12). The previous North Charleston delivery-only entry (5500 International Blvd) was removed at user request since it is no longer listed. Raw source: data/raw/charleston-2026/pasted-chick-fil-a-listings-update-2026-07-12.json.";
const TEMPORARILY_CLOSED_NOTE =
	'Google Maps listed this location as "Temporarily closed" as of the latest pasted listing (2026-07-12). Reconfirm it has reopened before recommending it.';
const COMMONHOUSE_ALEWORKS_NOTE =
	"Added at user request as a place to review (not yet approved). Food menu was pasted and analyzed. Raw source: data/raw/charleston-2026/pasted-commonhouse-aleworks-listing-and-menu-2026-07-12.json.";
const AZUL_MEXICANO_NOTE =
	"Added at user request as a place to review (not yet approved). Full dinner and lunch specials menus were pasted and analyzed. Raw source: data/raw/charleston-2026/pasted-azul-mexicano-listing-and-menu-2026-07-12.json.";
const JERSEY_MIKES_NOTE =
	"Added at user request as a place to review (not yet approved); previously removed from this project, re-added per new explicit request as its own distinct locations. No menu was pasted for this batch. Raw source: data/raw/charleston-2026/pasted-jersey-mikes-subs-listings-2026-07-12.json.";
const HOME_TEAM_BBQ_NOTE =
	"Added at user request as a place to review (not yet approved). Full food/drink menu (from the West Ashley location) was pasted and analyzed. Raw source: data/raw/charleston-2026/pasted-home-team-bbq-listing-and-menu-2026-07-12.json.";
const NO_BULL_BURGER_BAR_NOTE =
	'Added at user request as a place to review (not yet approved), looked up via the Google Places API from a shared Google Maps link (https://maps.app.goo.gl/6CVDaWaQTFXfuL2N8) rather than a pasted listing. No menu or allergen info analyzed yet.';
const NO_BULL_BURGER_BAR_MENU_NOTE =
	'Full menu pasted and analyzed; see menu analysis on the Website link. Raw source: data/raw/charleston-2026/no-bull-burger-bar-menu-2026-07-12.json.';
const LA_HACIENDA_MENU_NOTE =
	'Full online ordering menu pasted and analyzed, stated by user to apply across all La Hacienda locations. Raw source: data/raw/charleston-2026/la-hacienda-menu-2026-07-18.json. Menu prints only a generic food-safety/allergy disclaimer with no dedicated allergen guide.';
const LA_HACIENDA_LOOKUP_NOTE =
	'Added at user request as a place to review (not yet approved), looked up via the Google Places API from a shared Google Maps link rather than a pasted listing.';
const POPUP_BAGELS_NOTE =
	'Added at user request as a place to review (not yet approved), looked up via the Google Places API from a shared Google Maps link. Full bagel/schmear/drinks menu pasted and analyzed; user noted everything is made in house. Raw source: data/raw/charleston-2026/popup-bagels-listing-and-menu-2026-07-18.json.';
const SANTIS_NUT_FREE_NOTE =
	"Restaurant owner Candy Falcon replied by email confirming Santi's is nut-free and uses no tree nuts; applies to all Santi's locations in this project. Raw source: data/raw/charleston-2026/santis-nut-free-email-2026-04-19.json.";
const REBEL_TAQUERIA_NOTE =
	'Added at user request, looked up via the Google Places API from a shared Google Maps link. Owner/chef Lewis Kesaris replied by email confirming no tree nuts are used in any recipes. Got email response. Raw source: data/raw/charleston-2026/rebel-taqueria-lookup-and-email-2026-07-18.json.';

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
		latitude: 32.8756213,
		longitude: -80.0194899,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE, 'Reconfirmed open by user (2026-07-12).']
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
		slug: 'chick-fil-a-dorchester-rd',
		name: 'Chick-fil-A',
		neighborhood: 'North Charleston',
		address: '8455 Dorchester Rd, North Charleston, SC 29420',
		phone: '(843) 767-1213',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Chick-fil-A with dine-in, drive-through, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9158178,
		longitude: -80.1115997,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, CHICK_FIL_A_UPDATE_NOTE]
	},
	{
		slug: 'chick-fil-a-strom-thurmond-center',
		name: 'Chick-fil-A',
		neighborhood: 'North Charleston (Strom Thurmond Center)',
		address: 'Strom Thurmond Center, 9200 University Blvd, North Charleston, SC 29406',
		phone: '(843) 863-7050',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Chick-fil-A inside the Strom Thurmond Center; listed as temporarily closed as of the latest pasted listing.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.98,
		longitude: -80.0725,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, TEMPORARILY_CLOSED_NOTE, CHICK_FIL_A_UPDATE_NOTE]
	},
	{
		slug: 'chick-fil-a-magwood-dr',
		name: 'Chick-fil-A',
		neighborhood: 'North Charleston',
		address: '2013 Magwood Dr, North Charleston, SC 29406',
		phone: '(843) 571-1209',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Chick-fil-A with dine-in, drive-through, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8123144,
		longitude: -80.0420693,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, CHICK_FIL_A_UPDATE_NOTE]
	},
	{
		slug: 'chick-fil-a-folly-rd',
		name: 'Chick-fil-A',
		neighborhood: 'Charleston (James Island)',
		address: '849 Folly Rd, Charleston, SC 29412',
		phone: '(843) 795-9505',
		type: 'Fast food',
		cuisineSummary: 'Fast food chicken',
		summary: 'Chick-fil-A with dine-in, drive-through, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7336,
		longitude: -79.9743,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, CHICK_FIL_A_UPDATE_NOTE]
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
		latitude: 32.7854116,
		longitude: -80.0010428,
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
		slug: 'chipotle-centre-pointe',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'North Charleston',
		address: '4953 Centre Pointe Dr, North Charleston, SC 29418',
		phone: '(843) 747-6707',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8731051,
		longitude: -80.0203519,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-rivers-ave',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'North Charleston',
		address: '7398 Rivers Ave #102, North Charleston, SC 29406',
		phone: '(843) 553-2106',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.936993,
		longitude: -80.043948,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-dorchester-rd',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'North Charleston',
		address: '8601 Dorchester Rd, North Charleston, SC 29420',
		phone: '(854) 214-6932',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, drive-through, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.92071,
		longitude: -80.118768,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
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
		latitude: 32.7809226,
		longitude: -79.9897402,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-ladson',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Ladson',
		address: '3676 Ladson Rd, Ladson, SC 29456',
		phone: '(843) 376-6818',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9824343,
		longitude: -80.1289788,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-goose-creek',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Goose Creek',
		address: '220 Saint James Ave, Goose Creek, SC 29445',
		phone: '(854) 300-4182',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, drive-through, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0103536,
		longitude: -80.0458478,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'chipotle-n-hwy-17-mt-pleasant',
		name: 'Chipotle Mexican Grill',
		neighborhood: 'Mt Pleasant',
		address: '1509 N Hwy 17, Mt Pleasant, SC 29464',
		phone: '(843) 856-1170',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Fast casual Mexican grill with dine-in, takeout, and no-contact delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8171901,
		longitude: -79.8449488,
		resources: [],
		quotes: [],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-hanahan',
		name: "Famulari's Pizzeria: Hanahan",
		neighborhood: 'Hanahan',
		address: '1000 Tanner Ford Blvd, Hanahan, SC 29410',
		phone: '(843) 572-7105',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in Hanahan.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9333469,
		longitude: -79.9985113,
		resources: [],
		quotes: [
			{
				quote: "I've been with famularis since there was only one In Summerville!",
				sourceLabel: 'Google review'
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
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
		address: '1704 Old Trolley Rd, Summerville, SC 29485',
		phone: '(843) 832-2222',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in the Oakbrook area of Summerville.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9597583,
		longitude: -80.1654688,
		resources: [],
		quotes: [{ quote: 'Twenty minutes away but totally worth the drive', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
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
		latitude: 32.7180701,
		longitude: -79.9671592,
		resources: [],
		quotes: [{ quote: 'You can see the pics.', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
	},
	{
		slug: 'famularis-pizzeria-cane-bay',
		name: "Famulari's Pizzeria: Cane Bay",
		neighborhood: 'Summerville (Cane Bay)',
		address: '1724 State Road, Summerville, SC 29486',
		phone: '(843) 809-5423',
		type: 'Sit-down',
		cuisineSummary: 'Pizzeria',
		summary: 'Local pizzeria chain location in the Cane Bay area of Summerville.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.1063642,
		longitude: -80.1252868,
		resources: [],
		quotes: [{ quote: 'Complete transformation from the previous management.', sourceLabel: 'Google review' }],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE]
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
		latitude: 32.9022235,
		longitude: -80.0094687,
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
		quotes: [
			{
				quote: 'We do not use any kind of tree nuts. We are nut free.',
				sourceLabel: "Email from Candy Falcon, Santi's (Apr 19)"
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE, SANTIS_NUT_FREE_NOTE]
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
		quotes: [
			{
				quote: 'We do not use any kind of tree nuts. We are nut free.',
				sourceLabel: "Email from Candy Falcon, Santi's (Apr 19)"
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE, SANTIS_NUT_FREE_NOTE]
	},
	{
		slug: 'santis-mount-pleasant',
		name: "Santi's Mount Pleasant",
		neighborhood: 'Mt Pleasant',
		address: '1471 Ben Sawyer Blvd, Mt Pleasant, SC 29464',
		rating: 4.1,
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7910646,
		longitude: -79.8531031,
		resources: [],
		quotes: [
			{
				quote: 'We do not use any kind of tree nuts. We are nut free.',
				sourceLabel: "Email from Candy Falcon, Santi's (Apr 19)"
			}
		],
		notes: [NOT_YET_RESEARCHED_NOTE, RAW_SOURCE_NOTE, SANTIS_NUT_FREE_NOTE]
	},
	{
		slug: 'kickin-chicken-sam-rittenberg',
		name: "The Kickin' Chicken",
		neighborhood: 'West Ashley',
		address: '1179 Sam Rittenberg Blvd, Charleston, SC 29407',
		phone: '(843) 766-5292',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, curbside pickup, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8216592,
		longitude: -79.9913057,
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
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE]
	},
	{
		slug: 'kickin-chicken-romney-st',
		name: "The Kickin' Chicken",
		neighborhood: 'Downtown Charleston',
		address: '45 Romney St Ste 300, Charleston, SC 29403',
		phone: '(843) 805-5020',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.80333,
		longitude: -79.94502,
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
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE]
	},
	{
		slug: 'kickin-chicken-bees-ferry',
		name: "The Kickin' Chicken",
		neighborhood: 'West Ashley (Bees Ferry)',
		address: '1184 Bees Ferry Rd Unit 101, Charleston, SC 29414',
		phone: '(843) 990-5711',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8073249,
		longitude: -80.1141566,
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
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE]
	},
	{
		slug: 'kickin-chicken-w-coleman-blvd',
		name: "The Kickin' Chicken",
		neighborhood: 'Mt Pleasant',
		address: '349 W Coleman Blvd, Mt Pleasant, SC 29464',
		phone: '(843) 881-8734',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, curbside pickup, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7962889,
		longitude: -79.8869151,
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
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE]
	},
	{
		slug: 'kickin-chicken-dorchester-rd',
		name: "The Kickin' Chicken",
		neighborhood: 'Summerville',
		address: '9800 Dorchester Rd #8545, Summerville, SC 29485',
		phone: '(843) 225-3535',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in, curbside pickup, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9484113,
		longitude: -80.1561879,
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
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE]
	},
	{
		slug: 'kickin-chicken-n-main-st',
		name: "The Kickin' Chicken",
		neighborhood: 'Summerville',
		address: '800 N Main St, Summerville, SC 29483',
		phone: '(843) 875-6998',
		type: 'Fast casual',
		cuisineSummary: 'Southern-style chicken',
		summary: 'Fast casual chicken restaurant with dine-in and drive-through.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.02804,
		longitude: -80.17531,
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
		notes: [KICKIN_CHICKEN_NOTE, KICKIN_CHICKEN_MENU_NOTE]
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
		latitude: 32.7900908,
		longitude: -79.9394734,
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
		latitude: 32.8297394,
		longitude: -79.8309436,
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
		latitude: 33.0453323,
		longitude: -80.115829,
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
	},
	{
		slug: 'commonhouse-aleworks',
		name: 'Commonhouse Aleworks',
		neighborhood: 'North Charleston',
		address: "4831 O'Hear Ave, North Charleston, SC 29405",
		phone: '(843) 471-1400',
		rating: 4.6,
		googlePlaceId: 'ChIJseCKouhk_ogRPA_ddGj0rEw',
		type: 'Sit-down',
		cuisineSummary: 'Brewery / pub food',
		summary: 'Brewery with dine-in, takeout, and delivery.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8823815,
		longitude: -79.9760019,
		resources: [
			{
				label: 'Website',
				href: 'https://commonhousealeworks.com',
				kind: 'website'
			},
			{
				label: 'Menu',
				href: 'https://app.livetaplists.com',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'Menu explicitly asks guests to tell the server about allergies and marks Vegetarian Option/Spicy items \u2014 a good sign of engagement even without a full allergen guide.'
					},
					{
						tone: 'yellow',
						note: "\u2018Fried Ritz\u2019 crackers top both salads (Green Salad and Caesar Salad) \u2014 Ritz crackers contain wheat, so ask to omit for a gluten-free order."
					},
					{
						tone: 'yellow',
						note: 'The CAB Smoked Brisket Burger is served on a seeded bun, which may contain sesame (a top allergen) \u2014 ask about substituting a different bun.'
					},
					{
						tone: 'yellow',
						note: 'No dedicated allergen guide or online menu labeling beyond the general disclaimer; several fried items (chicken fingers, spicy fried chicken sandwich, smoked wings) likely share fryers, so ask about cross-contact.'
					}
				]
			}
		],
		quotes: [],
		notes: [COMMONHOUSE_ALEWORKS_NOTE]
	},
	{
		slug: 'azul-mexicano',
		name: 'Azul Mexicano',
		neighborhood: 'North Charleston (Park Circle)',
		address: '1078c E Montague Ave, North Charleston, SC 29405',
		phone: '(843) 203-3754',
		rating: 4.3,
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant with dine-in, takeout, and delivery, $10-20 per person.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.881821,
		longitude: -79.977003,
		resources: [
			{
				label: 'Website',
				href: 'https://azulmexicanorestaurante.com',
				kind: 'website'
			},
			{
				label: 'Menu',
				href: 'https://azulmexicanorestaurante.com',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'yellow',
						note: "No allergen disclaimer, allergen guide, or menu labeling appears anywhere on the pasted menu \u2014 ask staff directly about ingredients and cross-contact."
					},
					{
						tone: 'green',
						note: 'Fish tacos explicitly offer a choice of grilled or breaded fish, and many tacos/sopes use corn tortillas by default \u2014 naturally gluten-free options if ordered carefully.'
					},
					{
						tone: 'green',
						note: "A dedicated \u2018For Vegetarians\u2019 section (veggie fajitas, veggie quesadilla, tofu tacos al pastor, portobello tacos, veggie soup) shows built-in substitution flexibility beyond simple meat swaps."
					},
					{
						tone: 'yellow',
						note: 'Several fried items (chimichangas, taquitos, churros, sopapilla) mix corn- and flour-based fried components, likely from shared fryers \u2014 ask about cross-contact for gluten-free orders.'
					}
				]
			}
		],
		quotes: [],
		notes: [AZUL_MEXICANO_NOTE]
	},
	{
		slug: 'jersey-mikes-international-blvd',
		name: "Jersey Mike's Subs",
		neighborhood: 'North Charleston',
		address: '5070 International Blvd #127, North Charleston, SC 29418',
		phone: '(843) 410-1406',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: "Casual, counter-serve sandwich chain location near the Tanger Outlets.",
		meals: ['Lunch', 'Dinner'],
		latitude: 32.86702,
		longitude: -80.01727,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-rivers-ave',
		name: "Jersey Mike's Subs",
		neighborhood: 'North Charleston',
		address: '7225 Rivers Ave Ste. 203, North Charleston, SC 29406',
		phone: '(843) 414-7371',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location across from Target.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.928685,
		longitude: -80.04061,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-magwood-dr',
		name: "Jersey Mike's Subs",
		neighborhood: 'North Charleston',
		address: '1975 Magwood Dr, North Charleston, SC 29414',
		phone: '(843) 459-2153',
		rating: 4.2,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8134571,
		longitude: -80.0419231,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-university-blvd',
		name: "Jersey Mike's Subs",
		neighborhood: 'North Charleston',
		address: '8983 University Blvd #101, North Charleston, SC 29406',
		phone: '(843) 793-2483',
		rating: 4.5,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location near the Tanger Outlets.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9744,
		longitude: -80.0611,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-king-st',
		name: "Jersey Mike's Subs",
		neighborhood: 'Downtown Charleston',
		address: '595 King St Ste 131, Charleston, SC 29403',
		phone: '(843) 278-8555',
		rating: 3.9,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location on Upper King Street.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7932779,
		longitude: -79.9416599,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-west-ashley-cir',
		name: "Jersey Mike's Subs",
		neighborhood: 'West Ashley',
		address: '3875 W Ashley Cir Suite 410, Charleston, SC 29414',
		phone: '(843) 628-0600',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8251053,
		longitude: -80.0829739,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-savannah-hwy',
		name: "Jersey Mike's Subs",
		neighborhood: 'West Ashley',
		address: '1145 Savannah Hwy Suite 205, Charleston, SC 29407',
		phone: '(843) 261-5430',
		rating: 4.0,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.784256,
		longitude: -79.991279,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-folly-rd-ste-20',
		name: "Jersey Mike's Subs",
		neighborhood: 'James Island',
		address: '520 Folly Rd Ste 20, Charleston, SC 29412',
		phone: '(843) 718-1606',
		rating: 4.1,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.74959,
		longitude: -79.97169,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-dorchester-rd',
		name: "Jersey Mike's Subs",
		neighborhood: 'North Charleston',
		address: '9500 Dorchester Rd Ste 186, North Charleston, SC 29485',
		phone: '(843) 832-8005',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9361568,
		longitude: -80.1403034,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-clements-ferry-rd',
		name: "Jersey Mike's Subs",
		neighborhood: 'Cainhoy',
		address: '1721 Clements Ferry Rd Bldg. A-1, Unit 112, Charleston, SC 29492',
		phone: '(843) 998-7474',
		rating: 4.4,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9223978,
		longitude: -79.871465,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-st-james-ave',
		name: "Jersey Mike's Subs",
		neighborhood: 'Goose Creek',
		address: '217-A St James Ave, Goose Creek, SC 29445',
		phone: '(843) 569-2800',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0086608,
		longitude: -80.0463785,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-n-hwy-17',
		name: "Jersey Mike's Subs",
		neighborhood: 'Mount Pleasant',
		address: '1907 N Hwy 17 #101, Mt Pleasant, SC 29466',
		phone: '(843) 388-6300',
		rating: 4.4,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8305896,
		longitude: -79.8257901,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-produce-ln',
		name: "Jersey Mike's Subs",
		neighborhood: 'Johns Island',
		address: '1800 Produce Ln B, Johns Island, SC 29455',
		phone: '(843) 278-5497',
		rating: 4.0,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.742149,
		longitude: -80.0405661,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-coleman-blvd',
		name: "Jersey Mike's Subs",
		neighborhood: 'Mount Pleasant',
		address: '280D West Coleman Blvd, Mt Pleasant, SC 29464',
		phone: '(843) 881-7996',
		rating: 4.4,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location near Houston Northcutt Blvd.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7957461,
		longitude: -79.8842549,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-morgans-point-rd',
		name: "Jersey Mike's Subs",
		neighborhood: 'Mount Pleasant',
		address: '3010 S Morgans Point Rd Building 33A, Unit C, Mt Pleasant, SC 29466',
		phone: '(843) 388-7456',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8614916,
		longitude: -79.7865796,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-folly-rd-ste-408',
		name: "Jersey Mike's Subs",
		neighborhood: 'James Island',
		address: '1417 Folly Rd Ste 408, Charleston, SC 29412',
		phone: '(843) 574-8141',
		rating: 3.6,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.7176,
		longitude: -79.9586,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-azalea-square-blvd',
		name: "Jersey Mike's Subs",
		neighborhood: 'Summerville',
		address: '310 Azalea Square Blvd Outparcel #11, Unit B, Summerville, SC 29483',
		phone: '(843) 875-3480',
		rating: 4.4,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0385389,
		longitude: -80.1584848,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-n-main-st',
		name: "Jersey Mike's Subs",
		neighborhood: 'Summerville',
		address: '2509 N Main St Ste B, Summerville, SC 29483',
		phone: '(843) 302-0302',
		rating: 4.2,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0563995,
		longitude: -80.0991134,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'jersey-mikes-old-trolley-rd',
		name: "Jersey Mike's Subs",
		neighborhood: 'Summerville',
		address: '613 Old Trolley Rd Ste A, Summerville, SC 29485',
		phone: '(843) 376-4107',
		rating: 4.3,
		type: 'Fast casual',
		cuisineSummary: 'Sandwiches',
		summary: 'Casual, counter-serve sandwich chain location.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.983491,
		longitude: -80.175331,
		resources: [{ label: 'Website', href: 'https://www.jerseymikes.com', kind: 'website' }],
		quotes: [],
		notes: [JERSEY_MIKES_NOTE]
	},
	{
		slug: 'home-team-bbq-west-ashley',
		name: 'Home Team BBQ',
		neighborhood: 'West Ashley',
		address: '1205 Ashley River Rd, Charleston, SC 29407',
		phone: '(843) 225-7427',
		rating: 4.6,
		type: 'Sit-down',
		cuisineSummary: 'Barbecue',
		summary: 'Boisterous spot for Southern barbecue with a full bar; original/flagship location.',
		meals: ['Lunch', 'Dinner', 'Late night'],
		latitude: 32.794395,
		longitude: -79.995839,
		resources: [
			{
				label: 'Website',
				href: 'https://hometeambbq.com',
				kind: 'website',
				menuFlags: [
					{
						tone: 'green',
						note: 'Menu prints an explicit allergen disclaimer: "Nuts, Dairy, Gluten, Allium, Fish and Shell Fish are all prepared in our kitchen, Please alert our staff to any Allergies, Dietary needs or Restrictions."'
					},
					{
						tone: 'green',
						note: 'All tacos can be prepared vegetarian, and black beans can be substituted for any meat across the menu.'
					},
					{
						tone: 'yellow',
						note: "Most sandwiches and sliders are served on King's Hawaiian buns (contains dairy, egg, and gluten); no dedicated gluten-free bun or bread substitute is listed."
					}
				]
			}
		],
		quotes: [],
		notes: [HOME_TEAM_BBQ_NOTE]
	},
	{
		slug: 'home-team-bbq-downtown',
		name: 'Home Team BBQ',
		neighborhood: 'Downtown Charleston',
		address: '126 Williman St, Charleston, SC 29403',
		phone: '(843) 225-7427 ext. 4',
		rating: 4.7,
		type: 'Sit-down',
		cuisineSummary: 'Barbecue',
		summary: 'Downtown location of the Southern barbecue restaurant, dine-in and takeout only.',
		meals: ['Lunch', 'Dinner', 'Late night'],
		latitude: 32.8093067,
		longitude: -79.9464866,
		resources: [{ label: 'Website', href: 'https://hometeambbq.com', kind: 'website' }],
		quotes: [],
		notes: [HOME_TEAM_BBQ_NOTE]
	},
	{
		slug: 'home-team-bbq-mount-pleasant',
		name: 'Home Team BBQ',
		neighborhood: 'Mount Pleasant',
		address: '3563 US-17, Mt Pleasant, SC 29466',
		phone: '(843) 225-7427',
		rating: 4.4,
		type: 'Sit-down',
		cuisineSummary: 'Barbecue',
		summary: 'Mount Pleasant location of the Southern barbecue restaurant, dine-in and takeout, no delivery.',
		meals: ['Lunch', 'Dinner', 'Late night'],
		latitude: 32.8775768,
		longitude: -79.7671535,
		resources: [{ label: 'Website', href: 'https://hometeambbq.com', kind: 'website' }],
		quotes: [],
		notes: [HOME_TEAM_BBQ_NOTE]
	},
	{
		slug: 'home-team-bbq-sullivans-island',
		name: 'Home Team BBQ',
		neighborhood: "Sullivan's Island",
		address: "2209 Middle St, Sullivan's Island, SC 29482",
		phone: '(843) 225-7427',
		rating: 4.7,
		type: 'Sit-down',
		cuisineSummary: 'Barbecue',
		summary: "Sullivan's Island location of the Southern barbecue restaurant, dine-in and takeout, no delivery.",
		meals: ['Lunch', 'Dinner', 'Late night'],
		latitude: 32.7606,
		longitude: -79.8412,
		resources: [{ label: 'Website', href: 'https://hometeambbq.com', kind: 'website' }],
		quotes: [],
		notes: [HOME_TEAM_BBQ_NOTE]
	},
	{
		slug: 'no-bull-burger-bar',
		name: 'No Bull Burger Bar',
		neighborhood: 'North Charleston',
		address: '1033 E Montague Ave, North Charleston, SC 29405',
		phone: '(843) 974-4953',
		rating: 4.4,
		googlePlaceId: 'ChIJrZH_6FRl_ogRAMz_nk9Ap9k',
		type: 'Fast casual',
		cuisineSummary: 'Burgers',
		summary: 'Burger bar in North Charleston offering gluten-free buns for all burgers.',
		meals: ['Lunch', 'Dinner', 'Late night'],
		latitude: 32.8812802,
		longitude: -79.975208,
		resources: [
			{
				label: 'Website',
				href: 'https://www.nobullburgerbar.com/',
				kind: 'website',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu.'
					},
					{
						tone: 'yellow',
						note: 'Fried starters (fried pickles, pimento cheese balls, cheeseburger egg rolls, fried chicken salad topping) are hand-breaded and likely share fryers; confirm with staff whether any tree-nut-containing item (e.g. a nut-topped dessert) is fried in the same oil.'
					}
				]
			}
		],
		quotes: [],
		notes: [NO_BULL_BURGER_BAR_NOTE, NO_BULL_BURGER_BAR_MENU_NOTE]
	},
	{
		slug: 'la-hacienda-international-blvd',
		name: 'La Hacienda Mexican Restaurant',
		neighborhood: 'North Charleston',
		address: '5070 International Blvd #121, North Charleston, SC 29418',
		phone: '(843) 746-8699',
		rating: 4,
		googlePlaceId: 'ChIJXcET_1Bj_ogR6ETNSmPrVXs',
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant location in North Charleston off International Blvd.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.867886,
		longitude: -80.017445,
		resources: [
			{
				label: 'Website',
				href: 'http://www.lahaciendamexrestaurants.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — it is a Tex-Mex menu of beef/chicken/pork/seafood, cheese, rice, beans, and tortillas.'
					},
					{
						tone: 'yellow',
						note: 'Fried desserts (churros, fried ice cream) and other fried items likely share fryers/kitchen equipment; menu offers no dedicated allergen guide beyond a generic disclaimer, so confirm any cross-contact concerns with staff.'
					}
				]
			}
		],
		quotes: [],
		notes: [LA_HACIENDA_MENU_NOTE]
	},
	{
		slug: 'la-hacienda-rivers-ave',
		name: 'La Hacienda Mexican Restaurant',
		neighborhood: 'North Charleston',
		address: '6322 Rivers Ave, North Charleston, SC 29418',
		phone: '(843) 569-6844',
		rating: 3.9,
		googlePlaceId: 'ChIJqfbck5tj_ogReQvq5jPGx0M',
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant location in North Charleston on Rivers Ave.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9112174,
		longitude: -80.0234953,
		resources: [
			{
				label: 'Website',
				href: 'http://www.lahaciendamexrestaurants.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — it is a Tex-Mex menu of beef/chicken/pork/seafood, cheese, rice, beans, and tortillas.'
					},
					{
						tone: 'yellow',
						note: 'Fried desserts (churros, fried ice cream) and other fried items likely share fryers/kitchen equipment; menu offers no dedicated allergen guide beyond a generic disclaimer, so confirm any cross-contact concerns with staff.'
					}
				]
			}
		],
		quotes: [],
		notes: [LA_HACIENDA_MENU_NOTE]
	},
	{
		slug: 'la-hacienda-resolute-way',
		name: 'La Hacienda Mexican Restaurant',
		neighborhood: 'North Charleston',
		address: '8461 Resolute Way, North Charleston, SC 29420',
		phone: '(843) 767-0301',
		rating: 4,
		googlePlaceId: 'ChIJI4fxyc6J_ogRinZFKTOrfF4',
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant location in North Charleston off Resolute Way.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.9156945,
		longitude: -80.1127077,
		resources: [
			{
				label: 'Website',
				href: 'http://www.lahaciendamexrestaurants.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — it is a Tex-Mex menu of beef/chicken/pork/seafood, cheese, rice, beans, and tortillas.'
					},
					{
						tone: 'yellow',
						note: 'Fried desserts (churros, fried ice cream) and other fried items likely share fryers/kitchen equipment; menu offers no dedicated allergen guide beyond a generic disclaimer, so confirm any cross-contact concerns with staff.'
					}
				]
			}
		],
		quotes: [],
		notes: [LA_HACIENDA_MENU_NOTE]
	},
	{
		slug: 'la-hacienda-goose-creek',
		name: 'La Hacienda of Goose Creek',
		neighborhood: 'Goose Creek',
		address: '205 N Goose Creek Blvd, Goose Creek, SC 29445',
		phone: '(843) 569-3834',
		rating: 3.9,
		googlePlaceId: 'ChIJIXpFjeVg_ogR7a-ydLC6wAk',
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant location in Goose Creek.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.0032388,
		longitude: -80.0393156,
		resources: [
			{
				label: 'Website',
				href: 'http://www.lahaciendamexrestaurants.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — it is a Tex-Mex menu of beef/chicken/pork/seafood, cheese, rice, beans, and tortillas.'
					},
					{
						tone: 'yellow',
						note: 'Fried desserts (churros, fried ice cream) and other fried items likely share fryers/kitchen equipment; menu offers no dedicated allergen guide beyond a generic disclaimer, so confirm any cross-contact concerns with staff.'
					}
				]
			}
		],
		quotes: [],
		notes: [LA_HACIENDA_LOOKUP_NOTE, LA_HACIENDA_MENU_NOTE]
	},
	{
		slug: 'la-hacienda-mt-pleasant',
		name: 'La Hacienda Mexican Restaurant',
		neighborhood: 'Mt Pleasant',
		address: '3050 S Morgans Point Rd, Mt Pleasant, SC 29466',
		phone: '(843) 388-7636',
		rating: 4.1,
		googlePlaceId: 'ChIJpVf1sRpt_ogRHDAsMToXOaM',
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant location in Mt Pleasant.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8621292,
		longitude: -79.785675,
		resources: [
			{
				label: 'Website',
				href: 'http://www.lahaciendamexrestaurants.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — it is a Tex-Mex menu of beef/chicken/pork/seafood, cheese, rice, beans, and tortillas.'
					},
					{
						tone: 'yellow',
						note: 'Fried desserts (churros, fried ice cream) and other fried items likely share fryers/kitchen equipment; menu offers no dedicated allergen guide beyond a generic disclaimer, so confirm any cross-contact concerns with staff.'
					}
				]
			}
		],
		quotes: [],
		notes: [LA_HACIENDA_LOOKUP_NOTE, LA_HACIENDA_MENU_NOTE]
	},
	{
		slug: 'la-hacienda-summerville',
		name: 'La Hacienda Mexican Restaurant',
		neighborhood: 'Summerville',
		address: '1205 N Main St, Summerville, SC 29483',
		phone: '(843) 873-0747',
		rating: 4,
		googlePlaceId: 'ChIJh-2w0DuL_ogRLMVlZyBYdrM',
		type: 'Sit-down',
		cuisineSummary: 'Mexican',
		summary: 'Mexican restaurant location in Summerville.',
		meals: ['Lunch', 'Dinner'],
		latitude: 33.034399,
		longitude: -80.159218,
		resources: [
			{
				label: 'Website',
				href: 'http://www.lahaciendamexrestaurants.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — it is a Tex-Mex menu of beef/chicken/pork/seafood, cheese, rice, beans, and tortillas.'
					},
					{
						tone: 'yellow',
						note: 'Fried desserts (churros, fried ice cream) and other fried items likely share fryers/kitchen equipment; menu offers no dedicated allergen guide beyond a generic disclaimer, so confirm any cross-contact concerns with staff.'
					}
				]
			}
		],
		quotes: [],
		notes: [LA_HACIENDA_LOOKUP_NOTE, LA_HACIENDA_MENU_NOTE]
	},
	{
		slug: 'popup-bagels-83-mary-st',
		name: 'PopUp Bagels',
		neighborhood: 'Charleston',
		address: '83 Mary St, Charleston, SC 29403',
		phone: '(855) 747-6347',
		rating: 4.2,
		googlePlaceId: 'ChIJ4TB1NKN7_ogRPHyYgeUf59Q',
		type: 'Cafe',
		cuisineSummary: 'Bagels',
		summary: 'Bagel shop making everything in house, with build-your-own bags, schmears, and coffee/drinks.',
		meals: ['Breakfast', 'Lunch'],
		latitude: 32.7905353,
		longitude: -79.9388461,
		resources: [
			{
				label: 'Website',
				href: 'https://popupbagels.com/',
				kind: 'menu',
				menuFlags: [
					{
						tone: 'green',
						note: 'No tree nut ingredients (walnuts, pecans, cashews, pistachios, hazelnuts, etc.) appear anywhere on the menu — bagels (plain, everything, poppy seed, salt, sesame), cream cheese/butter schmears, smoked salmon, and drinks.'
					}
				]
			}
		],
		quotes: [],
		notes: [POPUP_BAGELS_NOTE]
	},
	{
		slug: 'rebel-taqueria',
		name: 'Rebel Taqueria',
		neighborhood: 'North Charleston',
		address: '1809 Reynolds Ave, North Charleston, SC 29405',
		phone: '(843) 619-0104',
		rating: 4.7,
		googlePlaceId: 'ChIJGf8ArSdl_ogRN9Iyk0AkjZQ',
		type: 'Fast casual',
		cuisineSummary: 'Mexican',
		summary: 'Taqueria in North Charleston.',
		meals: ['Lunch', 'Dinner'],
		latitude: 32.8589944,
		longitude: -79.9687377,
		resources: [{ label: 'Website', href: 'http://rebeltaqueria.com/', kind: 'website' }],
		quotes: [
			{
				quote: 'No tree nuts are used in any of our recipes.',
				sourceLabel: 'Email from Lewis Kesaris (Chef/Owner), Rebel Taqueria (May 25)'
			}
		],
		notes: [REBEL_TAQUERIA_NOTE]
	}
];
