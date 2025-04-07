<script lang="ts">
	import Highlighter from '$lib/components/Highlighter.svelte';
	import { COLORS } from '$lib/color-palette';
	import rehighlightLogo from './rehighlight.svg?raw';

	import { page } from '$app/state';

	const isCurrent = (href: string) => {
		return href === page.url.pathname ? 'page' : false;
	};

	const { onHighlightSeedUpdate }: { onHighlightSeedUpdate: (newSeed: number) => void } = $props();
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
		{@render navlink('/', 'Home', COLORS.mauve)}
		{@render navlink('/work', 'Work', COLORS.teal)}
		{@render navlink('/blog', 'Blog', COLORS.purple)}
		{@render navlink('/about', 'About', COLORS.orange)}
		{@render navlink('/contact', 'Contact', COLORS.blue)}
		<button
			type="button"
			onclick={() => onHighlightSeedUpdate(Math.floor(Math.random() * 1000))}
			class="rehighlight-button"
			title="Reset highlights"
			aria-label="Refresh the text highlights on the page">{@html rehighlightLogo}</button
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

	.rehighlight-button:hover {
		scale: 1.05;
		transition: scale 0.2s ease-in-out;
	}
</style>
