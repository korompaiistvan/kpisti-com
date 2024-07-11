<script lang="ts">
	const maxVNoise = 2;
	const maxCenterPtNoise = 10;
	const vOffsetScale = 1;
	const width = 100;
	const height = 24;

	const halfHeight = height / 2;
	const noise = (maxNoise: number) => {
		return Math.round(maxNoise * (Math.random() - 0.5) * 2 * 100) / 100;
	};

	const markerWidth = 24;

	const clPts = [
		[0, halfHeight + noise(maxVNoise)], // start
		[width / 4 + noise(maxCenterPtNoise), halfHeight - noise(maxVNoise) * vOffsetScale], // Q Bezier control
		[width / 2 + noise(maxCenterPtNoise), halfHeight + noise(maxVNoise)], // Q Bezier end
		[width, halfHeight + noise(maxVNoise)] // Line end
	];

	const clD = [
		`M${clPts[0][0]} ${clPts[0][1]}`,
		`Q${clPts[1][0]} ${clPts[1][1]}, ${clPts[2][0]} ${clPts[2][1]}`,
		`T${clPts[3][0]} ${clPts[3][1]}`
	].join(' ');
</script>

<div class="container">
	<svg class="highlight" aria-hidden="true" {width} {height}>
		<path d={clD} class="center-line" />
	</svg>
	<div class="slot-container">
		<slot />
	</div>
</div>

<style>
	.container {
		position: relative;
		isolation: isolate;
	}

	.highlight {
		position: absolute;
	}

	.slot-container {
		position: absolute;
		opacity: 0.1;
	}

	.center-line {
		stroke: red;
		stroke-width: 2;
		stroke-dasharray: 4 4;
		fill: none;
	}
</style>
