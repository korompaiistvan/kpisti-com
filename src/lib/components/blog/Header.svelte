<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="header">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.header {
		margin-bottom: calc(var(--bg-grid-size));
	}
</style>
