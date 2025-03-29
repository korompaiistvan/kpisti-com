<script lang="ts">
	import arrow from './arrow.svg?raw';
	const { scrollToId }: { scrollToId: string } = $props();

	const element = $derived.by(() => {
		if (typeof document === 'undefined') return null;
		return document.querySelector(`#${scrollToId}`);
	});
	const clickHandler = () => {
		if (element === null) return;
		element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	};

	let isIntersecting = $state(false);

	$effect(() => {
		if (element === null) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				isIntersecting = true;
				return;
			}
			isIntersecting = false;
		});

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});
</script>

<button
	onclick={clickHandler}
	title="Scroll to top"
	class="scroll-to-top"
	class:hidden={isIntersecting}
	aria-hidden={!isIntersecting}
>
	{@html arrow}
</button>

<style>
	.scroll-to-top {
		opacity: 1;
		transition: all 0.5s ease-in-out;
		color: inherit;
		border-radius: 100%;
		width: 3rem;
		height: 3rem;
		font-size: 1rem;
		font-weight: 500;
		position: sticky;
		top: 1.2rem;
		right: 1.2rem;
		float: right;
		border: 3px solid currentColor;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;

		:global(svg) {
			width: 1.5rem;
			height: 1.5rem;
		}
	}

	.hidden {
		visibility: hidden;
		opacity: 0;
	}
</style>
