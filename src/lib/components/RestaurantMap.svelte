<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type * as Leaflet from 'leaflet';
	import { themeMode } from '$lib/theme';
	import type { DecisionState, Restaurant } from '$lib/types';

	let {
		places,
		selectedSlug = null,
		onSelect,
		initialCenter,
		initialZoom,
		markerDecisions = {},
		centerOnSelected = false,
		showCurrentLocation = false
	}: {
		places: Restaurant[];
		selectedSlug?: string | null;
		onSelect?: (slug: string) => void;
		initialCenter?: [number, number];
		initialZoom?: number;
		markerDecisions?: Partial<Record<string, DecisionState>>;
		centerOnSelected?: boolean;
		showCurrentLocation?: boolean;
	} = $props();

	const DEFAULT_CENTER: [number, number] = [32.88210247032013, -79.98518416372016];

	let mapElement: HTMLDivElement | null = null;
	let leaflet: typeof Leaflet | null = null;
	let map: Leaflet.Map | null = null;
	let markersLayer: Leaflet.LayerGroup | null = null;
	let tileLayer: Leaflet.TileLayer | null = null;
	let labelTileLayer: Leaflet.TileLayer | null = null;
	let hasAppliedInitialViewport = false;
	let appliedTheme: 'light' | 'dark' | null = null;
	let currentLocation = $state<[number, number] | null>(null);
	let geolocationWatchId: number | null = null;

	onMount(() => {
		if (!mapElement) {
			return;
		}

		void initializeMap();

		return () => {
			stopCurrentLocationTracking();
			map?.remove();
			map = null;
			markersLayer = null;
			hasAppliedInitialViewport = false;
		};
	});

	$effect(() => {
		places;
		selectedSlug;
		markerDecisions;
		currentLocation;
		renderMarkers();
	});

	$effect(() => {
		$themeMode;
		syncTileLayer();
	});

	$effect(() => {
		places;
		initialCenter;
		initialZoom;
		syncViewport();
	});

	$effect(() => {
		places;
		selectedSlug;
		centerOnSelected;
		focusSelectedPlace();
	});

	$effect(() => {
		showCurrentLocation;
		syncCurrentLocationTracking();
	});

	function renderMarkers() {
		if (!leaflet || !map || !markersLayer) {
			return;
		}

		markersLayer.clearLayers();

		if (currentLocation) {
			addCurrentLocationMarker();
		}

		for (const place of places) {
			addMarker(place);
		}
	}

	function syncViewport() {
		if (!leaflet || !map) {
			return;
		}

		if (places.length === 0) {
			map.setView(DEFAULT_CENTER, 12);
			return;
		}

		if (places.length === 1) {
			map.setView([places[0].latitude, places[0].longitude], 14);
			return;
		}

		const bounds = leaflet.latLngBounds([]);

		for (const place of places) {
			bounds.extend([place.latitude, place.longitude]);
		}

		if (initialCenter && initialZoom && !hasAppliedInitialViewport) {
			map.setView(initialCenter, initialZoom, { animate: false });
			hasAppliedInitialViewport = true;
			return;
		}

		map.fitBounds(bounds.pad(0.2), { animate: false });
	}

	function focusSelectedPlace() {
		if (!map || !centerOnSelected || !selectedSlug) {
			return;
		}

		const selectedPlace = places.find((place) => place.slug === selectedSlug);

		if (!selectedPlace) {
			return;
		}

		map.setView([selectedPlace.latitude, selectedPlace.longitude], Math.max(map.getZoom(), 15), {
			animate: true,
			duration: 0.35
		});
	}

	function addMarker(place: Restaurant) {
		if (!leaflet || !markersLayer) {
			return;
		}

		const isSelected = place.slug === selectedSlug;
		const decision = markerDecisions[place.slug];
		let marker: Leaflet.Marker | Leaflet.CircleMarker;

		if (decision === 'approved') {
			marker = leaflet.marker([place.latitude, place.longitude], {
				icon: leaflet.divIcon({
					className: 'approved-marker-wrapper',
					html: `<div class="approved-marker${isSelected ? ' selected' : ''}">✅</div>`,
					iconSize: [28, 28],
					iconAnchor: [14, 14]
				})
			});
		} else if (decision === 'ready-to-review' || decision === undefined) {
			marker = leaflet.marker([place.latitude, place.longitude], {
				icon: leaflet.divIcon({
					className: 'ready-marker-wrapper',
					html: `<div class="ready-marker${isSelected ? ' selected' : ''}">❓</div>`,
					iconSize: [28, 28],
					iconAnchor: [14, 14]
				})
			});
		} else {
			marker = leaflet.circleMarker([place.latitude, place.longitude], {
				radius: isSelected ? 11 : 8,
				fillColor: isSelected ? '#1d4ed8' : '#f97316',
				color: '#ffffff',
				weight: 2,
				fillOpacity: 0.95
			});
		}

		marker.bindTooltip(`${place.name} • ${place.neighborhood}`, {
			direction: 'top',
			offset: [0, -4]
		});

		marker.on('click', () => onSelect?.(place.slug));
		marker.addTo(markersLayer);
	}

	function addCurrentLocationMarker() {
		if (!leaflet || !markersLayer || !currentLocation) {
			return;
		}

		const marker = leaflet.marker(currentLocation, {
			icon: leaflet.divIcon({
				className: 'current-location-marker-wrapper',
				html: '<div class="current-location-marker"></div>',
				iconSize: [18, 18],
				iconAnchor: [9, 9]
			})
		});

		marker.bindTooltip('Your location', {
			direction: 'top',
			offset: [0, -6]
		});

		marker.addTo(markersLayer);
	}

	async function initializeMap() {
		if (!mapElement) {
			return;
		}

		leaflet = await import('leaflet');
		map = leaflet.map(mapElement, {
			attributionControl: false,
			scrollWheelZoom: true,
			zoomControl: false
		});

		leaflet.control.zoom({ position: 'bottomright' }).addTo(map);
		syncTileLayer();
		markersLayer = leaflet.layerGroup().addTo(map);
		renderMarkers();
		syncViewport();
		syncCurrentLocationTracking();
	}

	function syncTileLayer() {
		if (!leaflet || !map) {
			return;
		}

		if (appliedTheme === $themeMode && tileLayer) {
			return;
		}

		appliedTheme = $themeMode;

		if (tileLayer) {
			map.removeLayer(tileLayer);
		}

		if (labelTileLayer) {
			map.removeLayer(labelTileLayer);
			labelTileLayer = null;
		}

		if ($themeMode === 'dark') {
			tileLayer = leaflet.tileLayer(
				'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
				{
					maxZoom: 19,
					subdomains: 'abcd'
				}
			);
			labelTileLayer = leaflet.tileLayer(
				'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
				{
					maxZoom: 19,
					subdomains: 'abcd',
					pane: 'overlayPane'
				}
			);
		} else {
			tileLayer = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19
			});
		}

		tileLayer.addTo(map);
		labelTileLayer?.addTo(map);
	}

	function centerOnCurrentLocation() {
		if (!map) {
			return;
		}

		if (!currentLocation) {
			requestCurrentLocation();
			return;
		}

		map.setView(currentLocation, initialZoom ?? Math.max(map.getZoom(), 15), {
			animate: true,
			duration: 0.35
		});
	}

	function syncCurrentLocationTracking() {
		if (!browser || !navigator.geolocation || !showCurrentLocation) {
			stopCurrentLocationTracking();
			currentLocation = null;
			return;
		}

		if (geolocationWatchId !== null) {
			return;
		}

		geolocationWatchId = navigator.geolocation.watchPosition(
			(position) => {
				currentLocation = [position.coords.latitude, position.coords.longitude];
			},
			(error) => {
				console.warn('Unable to read current location for map view.', error);
				stopCurrentLocationTracking();
			},
			{
				enableHighAccuracy: true,
				maximumAge: 60_000,
				timeout: 10_000
			}
		);
	}

	function requestCurrentLocation() {
		if (!browser || !navigator.geolocation) {
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				currentLocation = [position.coords.latitude, position.coords.longitude];
				centerOnCurrentLocation();
			},
			(error) => {
				console.warn('Unable to center on current location.', error);
			},
			{
				enableHighAccuracy: true,
				maximumAge: 0,
				timeout: 10_000
			}
		);
	}

	function stopCurrentLocationTracking() {
		if (!browser || geolocationWatchId === null) {
			return;
		}

		navigator.geolocation.clearWatch(geolocationWatchId);
		geolocationWatchId = null;
	}
