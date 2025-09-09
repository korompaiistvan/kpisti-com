<script lang="ts">
	import Body from '$lib/components/blog/Body.svelte';
	import Divider from '$lib/components/blog/Divider.svelte';
	import Header from '$lib/components/Header.svelte';
	import Image from '$lib/components/blog/Image.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	// @ts-expect-error the url params are not currently recognized by ts for nehanced img in svelte
	import a11yIntro from './images/a11y-intro.webp?enhanced&aspect=16:9';
	import meta from './meta';
</script>

<Header>
	<Meta {...meta} thumbnail={meta.thumbnail.img.src} />
	<Title title={meta.title} />
	<p class="collab">
		Collaboration with <span class="author-name">Boglárka Göttli</span>,
		<span class="author-name"> Bianka Csuzdi </span>, <span class="author-name">Hanna Békefi</span>
		&
		<span class="author-name">Júlia Borsi</span>
	</p>

	<Image
		src={a11yIntro}
		alt="Illustration of low vision represented by an eye, accessible color palette showing red, orange and blue, keyboard navigation shown with shift and control buttons and an icon for play."
	/>
</Header>

<Body>
	<p>
		When it comes to designing with data, accessibility is a factor that is critical to ensuring
		easy and deep engagement—yet it is often overlooked. That is why my colleagues and I decided to
		write a series of posts on how to tackle data viz accessibility in the business intelligence
		context.
	</p>
	<Divider />
	<h2>Part 1 - The What</h2>
	<p>A description of disabilities, techniques and standards based on existing guidelinesrts.</p>
	<a href="https://thevizcollective.starschema.com/posts/accessibility-and-data-visualization">
		Go to Blog Post
	</a>

	<h2>Part 2 - The How</h2>
	<p>
		A Practical Guide for Accessibility in Business Intelligence Tools - Approaches and
		possibilities for applying techniques described in the first post in Tableau and Power BI
	</p>
	<a
		href="https://thevizcollective.starschema.com/posts/a-practical-guide-for-accessibility-in-business-intelligence-tools"
	>
		Go to Blog Post
	</a>

	<h2>Part 3 - The Why</h2>
	<p>
		A plea to data leaders to invest in dataviz accessibility — spoiler: it makes total business
		sense
	</p>
	<a
		href="https://thevizcollective.starschema.com/posts/investing-in-dataviz-accessibility-pays-off"
	>
		Go to Blog Post
	</a>
</Body>

<style>
	.collab {
		font-size: small;
	}
	.author-name {
		font-weight: 500;
	}

	h2 {
		margin-top: 1.5em;
	}
</style>
