<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { themeMode, type ThemeMode } from '$lib/theme';

	let { children } = $props();

	let theme = $state<ThemeMode>('light');

	onMount(() => {
		if (!browser) {
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const syncTheme = () => {
			theme = mediaQuery.matches ? 'dark' : 'light';
		};

		syncTheme();
		mediaQuery.addEventListener('change', syncTheme);

		return () => {
			mediaQuery.removeEventListener('change', syncTheme);
		};
	});

	$effect(() => {
		if (!browser) {
			return;
		}

		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
		themeMode.set(theme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		--bg-gradient: linear-gradient(180deg, #fff7ed 0%, #eff6ff 38%, #f8fafc 100%);
		--text-primary: #0f172a;
		--text-secondary: #334155;
		--text-muted: #64748b;
		--panel-bg: rgb(255 255 255 / 0.9);
		--panel-muted-bg: rgb(248 250 252 / 0.92);
		--panel-border: rgb(226 232 240 / 0.92);
		--panel-shadow: 0 20px 50px rgb(15 23 42 / 0.12);
		--panel-shadow-soft: 0 16px 40px rgb(15 23 42 / 0.08);
		--panel-shadow-strong: 0 24px 60px rgb(15 23 42 / 0.16);
		--input-bg: #ffffff;
		--input-border: #cbd5e1;
		--accent: #1d4ed8;
		--accent-strong: #1e40af;
		--chip-bg: #e2e8f0;
		--chip-text: #0f172a;
		--chip-info-bg: #eff6ff;
		--chip-info-text: #1d4ed8;
		--chip-personal-bg: #ede9fe;
		--chip-personal-text: #6d28d9;
		--chip-empty-bg: #f1f5f9;
		--chip-empty-text: #64748b;
		--status-approved-bg: #dcfce7;
		--status-approved-text: #166534;
		--status-rejected-bg: #fee2e2;
		--status-rejected-text: #b91c1c;
		--status-ready-bg: #e2e8f0;
		--status-ready-text: #475569;
		--status-needs-bg: #fef3c7;
		--status-needs-text: #92400e;
		--status-awaiting-bg: #ede9fe;
		--status-awaiting-text: #6d28d9;
		--analysis-green: #166534;
		--analysis-yellow: #92400e;
		--analysis-red: #b91c1c;
		--danger-bg: #fee2e2;
		--danger-text: #b91c1c;
		--button-secondary-bg: #e2e8f0;
		--button-secondary-text: #0f172a;
		--quote-bg: #ffffff;
		--quote-border: #1d4ed8;
		--map-shell-bg: #dbeafe;
		--map-frame: #dbeafe;
		--card-bg: #ffffff;
		--card-border: #e2e8f0;
		--card-hover-border: #93c5fd;
		--card-hover-border-strong: #60a5fa;
		--card-hover-shadow: 0 12px 30px rgb(37 99 235 / 0.14);
		--card-hover-shadow-strong: 0 16px 36px rgb(37 99 235 / 0.18);
		--map-control-bg: #ffffff;
		--map-control-text: #0f172a;
		--map-control-shadow: 0 12px 30px rgb(15 23 42 / 0.16);
		--marker-approved-bg: #ffffff;
		--marker-approved-border: #16a34a;
		--marker-approved-selected-border: #1d4ed8;
		--marker-ready-bg: #ffffff;
		--marker-ready-border: #d97706;
		--marker-ready-selected-border: #1d4ed8;
	}

	:global(:root[data-theme='dark']) {
		--bg-gradient: linear-gradient(180deg, #0f172a 0%, #111827 48%, #020617 100%);
		--text-primary: #e5eefc;
		--text-secondary: #cbd5e1;
		--text-muted: #94a3b8;
		--panel-bg: rgb(15 23 42 / 0.88);
		--panel-muted-bg: rgb(15 23 42 / 0.92);
		--panel-border: rgb(51 65 85 / 0.95);
		--panel-shadow: 0 20px 50px rgb(2 6 23 / 0.42);
		--panel-shadow-soft: 0 16px 40px rgb(2 6 23 / 0.34);
		--panel-shadow-strong: 0 24px 60px rgb(2 6 23 / 0.5);
		--input-bg: #0f172a;
		--input-border: #334155;
		--accent: #93c5fd;
		--accent-strong: #60a5fa;
		--chip-bg: #1e293b;
		--chip-text: #e2e8f0;
		--chip-info-bg: rgb(30 64 175 / 0.22);
		--chip-info-text: #bfdbfe;
		--chip-personal-bg: rgb(109 40 217 / 0.22);
		--chip-personal-text: #ddd6fe;
		--chip-empty-bg: #1e293b;
		--chip-empty-text: #94a3b8;
		--status-approved-bg: rgb(22 163 74 / 0.18);
		--status-approved-text: #86efac;
		--status-rejected-bg: rgb(185 28 28 / 0.18);
		--status-rejected-text: #fca5a5;
		--status-ready-bg: #1e293b;
		--status-ready-text: #cbd5e1;
		--status-needs-bg: rgb(146 64 14 / 0.22);
		--status-needs-text: #fcd34d;
		--status-awaiting-bg: rgb(91 33 182 / 0.22);
		--status-awaiting-text: #ddd6fe;
		--analysis-green: #86efac;
		--analysis-yellow: #fcd34d;
		--analysis-red: #fca5a5;
		--danger-bg: rgb(185 28 28 / 0.18);
		--danger-text: #fca5a5;
		--button-secondary-bg: #1e293b;
		--button-secondary-text: #e2e8f0;
		--quote-bg: #0f172a;
		--quote-border: #60a5fa;
		--map-shell-bg: #0b1220;
		--map-frame: #1e3a8a;
		--card-bg: #0f172a;
		--card-border: #334155;
		--card-hover-border: #60a5fa;
		--card-hover-border-strong: #93c5fd;
		--card-hover-shadow: 0 12px 30px rgb(37 99 235 / 0.22);
		--card-hover-shadow-strong: 0 16px 36px rgb(96 165 250 / 0.24);
		--map-control-bg: #0f172a;
		--map-control-text: #e2e8f0;
		--map-control-shadow: 0 12px 30px rgb(2 6 23 / 0.42);
		--marker-approved-bg: #0f172a;
		--marker-approved-border: #22c55e;
		--marker-approved-selected-border: #93c5fd;
		--marker-ready-bg: #0f172a;
		--marker-ready-border: #f59e0b;
		--marker-ready-selected-border: #93c5fd;
	}

	:global(html),
	:global(body) {
		margin: 0;
		min-height: 100%;
	}

	:global(body) {
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: var(--bg-gradient);
		color: var(--text-primary);
		transition:
			background 180ms ease,
			color 180ms ease;
	}

	:global(*) {
		box-sizing: border-box;
	}

</style>
