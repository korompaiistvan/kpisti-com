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
		line-height: 1.5;
		margin-bottom: 0.5em;
	}
</style>
