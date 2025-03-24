<script lang="ts">
	import { encodeObjectToSearchParams } from '$lib';
	import {
		calculateHeight,
		estimateWidth,
		hPadding,
		type MarkerWidth
	} from '$lib/highlight-generation';
	import { type Snippet, getContext } from 'svelte';

	let {
		color = 'yellowgreen',
		text = 'default',
		hoverOnly = false,
		fontSize = 12,
		markerWidth,
		lines = 1,
		children
	}: {
		color: string;
		text?: string;
		hoverOnly?: boolean;
		children?: Snippet;
		markerWidth: MarkerWidth;
		lines?: number;
		fontSize?: number;
	} = $props();

	const seedContext = getContext('highlightSeed') as () => number;
	type Seed = ReturnType<typeof seedContext>;
	let seed = $state<Seed>(seedContext());

	const width = estimateWidth(text, fontSize);

	const makeBgImgUrl = (seedParam: Seed) => {
		const urlParams = encodeObjectToSearchParams({
			width,
			color,
			markerWidth,
			lines,
			seed: seedParam
		});
		return `/highlight-img?${urlParams}`;
	};

	const backgroundImgUrl = $derived(`url("${makeBgImgUrl(seed)}")`);

	$effect(() => {
		// prefetch the background image before switching the seed
		// this prevents bg image flashing when the user resets the highlights
		const img = new Image();
		img.onload = () => {
			seed = seedContext();
		};
		img.src = makeBgImgUrl(seedContext());
	});
	const height = calculateHeight(markerWidth, lines, width);
</script>

<span
	class="slot-container"
	style:--background-image={backgroundImgUrl}
	style:--h-padding="{hPadding}em"
	style:background-size="100% {height}px"
	class:hoveronly={hoverOnly}
>
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.slot-container {
		background-repeat: no-repeat;
		background-position: center center;
		padding: var(--h-padding) 0.25em;
		background-image: var(--background-image);
		transition: background-image 0.2s ease-in-out;
	}

	.hoveronly {
		background-image: none;
	}

	.slot-container.hoveronly:hover {
		background-image: var(--background-image);
	}
</style>
