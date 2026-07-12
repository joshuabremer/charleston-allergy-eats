<script lang="ts">
	import type { DecisionState, Restaurant, UserReview } from '$lib/types';

	let {
		place,
		review,
		fullPage = false
	}: {
		place: Restaurant;
		review: UserReview;
		fullPage?: boolean;
	} = $props();

	const decisionLabels: Record<DecisionState, string> = {
		'ready-to-review': 'Ready to review',
		'needs-more-info': 'Needs more info',
		'awaiting-restaurant-response': 'Awaiting restaurant response',
		approved: 'Approved',
		rejected: 'Rejected'
	};
	const decisionLabel = $derived(decisionLabels[review.decision]);
	const analysisFlags = $derived(
		place.resources.filter((resource) => resource.kind === 'menu').flatMap((resource) => resource.menuFlags ?? [])
	);
</script>

<article class:full-page={fullPage} class="detail-card">
	<header class="detail-header">
		<div>
			<p class="eyebrow">{place.neighborhood}</p>
			<h1>{place.name}</h1>
			{#if place.summary}
				<p class="summary">{place.summary}</p>
			{/if}
		</div>

		<div class="status-field">
			<span>Status</span>
			<p
				class:approved-status={review.decision === 'approved'}
				class:needs-more-info-status={review.decision === 'needs-more-info'}
				class:awaiting-response-status={review.decision === 'awaiting-restaurant-response'}
				class:rejected-status={review.decision === 'rejected'}
				class="status-display"
			>
				{decisionLabel}
			</p>
		</div>
	</header>

	{#if review.decision === 'rejected' && review.rejectionNote}
		<section class="decision-card rejection-note-card">
			<h2>Why this was rejected</h2>
			<p class="rejection-note">{review.rejectionNote}</p>
		</section>
	{/if}

	<section class="meta-grid">
		<div>
			<h2>Quick read</h2>
			<ul>
				<li><strong>Type:</strong> {place.type}</li>
				<li><strong>Food:</strong> {place.cuisineSummary}</li>
				<li><strong>Meals:</strong> {place.meals.join(', ')}</li>
				<li><strong>Address:</strong> {place.address}</li>
				{#if place.phone}
					<li><strong>Phone:</strong> {place.phone}</li>
				{/if}
				{#if place.email}
					<li><strong>Email:</strong> <a href={`mailto:${place.email}`}>{place.email}</a></li>
				{/if}
				{#if place.rating}
					<li><strong>Google rating:</strong> {place.rating.toFixed(1)}</li>
				{/if}
			</ul>
		</div>
	</section>

	<section>
		<h2>Links</h2>
		{#if place.resources.length > 0}
			<div class="link-list">
				{#each place.resources as resource}
					<a href={resource.href} target="_blank" rel="noreferrer" class="link-entry">
						<span class="link-label">{resource.label}</span>
						<span class="link-kind">{resource.kind}</span>
					</a>
				{/each}
			</div>
		{:else}
			<p class="empty-state">No saved links yet. Add menu, website, review, or allergen links in the data files.</p>
		{/if}
	</section>

	{#if analysisFlags.length > 0}
		<section class="analysis-section">
			<h2>Menu analysis</h2>
			<div class="analysis-list">
				{#each analysisFlags as flag}
					<div class:yellow-flag={flag.tone === 'yellow'} class:red-flag={flag.tone === 'red'} class="analysis-flag">
						<span class="analysis-icon" aria-hidden="true">
							{flag.tone === 'green' ? '✅' : flag.tone === 'yellow' ? '⚠️' : '🚩'}
						</span>
						<span>{flag.note}</span>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section>
		<h2>Pull-out quotes</h2>
		{#if place.quotes.length > 0}
			<div class="quote-list">
				{#each place.quotes as quote}
					<blockquote>
						<p>“{quote.quote}”</p>
						<footer>
							{#if quote.href}
								<a href={quote.href} target="_blank" rel="noreferrer">{quote.sourceLabel}</a>
							{:else}
								<span>{quote.sourceLabel}</span>
							{/if}
						</footer>
					</blockquote>
				{/each}
			</div>
		{:else}
			<p class="empty-state">No saved quotes yet.</p>
		{/if}
	</section>
</article>

<style>
	.detail-card {
		display: grid;
		gap: 1.25rem;
		background: var(--panel-bg);
		backdrop-filter: blur(16px);
		border: 1px solid var(--panel-border);
		border-radius: 1.5rem;
		padding: 1.5rem;
		box-shadow: var(--panel-shadow);
		max-height: min(82vh, 72rem);
		overflow: auto;
	}

	.detail-card.full-page {
		max-height: none;
		overflow: visible;
	}

	.detail-header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.75rem, 3vw, 2.35rem);
		line-height: 1.1;
	}

	.summary {
		margin: 0.6rem 0 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.status-field {
		display: grid;
		gap: 0.45rem;
		min-width: 12rem;
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.status-field span {
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.74rem;
	}

	.status-display {
		margin: 0;
		padding: 0.8rem 1rem;
		border-radius: 999px;
		background: var(--status-ready-bg);
		color: var(--status-ready-text);
		line-height: 1.2;
	}

	.status-display.approved-status {
		background: var(--status-approved-bg);
		color: var(--status-approved-text);
	}

	.status-display.needs-more-info-status {
		background: var(--status-needs-bg);
		color: var(--status-needs-text);
	}

	.status-display.awaiting-response-status {
		background: var(--status-awaiting-bg);
		color: var(--status-awaiting-text);
	}

	.status-display.rejected-status {
		background: var(--status-rejected-bg);
		color: var(--status-rejected-text);
	}

	.decision-card {
		display: grid;
		gap: 0.85rem;
		padding: 1rem 1.1rem;
		border-radius: 1rem;
		background: var(--card-bg);
		border: 1px solid var(--card-border);
	}

	.decision-card h2 {
		margin: 0;
	}

	.rejection-note-card {
		gap: 0.55rem;
	}

	.rejection-note {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	ul {
		margin: 0;
		padding-left: 1rem;
		display: grid;
		gap: 0.45rem;
	}

	.quote-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.analysis-list {
		display: grid;
		gap: 0.35rem;
	}

	.analysis-flag {
		margin: 0;
		display: flex;
		align-items: start;
		gap: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--analysis-green);
		padding: 0;
		border: none;
		background: transparent;
	}

	.analysis-flag.yellow-flag {
		color: var(--analysis-yellow);
	}

	.analysis-flag.red-flag {
		color: var(--analysis-red);
	}

	.analysis-icon {
		flex: 0 0 auto;
		line-height: 1.3;
	}

	.link-list {
		display: grid;
		gap: 0.35rem;
	}

	.link-entry {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		padding: 0.2rem 0;
		text-decoration: none;
		color: var(--accent);
		width: fit-content;
	}

	.link-label {
		line-height: 1.4;
	}

	.link-kind {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: none;
		letter-spacing: normal;
	}

	blockquote {
		margin: 0;
		padding: 1rem 1.1rem;
		border-left: 4px solid var(--quote-border);
		border-radius: 0.9rem;
		background: var(--quote-bg);
		flex: 1 1 16rem;
	}

	blockquote p {
		margin: 0 0 0.55rem;
		line-height: 1.6;
		font-style: italic;
	}

	blockquote footer {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.empty-state {
		margin: 0;
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.detail-card {
			max-height: none;
		}

		.detail-header,
		.meta-grid {
			grid-template-columns: 1fr;
			display: grid;
		}
	}
</style>
