<script lang="ts">
	import Highlighter from '$lib/components/Highlighter.svelte';
	import { COLORS } from '$lib/color-palette';
	import rehighlightLogo from './rehighlight.svg?raw';

	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { curveStepBefore } from 'd3-shape';

	const isCurrent = (href: string) => {
		return href === page.url.pathname ? 'page' : false;
	};

	const { onHighlightSeedUpdate }: { onHighlightSeedUpdate: (newSeed: number) => void } = $props();

	let mobileMenuOpen = $state(false);

	afterNavigate(() => (mobileMenuOpen = false));

	const toggleMobileMenuOpen = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};
</script>

{#snippet navlink(href: string, text: string, color: string)}
	<a {href} aria-current={isCurrent(href)} class="nav-link">
		<Highlighter
			{color}
			{text}
			hoverOnly={isCurrent(href) !== 'page'}
			markerWidth={24}
			fontSize={16}
			><span>
				{text}
			</span>
		</Highlighter>
	</a>
	<style>
		.nav-link {
			text-decoration: none;
			color: unset;
			font-family: 'DM Mono', monospace;
			text-decoration: none;
			text-transform: uppercase;
			color: unset;
		}
	</style>
{/snippet}

<nav>
	<a class="name-home-link" href="/" aria-current={isCurrent('/')}>István Korompai </a>
	<div class="secondary-links">
		<div class="secondary-nav-links mobile-menu" data-open={mobileMenuOpen}>
			<button
				type="button"
				aria-label="Close Menu"
				class="mobile-menu-close-btn"
				onclick={toggleMobileMenuOpen}>X</button
			>
			{@render navlink('/', 'Home', COLORS.mauve)}
			{@render navlink('/work', 'Work', COLORS.teal)}
			{@render navlink('/blog', 'Blog', COLORS.purple)}
			{@render navlink('/about', 'About', COLORS.orange)}
			{@render navlink('/contact', 'Contact', COLORS.blue)}
		</div>
		<button
			type="button"
			onclick={() => onHighlightSeedUpdate(Math.floor(Math.random() * 1000))}
			class="rehighlight-button"
			title="Reset highlights"
			aria-label="Refresh the text highlights on the page">{@html rehighlightLogo}</button
		>
		<button
			type="button"
			aria-label="Open Nav Menu"
			class="mobile-menu-open-btn"
			onclick={toggleMobileMenuOpen}>☰</button
		>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 0.25rem 1rem;
		font-size: 1rem;
		max-height: 3rem;
	}

	.name-home-link {
		text-decoration: none;
		color: unset;
		font-family: 'DM Mono', monospace;
		text-decoration: none;
		text-transform: uppercase;
		color: unset;
	}

	.secondary-links {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.rehighlight-button {
		cursor: pointer;
	}

	.rehighlight-button:hover {
		scale: 1.05;
		transition: scale 0.2s ease-in-out;
	}

	.mobile-menu-open-btn {
		font-size: x-large;
		cursor: pointer;
		margin-top: -0.12em;
	}

	.mobile-menu-close-btn {
		position: absolute;
		cursor: pointer;
		right: var(--bg-grid-size);
		top: var(--bg-grid-size);
	}

	.mobile-menu {
		display: grid;
		place-content: center;
		gap: var(--bg-grid-size);
		position: absolute;
		z-index: 1;
		inset: 0;
		width: 100%;
		transition: transform 0.5s ease-in-out;
		background-color: white;
		padding: calc(0.25 * var(--bg-grid-size));
		&[data-open='true'] {
			transform: translateY(0);
		}

		&[data-open='false'] {
			transform: translateY(-100%);
		}
	}

	@media (min-width: 768px) {
		.mobile-menu-open-btn {
			display: none;
		}

		.mobile-menu-close-btn {
			display: none;
		}

		.mobile-menu {
			display: block;
			position: unset;
			width: auto;
			background-color: unset;
			&[data-open] {
				transform: unset;
			}
		}
	}
</style>
