<script lang="ts">
	import '../reset.css';
	import '../global.css';

	import { page } from '$app/stores';
	import Highlighter from '$lib/components/Highlighter.svelte';
	import { onMount, setContext, type Snippet } from 'svelte';
	import { COLORS } from '$lib/color-palette';

	const { children }: { children?: Snippet } = $props();

	let highlightSeed = $state(123);
	setContext('highlightSeed', () => highlightSeed);

	let remSize = $state(16);
	onMount(() => {
		// we assume the user does not change the default font size during their visit
		remSize = parseInt(getComputedStyle(document.documentElement).fontSize.slice(0, 2));
		console.log(remSize);
	});
	let backgroundImgUrl = $derived(`url("/background-img?size=${remSize * 2}")`);

	function updateHighlightSeed() {
		highlightSeed = Math.floor(Math.random() * 1000);
	}

	const isCurrent = (href: string) => {
		return href === $page.url.pathname ? 'page' : false;
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<!-- TODO check which weights are actually needed here and remove the rest -->
	<!-- TODO download fonts and include in source for more privacy -->
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Shadows+Into+Light+Two&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

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
<div class="wrapper" style:--background-image={backgroundImgUrl}>
	<div class="container">
		<nav>
			<a class="name-home-link" href="/" aria-current={isCurrent('/')}>István Korompai </a>
			<div class="secondary-links">
				{@render navlink('/', 'Home', COLORS.mauve)}
				{@render navlink('/work', 'Work', COLORS.teal)}
				{@render navlink('/blog', 'Blog', COLORS.purple)}
				{@render navlink('/about', 'About', COLORS.orange)}
				{@render navlink('/contact', 'Contact', COLORS.blue)}
				<button type="button" onclick={updateHighlightSeed}>R</button>
			</div>
		</nav>
		<main>
			{#if children}
				{@render children()}
			{/if}
		</main>
		<footer>
			<p>
				There are no cookies on this website because I value your privacy. Here are a couple links
				instead
			</p>
		</footer>
	</div>
</div>

<style>
	.wrapper {
		margin: 2rem;
		background-image: var(--background-image);
	}

	.container {
		padding: 1rem 0.5rem;
		margin: 2rem auto;
		display: flex;
		min-height: 100dvh;
		flex-direction: column;
	}

	main {
		flex-grow: 1;
	}

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

	footer {
		margin-top: auto;
	}

	@media (min-width: 640px) {
		.container {
			max-width: 640px;
		}
	}

	@media (min-width: 768px) {
		.container {
			max-width: 768px;
		}
	}

	@media (min-width: 1024px) {
		.container {
			max-width: 1024px;
		}
	}

	@media (min-width: 1280px) {
		.container {
			max-width: 1280px;
		}
	}

	@media (min-width: 1536px) {
		.container {
			max-width: 1536px;
		}
	}
</style>
