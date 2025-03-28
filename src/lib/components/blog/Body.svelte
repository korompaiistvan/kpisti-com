<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="body">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.body {
		max-width: 720px;
		margin-inline: auto;
	}

	.body > :global(p) {
		line-height: 1.6;
		margin-block: 1em;
	}

	.body > :global(h2) {
		font-size: x-large;
		margin-bottom: 1em;
	}

	.body :global(a) {
		color: inherit;
		font-style: italic;
		text-underline-offset: 2px;
	}
</style>
