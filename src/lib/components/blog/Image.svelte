<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	const { src, alt }: { src: Picture; alt: string } = $props();
</script>

<enhanced:img class="blog-image" {src} {alt} />

<style>
	.blog-image {
		width: 100%;
		height: auto;
	}
</style>
