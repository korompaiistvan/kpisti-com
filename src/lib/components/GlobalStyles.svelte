<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/reset.css';
	import '$lib/global.css';

	const { children }: { children: Snippet } = $props();
</script>

{#if children}
	{@render children()}
{/if}
