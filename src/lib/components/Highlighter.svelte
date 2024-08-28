<script lang="ts">
	import { encodeObjectToSearchParams } from '$lib';
	import type { MarkerWidth } from '$lib/highlight-generation';
	import type { Snippet } from 'svelte';

	let {
		color = 'yellowgreen',
		text = 'default',
		hoverOnly = false,
		markerWidth,
		lines,
		children
	}: {
		color: string;
		text?: string;
		hoverOnly?: boolean;
		children?: Snippet;
		markerWidth?: MarkerWidth;
		lines?: number;
	} = $props();

	const urlParamString = encodeObjectToSearchParams({
		text,
		color,
		markerWidth,
		lines
	});
	const backgroundImgUrl = `url("/highlight-img?${urlParamString}")`;
</script>

<span
	class="slot-container"
	style:--background-image={backgroundImgUrl}
	class:hoveronly={hoverOnly}
>
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.slot-container {
		background-size: 100% 100%;
		padding: 0.25em 0.25em;
		background-image: var(--background-image);
	}

	.hoveronly {
		background-image: none;
	}

	.slot-container.hoveronly:hover {
		background-image: var(--background-image);
	}
</style>
