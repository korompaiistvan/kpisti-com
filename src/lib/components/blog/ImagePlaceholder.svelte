<script lang="ts">
	const { text }: { text: string } = $props();
</script>

<div class="img-placeholder">
	<div class="text">
		<p class="title">Image Placeholder</p>
		<p>
			{text}
		</p>
	</div>
</div>

<style>
	.img-placeholder {
		border: 2px solid hotpink;
		border-radius: 0.5rem;
		display: grid;
		aspect-ratio: 4/3;
		place-content: center;
		color: hotpink;
		background-color: rgba(255, 105, 180, 0.1);
		text-align: center;
		margin-block: var(--bg-grid-size);
	}

	.title {
		font-weight: 500;
	}
</style>
