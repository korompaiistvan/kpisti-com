<script lang="ts">
	import { encodeObjectToSearchParams } from '$lib';
	import {
		calculateHeight,
		estimateWidth,
		hPadding,
		type MarkerWidth
	} from '$lib/highlight-generation';
	import type { Snippet } from 'svelte';

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

	const width = estimateWidth(text, fontSize);

	const urlParamString = encodeObjectToSearchParams({
		width,
		color,
		markerWidth,
		lines
	});
	const backgroundImgUrl = `url("/highlight-img?${urlParamString}")`;
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
	}

	.hoveronly {
		background-image: none;
	}

	.slot-container.hoveronly:hover {
		background-image: var(--background-image);
	}
</style>
