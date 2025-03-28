<script lang="ts">
	import { page } from '$app/state';
	const {
		title,
		description,
		thumbnail,
		canonicalUrl
	}: { title: string; description: string; thumbnail?: string; canonicalUrl?: string } = $props();
	const urlWithoutParams = $derived(page.url.toString().split('?')[0]);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl || urlWithoutParams} />
	<meta property="og:title" content={title} />
	<meta property="og:url" content={urlWithoutParams} />
	<meta property="og:description" content={description} />
	{#if thumbnail}
		<meta property="og:image" content={thumbnail} />
	{/if}
</svelte:head>
