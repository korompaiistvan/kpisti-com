<script lang="ts">
	const { title }: { title: string } = $props();
</script>

<h1 class="blog-title">
	{title}
</h1>

<style>
	.blog-title {
		font-size: xx-large;
		font-weight: 500;
		line-height: calc(2 * var(--bg-grid-size));
		margin-bottom: calc(2 * var(--bg-grid-size));
	}
</style>
