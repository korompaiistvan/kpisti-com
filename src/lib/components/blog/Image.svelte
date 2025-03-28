<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	const { src, alt }: { src: Picture; alt: string } = $props();
</script>

<div class="img-wrapper">
	<enhanced:img class="blog-image" {src} {alt} />
</div>

<style>
	.blog-image {
		width: 100%;
		height: auto;
		margin-block: var(--bg-grid-size);
	}
</style>
