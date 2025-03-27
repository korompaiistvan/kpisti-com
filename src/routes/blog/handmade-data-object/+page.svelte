<script lang="ts">
	import Image from '$lib/components/blog/Image.svelte';
	import Meta from '$lib/components/blog/Meta.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	import thumbnail from './images/overhead.png?enhanced';
	const title = "What's a handmade data object anyways";
	const canonicalUrl = 'https://nightingaledvs.com/whats-a-handmade-data-object-anyway/';
	const description = `This post tells the story of our most recent collaborative experimentation with what we’ve seen referred to as “analog data art” or “handmade data objects” — read on to find out how we ended up hunched over old watch parts to create this physical data visualization`;
</script>

<Meta {title} {description} {canonicalUrl} />
<Title {title} />
<Image
	src={thumbnail}
	alt="Overhead shot showing two watch faces situated to the left and right of the middle of a sheet of paper. Around both faces run three circles of five types of watch parts corresponding to different activities. Handwritten annotations help to discern the meaning of each part, highlighting differences between the authors’ days, like how “unpaid work” for Tomi means getting up at night for his children, while for Julcsi it’s studying Japanese and for Pisti it’s cooking."
/>
