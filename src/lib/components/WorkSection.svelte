<script lang="ts">
	import { COLORS } from '$lib/color-palette';
	import Preview from '$lib/components/blog/Preview.svelte';
	import Highlighter from '$lib/components/Highlighter.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { type BlogMeta } from '$lib/types';

	const { posts = [] }: { posts?: BlogMeta[] } = $props();
</script>

<Meta
	title="Work - István Korompai"
	description="The public works of data vis engineer, István Korompai"
/>
<h2 id="made-header">
	stuff I <Highlighter color={COLORS.pink} text="made" markerWidth={24} fontSize={32} lines={1}
		>made</Highlighter
	>
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
