<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Image from '$lib/components/blog/Image.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	import baliPostcard from './images/bali-postcard.png?enhanced';
	import meta from './meta';
	import NavigationButton from '$lib/components/NavigationButton.svelte';
</script>

<Header>
	<Meta {...meta} thumbnail={meta.thumbnail.img.src} />
	<Title title={meta.title} />
	<p class="collab">
		Work by <span class="author-name">Júlia Borsi</span>, with collaboration from István Korompai
	</p>

	<Image
		src={baliPostcard}
		alt="A blue map of the island of Bali swimming in a pink ocean. On the blue, white dots mark locations but the map is unclear about what these locations might be"
	/>
	<NavigationButton
		href="https://public.tableau.com/app/profile/julia.borsi/viz/GreetingsfromBali/Postcard"
	>
		Open on Tableau Public
	</NavigationButton>
</Header>

<style>
	.collab {
		font-size: small;
	}
	.author-name {
		font-weight: 500;
	}
</style>
