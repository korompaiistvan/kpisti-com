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
			There are no cookies on this website because I do not actually need them. Here are a couple
			links instead
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
