<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="reading-width">
	{@render children?.()}
</div>

<style>
	.reading-width {
		max-width: 768px;
		margin-inline: auto;
	}
</style>
