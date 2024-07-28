<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		color = 'yellowgreen',
		text,
		children
	}: { color: string; text?: string; children?: Snippet } = $props();
</script>

<span
	class="slot-container"
	style="background-image: url(/highlight-img?text={text
		? encodeURIComponent(text)
		: 'default'}&color={color})"
>
	{#if children}
		{@render children()}
	{/if}
</span>

<style>
	.slot-container {
		background-size: 100% 100%;
		padding: 0.25em 0.25em;
		display: inline-block;
	}
</style>
