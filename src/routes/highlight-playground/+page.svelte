<script lang="ts">
	import Highlighter from '$lib/components/Highlighter.svelte';
	import Highlight from '$lib/components/Highlight.svelte';
</script>

<main>
	<Highlight color="skyblue" width={300} markerWidth={24} lines={1} />
	<Highlight color="orange" width={200} markerWidth={48} lines={1} />
	<div class="center">
		<p>
			<Highlighter color="skyblue" text="Kiskutya" markerWidth={48} fontSize={64}>
				<span> Kiskutya </span>
			</Highlighter>
		</p>
		<p>
			<Highlighter color="skyblue" text="Kiskutya" markerWidth={48} fontSize={64}>
				<span> KISKUTYA </span>
			</Highlighter>
		</p>

		<p>
			<Highlighter color="hotpink" text="Cuki kiscica" markerWidth={48} fontSize={64}>
				<span> Cuki kiscica </span>
			</Highlighter>
		</p>

		<p>
			<Highlighter color="yellowgreen" text="Legjobb fókabarát" markerWidth={24} fontSize={64}>
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