</script>

<div class="map-shell">
	<div bind:this={mapElement} class="map"></div>

	{#if showCurrentLocation}
		<button
			type="button"
			class="current-location-button"
			onclick={centerOnCurrentLocation}
			aria-label="Center map on current location"
			title="Center on my location"
		>
			<svg viewBox="0 0 24 24" aria-hidden="true" class="current-location-icon">
				<path d="M21.5 3.5 14.2 20a1 1 0 0 1-1.86-.1l-1.72-6.31-6.31-1.72a1 1 0 0 1-.1-1.86L20.5 2.5a.75.75 0 0 1 1 .99Z" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.map-shell {
		position: relative;
		height: 100%;
	}

	.map {
		height: 100%;
		width: 100%;
		min-height: 32rem;
	}

	.current-location-button {
		position: absolute;
		right: 0.9rem;
		top: 0.9rem;
		z-index: 700;
		border: none;
		border-radius: 999px;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		background: rgb(255 255 255 / 0.94);
		color: var(--text-primary);
		font: inherit;
		box-shadow: var(--panel-shadow-soft);
		backdrop-filter: blur(12px);
		cursor: pointer;
		display: grid;
		place-items: center;
	}

	.current-location-icon {
		width: 1rem;
		height: 1rem;
		fill: currentColor;
	}

	:global(.leaflet-control-zoom) {
		border: none !important;
		box-shadow: var(--map-control-shadow) !important;
	}

	:global(.leaflet-control-zoom a) {
		color: var(--map-control-text) !important;
		background: var(--map-control-bg) !important;
		border-color: var(--panel-border) !important;
	}

	:global(.leaflet-tooltip) {
		background: var(--panel-bg);
		color: var(--text-primary);
		border: 1px solid var(--panel-border);
		box-shadow: var(--panel-shadow-soft);
	}

	:global(.leaflet-tooltip-top:before) {
		border-top-color: var(--panel-border);
	}

	:global(.approved-marker-wrapper) {
		background: transparent;
		border: none;
	}

	:global(.approved-marker) {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 999px;
		background: var(--marker-approved-bg);
		border: 2px solid var(--marker-approved-border);
		box-shadow: 0 10px 24px rgb(22 163 74 / 0.24);
		font-size: 0.95rem;
		line-height: 1;
	}

	:global(.approved-marker.selected) {
		border-color: var(--marker-approved-selected-border);
		box-shadow: 0 10px 24px rgb(29 78 216 / 0.28);
	}

	:global(.ready-marker-wrapper) {
		background: transparent;
		border: none;
	}

	:global(.ready-marker) {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 999px;
		background: var(--marker-ready-bg);
		border: 2px solid var(--marker-ready-border);
		box-shadow: 0 10px 24px rgb(217 119 6 / 0.24);
		font-size: 0.95rem;
		line-height: 1;
	}

	:global(.ready-marker.selected) {
		border-color: var(--marker-ready-selected-border);
		box-shadow: 0 10px 24px rgb(29 78 216 / 0.28);
	}

	:global(.current-location-marker-wrapper) {
		background: transparent;
		border: none;
	}

	:global(.current-location-marker) {
		width: 1rem;
		height: 1rem;
		border-radius: 999px;
		background: #2563eb;
		border: 3px solid rgb(255 255 255 / 0.95);
		box-shadow:
			0 0 0 6px rgb(37 99 235 / 0.2),
			0 10px 24px rgb(37 99 235 / 0.24);
	}
</style>
