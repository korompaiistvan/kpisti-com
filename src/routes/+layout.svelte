<script lang="ts">
	import '../reset.css';
	import '../global.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200..900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@200..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<slot />
</main>

<style>
	main {
		min-height: 100dvh;
	}
</style>
