<script lang="ts">
	import RestaurantDetail from '$lib/components/RestaurantDetail.svelte';
	import RestaurantMap from '$lib/components/RestaurantMap.svelte';
	import { base } from '$app/paths';
	import type { PageData } from './$types';
	import { getUserReview, loadUserReviews } from '$lib/user-reviews';

	let { data }: { data: PageData } = $props();

	const reviewState = $derived(loadUserReviews(data.reviewState));
</script>

<svelte:head>
	<title>{data.place.name} | Charleston Allergy Eats</title>
	<meta name="description" content={data.place.summary} />
</svelte:head>

<div class="page-shell">
	<a href={`${base}/`} class="back-link">← Back to restaurant list</a>

	<div class="content-grid">
		<div class="detail-column">
			<RestaurantDetail
				place={data.place}
				review={getUserReview(reviewState, data.place.slug)}
				fullPage={true}
			/>
		</div>

		<aside class="side-column">
			<section class="map-card">
				<h2>Map location</h2>
				<div class="map-wrapper">
					<RestaurantMap places={[data.place]} selectedSlug={data.place.slug} />
				</div>
			</section>
		</aside>
	</div>
</div>

<style>
	.page-shell {
		min-height: 100vh;
		padding: 1.5rem;
		display: grid;
		gap: 1.25rem;
	}

	.map-card {
		background: var(--panel-bg);
		border: 1px solid var(--panel-border);
		border-radius: 1.5rem;
		box-shadow: var(--panel-shadow);
	}

	.back-link {
		color: var(--accent);
		text-decoration: none;
		font-weight: 700;
	}

	h2 {
		margin-top: 0;
	}

	.content-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.7fr) minmax(20rem, 0.9fr);
		gap: 1.25rem;
		align-items: start;
	}

	.detail-column,
	.side-column {
		min-width: 0;
	}

	.side-column {
		display: grid;
		gap: 1rem;
		position: sticky;
		top: 1.5rem;
	}

	.map-card {
		padding: 1.2rem;
	}

	.map-card h2 {
		margin-bottom: 0.85rem;
	}

	.map-wrapper {
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid var(--map-frame);
	}

	@media (max-width: 1100px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.side-column {
			position: static;
		}
	}

	@media (max-width: 800px) {
		.page-shell {
			padding: 1rem;
		}
	}
</style>
