<script lang="ts">
	import '../reset.css';
	import '../global.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<!-- TODO check which weights are actually needed here and remove the rest -->
	<!-- TODO download fonts and include in source for more privacy -->
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<nav>
		<a class="name-home-link" href="/">István Korompai </a>
		<div class="secondary-links">
			<a href="/">Home</a>
			<a href="/work">Work</a>
			<a href="/blog">Blog</a>
			<a href="/about">About</a>
			<a href="/contact">Contact</a>
		</div>
	</nav>
	<main>
		<slot />
	</main>
	<footer>
		<p>
			There are no cookies on this website because I value your privacy. Here are a couple links
			instead
		</p>
	</footer>
</div>

<style>
	.container {
		padding: 0.5rem;
		margin: 0 auto;
		display: flex;
		min-height: 100dvh;
		flex-direction: column;
	}

	main {
		flex-grow: 1;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav a {
		font-family: 'DM Mono', monospace;
		font-size: 1.25rem;
		text-decoration: none;
		text-transform: uppercase;
		color: unset;
		padding: 0.25rem 0.5rem;
	}

	nav a:hover {
		text-decoration: underline;
		background-color: skyblue;
	}

	.secondary-links {
		display: flex;
		gap: 1rem;
	}

	footer {
		margin-top: auto;
	}

	@media (min-width: 640px) {
		.container {
			max-width: 640px;
		}
	}

	@media (min-width: 768px) {
		.container {
			max-width: 768px;
		}
	}

	@media (min-width: 1024px) {
		.container {
			max-width: 1024px;
		}
	}

	@media (min-width: 1280px) {
		.container {
			max-width: 1280px;
		}
	}

	@media (min-width: 1536px) {
		.container {
			max-width: 1536px;
		}
	}
</style>
