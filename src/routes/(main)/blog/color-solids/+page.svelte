<script lang="ts">
	import Body from '$lib/components/blog/Body.svelte';
	import Divider from '$lib/components/blog/Divider.svelte';
	import Title from '$lib/components/blog/Title.svelte';
	import Header from '$lib/components/Header.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import ColorMatchingFunctions from './ColorMatchingFunctions.svelte';
	import meta from './meta';
	import SpdToColor from './SPDToColor.svelte';
	import Spectrum from './Spectrum.svelte';
	import { VISIBLE_RANGE } from './utils/color';
</script>

<Header>
	<Meta {...meta} thumbnail={meta.thumbnail.img.src} />
	<Title title={meta.title} />
</Header>

<Body>
	<p>
		I love color theory. Okay, maybe love is a strong word, but ever since seeing people run around
		with Munsell color charts in architecture school, I was captivated by the tempting simplicity of
		setting up a couple mathematical rules and getting something beautiful and harmonical out of it.
		( I wish there was a profession dedicated to that intersection.)
	</p>

	<Divider />
	<h2>A teensy bit of theory</h2>

	<p>
		I often feel a bit too preoccupied with theory for my - or anyone else's - good, but this post
		serves two purposes: on the one hand, it's a summary of the main theoretical points, mostly for
		myself. On the other, it's a way to build intuition about a topic that is suuuper difficult to
		explain just in words.
	</p>
	<p>
		But to know what we are looking at later on, we need words for a couple concepts, and that
		involves a bit of theory.
	</p>

	<h3>What even are colors?</h3>
	<p>
		Technically speaking, colors are not "physically real". They are the <em> perception</em>
		created by our optical and nervous system when <em>light</em> hits the <em>cone cells</em> in our
		eyes. "Okay, smartypants, if they are not real, how come we can turn them into numbers?"
	</p>

	<p>Well, let's take a look at a couple components of this system</p>

	<h3>Visible Light</h3>

	<p>
		Our eyes can detect electromagnetic waves with wavelengths between 380 to 750 nanometers, i.e.
		the visible spectrum of light.
	</p>

	<figure>
		<div class="spectrum-container">
			<Spectrum />
		</div>
		<div class="spectrum-legend">
			<span class="tick-label">{VISIBLE_RANGE[0]} nm</span>
			<span class="tick-label">{VISIBLE_RANGE[1]} nm</span>
		</div>
		<figcaption>
			The ends of the visible spectrum are practically black, because our eyes barely perceive those
			wavelengths.
		</figcaption>
	</figure>

	<p>The light hitting our eyes is most often a mix of multiple different wavelengths</p>
	<h3>Cone cells</h3>

	<p>
		On our retinas, there are 3 types of so-called cone cells, responsible for color detection in
		bright light. Each of these can detect different wavelengths.
	</p>

	<figure>
		<div class="cmf-container">
			<div class="cmf-spectrum">
				<Spectrum />
			</div>
			<div class="cmf-lines">
				<ColorMatchingFunctions />
			</div>
		</div>
		<figcaption>
			These three lines roughly correspond to the sensitivities of each type of cone cell. It is
			clearly visible how sensitivity tapers off towards the ends of the spectrum.
		</figcaption>
	</figure>
	<h3>Perception</h3>

	<p>
		Once light hits the retina, the color sensing cells create electrical signals which get
		translated into the experience of color in our brains. The responses from the three types of
		cone cells are combined into a single mix. The wavelengths contained in the light drive which
		cone cells activate, which our brain then interprets into a single color sensation.
	</p>

	<SpdToColor />
</Body>

<style>
	.spectrum-container {
		height: 40px;
		border-radius: 6px;
		overflow: hidden;
	}

	.spectrum-legend {
		display: flex;
		justify-content: space-between;
		margin-inline: 0.25rem;
		margin-top: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.cmf-container {
		display: grid;
		grid-template-areas: 'center';
	}

	.cmf-spectrum {
		opacity: 0.25;
	}

	.cmf-container > * {
		grid-area: center;
	}
</style>
