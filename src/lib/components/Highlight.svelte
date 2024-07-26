<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		generateHighlightPolygon,
		generateSplodgeDraw,
		noise,
		cornerRadius,
		calculateAspectRatio,
		generateFullSvg
	} from '$lib/highlight-generation';

	let {
		color = 'yellowgreen',
		text,
		children
	}: { color: string; text?: string; children?: Snippet } = $props();
	const aspectRatio = calculateAspectRatio(text ?? '');

	const hlPolygon = generateHighlightPolygon(aspectRatio);
	const splodge = generateSplodgeDraw();
</script>

<div class="container">
	<!-- <svg
		class="highlight"
		aria-hidden="true"
		width={hlPolygon.width}
		height={hlPolygon.height}
		style:color
	>
		<defs>
			<linearGradient id="highlight-gradient">
				<stop stop-color="currentColor" offset="0%" />
				<stop stop-color="currentColor" stop-opacity="66%" offset={`${50 + noise(20) - 10}%`} />
				<stop stop-color="currentColor" offset="100%" />
			</linearGradient>
		</defs>
		<filter id="blur">
			<feGaussianBlur stdDeviation="1" />
		</filter>
		<g class="debug">
			<path d={hlPolygon.centerLine} class="line line--center" />
			<path d={hlPolygon.topLine} class="line line--top" />
			<path d={hlPolygon.bottomLine} class="line line--bottom" />
		</g>
		<g class="highlight-group">
			<path d={hlPolygon.fullPolygon} class="highlight-polygon" />
			<path
				d={splodge}
				class="splodge"
				transform={`translate(${hlPolygon.points[0][0] - cornerRadius}, ${hlPolygon.points[0][1]}) rotate(${(hlPolygon.normalAngles[0] / 2 / Math.PI) * 360 - 90} ${cornerRadius} 0)`}
			/>
			<path
				d={splodge}
				class="splodge"
				transform={`translate(${hlPolygon.points[4][0] - cornerRadius}, ${hlPolygon.points[4][1]}) rotate(${(hlPolygon.normalAngles[4] / 2 / Math.PI) * 360 - 90} ${cornerRadius} 0)`}
			/>
		</g>
	</svg> -->
	<!-- {@html generateFullSvg(aspectRatio, 'hotpink')} -->
	<span
		class="slot-container"
		style="background-image: url(/highlight-img?text=kiskutya&color={color})"
	>
		{#if children}
			{@render children()}
		{/if}
	</span>
</div>

<style>
	.container {
		position: relative;
		isolation: isolate;
	}

	.highlight {
		position: absolute;
		left: -200px;
	}

	.slot-container {
		position: absolute;
		background-size: 100% 100%;
		padding: 0.25em 0.5em;
	}

	.line {
		stroke-width: 2;
		stroke-dasharray: 4 4;
		fill: none;
	}

	g.debug {
		display: none;
	}

	.line--center {
		stroke: red;
	}

	.line--top {
		stroke: green;
	}

	.line--bottom {
		stroke: blue;
	}

	.highlight-polygon {
		fill: url(#highlight-gradient);
		opacity: 0.5;
	}

	.splodge {
		fill: currentColor;
		opacity: 0.15;
	}

	g.highlight-group {
		filter: url(#blur);
	}
</style>
