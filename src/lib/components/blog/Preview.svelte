<script lang="ts">
	import type { BlogMeta } from '$lib/types';

	const { title, thumbnail, description, url }: BlogMeta = $props();
	console.log(thumbnail);
</script>

<div class="post-preview">
	<!-- TODO improve image sizing here -->
	<!-- <div class="thumbnail-container">
		<enhanced:img src={thumbnail} aria-hidden="true" alt="" class="thumbnail" />
	</div> -->
	<p class="title">
		<a href={url}>
			{title}
		</a>
	</p>
	<p class="description">{description}</p>
</div>

<style>
	.title {
		font-size: calc(0.66 * var(--bg-grid-size));
		margin-bottom: 1em;

		> a {
			color: inherit;
		}
	}
</style>
