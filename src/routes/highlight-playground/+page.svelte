<script lang="ts">
	import Highlight from '$lib/components/Highlight.svelte';
</script>

<main>
	<div class="center">
		<Highlight color="skyblue" text="Kiskutya">
			<span> Kiskutya </span>
		</Highlight>
	</div>
</main>

<style>
	main {
		max-width: 786px;
		margin-inline: auto;
		padding-block: 2rem;
	}

	.center {
		display: grid;
		place-items: center;
	}

	span {
		font-size: 4rem;
	}
</style>
