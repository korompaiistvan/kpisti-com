<script lang="ts">
	import { COLORS } from '$lib/color-palette';
	import Preview from '$lib/components/blog/Preview.svelte';
	import Highlighter from '$lib/components/Highlighter.svelte';
	import Meta from '$lib/components/Meta.svelte';

	import hmdObjMeta from './blog/handmade-data-object/meta';
</script>

<Meta
	title="István Korompai"
	description="I'm a data vis developer based in Vienna and this is my personal website"
/>
<div class="intro">
	<h1>
		I'm a
		<Highlighter
			color={COLORS.blue}
			text="data viz developer"
			markerWidth={24}
			fontSize={40}
			lines={2}
		>
			data vis developer
		</Highlighter> based in Vienna.
	</h1>
	<p class="intro--notes">
		Follow me on BlueSky, drop me an e-mail to say hi or simply check out the awesome handmade
		dataviz I made with Julcsi & Tomi.
	</p>
</div>

<h2 id="made-header">
	stuff I <Highlighter color={COLORS.pink} text="made" markerWidth={24} fontSize={32} lines={1}
		>made</Highlighter
	>
</h2>
<Preview {...hmdObjMeta} />

<h2 id="wrote-header">
	things I <Highlighter color={COLORS.blue} text="wrote" markerWidth={24} lines={1} fontSize={32}>
		wrote
	</Highlighter>
</h2>

<style>
	.intro {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
		padding-block: 2rem;
	}

	.intro--notes {
		font-size: 1.25rem;
		line-height: 2rem;
	}

	h1 {
		font-size: 2rem;
		line-height: 2em;
	}

	h2 {
		font-size: 2rem;
		line-height: 1;
		margin-block: 1em;
		text-transform: lowercase;
	}
</style>
