<script lang="ts">
	import Highlight from '$lib/components/Highlight.svelte';
</script>

<main>
	<div class="center">
		<p>
			<Highlight color="skyblue" text="Kiskutya">
				<span> Kiskutya </span>
			</Highlight>
		</p>

		<p>
			<Highlight color="hotpink" text="Kiskutya">
				<span> Cuki kiscica </span>
			</Highlight>
		</p>

		<p>
			<Highlight color="yellowgreen" text="Kiskutya">
				<span> Legjobb fókabarát </span>
			</Highlight>
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

	span {
		font-size: 4rem;
	}
</style>
