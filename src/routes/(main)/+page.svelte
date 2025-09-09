<script lang="ts">
	import { COLORS } from '$lib/color-palette';
	import Highlighter from '$lib/components/Highlighter.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import WorkSection from '$lib/components/WorkSection.svelte';
	import BlogSection from '$lib/components/BlogSection.svelte';
	import ReadingWidthConstraint from '$lib/components/ReadingWidthConstraint.svelte';

	import hmdObjMeta from './work/handmade-data-object/meta';
	import baliPostCardMeta from './work/bali-postcard/meta';
	import dispFlwrsMeta from './work/disparity-flowers/meta';
	import clrSldMeta from './blog/color-solids/meta';
	import a11yMeta from './blog/a11y-blog-posts/meta';
</script>

<Meta
	title="István Korompai"
	description="I'm a data vis developer based in Vienna and this is my personal website"
/>
<ReadingWidthConstraint>
	<div class="intro">
		<h1>
			I'm a
			<Highlighter
				color={COLORS.blue}
				text="data vis engineer"
				markerWidth={24}
				fontSize={40}
				lines={2}
			>
				data vis engineer
			</Highlighter> based in Vienna.
		</h1>
		<p class="intro--notes">
			Follow me on my socials, drop me an e-mail to say hi or simply check out the work I do below
		</p>
	</div>

	<WorkSection posts={[hmdObjMeta, baliPostCardMeta, dispFlwrsMeta]} />

	<BlogSection posts={[clrSldMeta, a11yMeta]} />
</ReadingWidthConstraint>

<style>
	.intro {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--bg-grid-size);
		padding-block: 2rem;
	}

	.intro--notes {
		font-size: 1.25rem;
		line-height: 2rem;
		margin-bottom: calc(2 * var(--bg-grid-size));
	}

	h1 {
		font-size: 2rem;
		line-height: 2em;
	}
</style>
