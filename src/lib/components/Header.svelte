<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="header">
	{@render children?.()}
</div>

<style>
	.header {
		margin-bottom: calc(var(--bg-grid-size));
	}
</style>
