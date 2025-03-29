<script lang="ts">
	import { COLORS } from '$lib/color-palette';
	import Highlighter from '$lib/components/Highlighter.svelte';
</script>

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
			data viz developer
		</Highlighter> based in Vienna.
	</h1>
	<p class="intro--notes">
		Follow me on Twitter, or LinkedIn or simply check out the awesome handmade dataviz I made with
		Julcsi & Tomi or drop my an e-mail to say hi.
	</p>
</div>

<h2 id="wrote-header">
	Things I <Highlighter color={COLORS.blue} text="wrote" markerWidth={24} lines={1} fontSize={32}>
		wrote
	</Highlighter>
</h2>

<h2 id="made-header">
	Stuff I <Highlighter color={COLORS.pink} text="made" markerWidth={24} fontSize={32} lines={1}
		>made</Highlighter
	>
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
		margin-bottom: 1em;
		text-transform: lowercase;
	}
</style>
