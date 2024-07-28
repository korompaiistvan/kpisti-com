<script lang="ts">
	import Highlighter from '$lib/components/Highlighter.svelte';
	import Highlight from '$lib/components/Highlight.svelte';
</script>

<main>
	<Highlight color="skyblue" text="Kiskutya" />
	<div class="center">
		<p>
			<Highlighter color="skyblue" text="Kiskutya">
				<span> Kiskutya </span>
			</Highlighter>
		</p>

		<p>
			<Highlighter color="hotpink" text="Kiskutya">
				<span> Cuki kiscica </span>
			</Highlighter>
		</p>

		<p>
			<Highlighter color="yellowgreen" text="Kiskutya">
				<span> Legjobb fókabarát </span>
			</Highlighter>
		</p>
	</div>
</main>

<style>
	main {
		max-width: 786px;
		margin-inline: auto;
		padding-block: 2rem;
	}

	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	p {
		font-size: 4rem;
	}
</style>
