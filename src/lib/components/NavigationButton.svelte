<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, href }: { children: Snippet; href: string } = $props();
</script>

<a {href} class="nav-button">
	{@render children()}
</a>

<style>
	.nav-button {
		display: inline-block;
		border: 2px solid currentColor;
		padding: 0.25em 0.5em;
		border-radius: 6px;
		text-decoration: none;
	}
</style>
