<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		color = 'yellowgreen',
		text = 'default',
		hoverOnly = false,
		children
	}: { color: string; text?: string; hoverOnly?: boolean; children?: Snippet } = $props();
</script>

<span
	class="slot-container"
	style:--background-image="url(/highlight-img?text={encodeURIComponent(
		text
	)}&color={encodeURIComponent(color)})"
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
