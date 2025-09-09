<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Image from '$lib/components/blog/Image.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	import disparityFlowers from './images/disparity-flowers.png?enhanced';
	import meta from './meta';
	import NavigationButton from '$lib/components/NavigationButton.svelte';
	import Body from '$lib/components/blog/Body.svelte';
</script>

<Header>
	<Meta {...meta} thumbnail={meta.thumbnail.img.src} />
	<Title title={meta.title} />
	<p class="collab">
		Collaboration with <span class="author-name">Ivett Kovács</span>
	</p>
</Header>
<Body>
	<Image
		src={disparityFlowers}
		alt="A grid of flowers with 8 petals each, with petals doubled up to form 4 main directions. The design follows a poster format, without a clear overarching message, but the flowers all seem disproportionate, and somehow... sick."
	/>
	<NavigationButton
		href="https://public.tableau.com/app/profile/yvette/viz/GenderEthnicDisparitiesinTechCompanies/GenderEthnicdisparitiesinTechCompanies"
	>
		Open on Tableau Public
	</NavigationButton>
	<p>
		A submission for the actual Viz For Social Good challenge, this workshines a light on the gender
		and ethnic imbalances of US tech companies' workforces, using flowers as the visual metaphor.
	</p>
</Body>

<style>
	.collab {
		font-size: small;
	}
	.author-name {
		font-weight: 500;
	}
</style>
