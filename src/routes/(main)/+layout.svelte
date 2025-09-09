<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	import GlobalStyles from '$lib/components/GlobalStyles.svelte';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	const { children }: { children?: Snippet } = $props();

	let highlightSeed = $state(123);
	setContext('highlightSeed', () => highlightSeed);

	function updateHighlightSeed(newSeed: number) {
		highlightSeed = newSeed;
	}
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

<GlobalStyles>
	<div class="wrapper">
		<div class="inner-wrapper">
			<Header onHighlightSeedUpdate={updateHighlightSeed} />
			<main>
				{@render children?.()}
			</main>
			<Footer />
		</div>
	</div>
</GlobalStyles>

<style>
	@property --bg-grid-size {
		/* for some reason syntax: <length> did not seem to work */
		syntax: '*';
		inherits: false;
		initial-value: 2rem;
	}

	* {
		font-family: 'DM Sans', sans-serif;
		font-variant: common-ligatures tabular-nums;
		/* outline: 1px solid rgba(0, 255, 0, 0.5); */
	}

	.wrapper {
		color: #033a7d;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	.inner-wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		background-image: url('/background-img');
		background-size: calc(var(--bg-grid-size) * 4) calc(var(--bg-grid-size) * 4);
		padding: calc(var(--bg-grid-size) * 0.5);

		@media (min-width: 768px) {
			margin: 2rem;
		}
	}

	main {
		flex-grow: 1;
		padding-top: calc(0.5 * var(--bg-grid-size));
	}
</style>
