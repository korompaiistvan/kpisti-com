<script lang="ts">
	import { COLORS } from '$lib/color-palette';
	import Preview from '$lib/components/blog/Preview.svelte';
	import Highlighter from '$lib/components/Highlighter.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { type BlogMeta } from '$lib/types';

	const { posts = [] }: { posts?: BlogMeta[] } = $props();
</script>

<Meta
	title="Blog- István Korompai"
	description="Shorter and longer blog posts written by a data vis engineer"
/>
<h2 id="wrote-header">
	things I <Highlighter color={COLORS.blue} text="wrote" markerWidth={24} lines={1} fontSize={32}>
		wrote
	</Highlighter>
</h2>
{#each posts as post}
	<Preview {...post} />
{/each}

<style>
	h2 {
		font-size: 2rem;
		line-height: 1;
		margin-block: 1em;
		text-transform: lowercase;
	}
</style>
