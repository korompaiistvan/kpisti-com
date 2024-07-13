<script lang="ts">
	import Highlight from '$lib/components/Highlight.svelte';
</script>

<main>
	<div class="center">
		<Highlight color="hotpink">
			<!-- <p contenteditable="true">Kiskutya</p> -->
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
</style>
