<script lang="ts">
	import type { Snippet } from 'svelte';
	import GlobalStyles from '$lib/components/GlobalStyles.svelte';

	const { children }: { children: Snippet } = $props();
</script>

<GlobalStyles>
	{#if children}
		{@render children()}
	{/if}
</GlobalStyles>
