<script lang="ts">
	import { page } from '$app/state';
	const { title, description, thumbnail }: { title: string; description: string; thumbnail: URL } =
		$props();
	const urlWithoutParams = $derived(page.url.toString().split('?')[0]);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={urlWithoutParams} />
	<meta property="og:title" content={title} />
	<meta property="og:url" content={urlWithoutParams} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={thumbnail.toString()} />
</svelte:head>
