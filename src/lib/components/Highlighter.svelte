<script lang="ts">
	import { encodeObjectToSearchParams } from '$lib';
	import { calculateHeight, hPadding, type MarkerWidth } from '$lib/highlight-generation';
	import type { Snippet } from 'svelte';

	let {
		color = 'yellowgreen',
		text = 'default',
		hoverOnly = false,
		markerWidth,
		lines = 1,
		fontSize,
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

	const urlParamString = encodeObjectToSearchParams({
		text,
		color,
		markerWidth,
		fontSize,
		lines
	});
	const backgroundImgUrl = `url("/highlight-img?${urlParamString}")`;
	const height = calculateHeight(markerWidth, lines);
</script>

<span
	class="slot-container"
	style:--background-image={backgroundImgUrl}
	style:--h-padding={hPadding}
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
		background-position: bottom 0.25em center;
		padding: 0.25em var(--h-padding) 0 var(--h-padding);
		background-image: var(--background-image);
	}

	.hoveronly {
		background-image: none;
	}

	.slot-container.hoveronly:hover {
		background-image: var(--background-image);
	}
</style>
