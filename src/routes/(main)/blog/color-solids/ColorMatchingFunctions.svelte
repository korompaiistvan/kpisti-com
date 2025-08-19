<script>
	import { VISIBLE_RANGE_LENGTH, visibleSpectrumXYZ } from './utils/color';
	import { scaleLinear } from 'd3-scale';
	import { line } from 'd3-shape';
	let height = $state(0);
	let width = $state(0);
	const padding = [4, 4, 4, 4];

	const spectrumXYZ = visibleSpectrumXYZ();

	const maxXYZ = Math.max(...spectrumXYZ.map((components) => Math.max(...components)));
	console.log(maxXYZ);

	const xScale = $derived(
		scaleLinear()
			.domain([0, VISIBLE_RANGE_LENGTH])
			.range([0 + padding[3], width - padding[1]])
	);
	const yScale = $derived(
		scaleLinear()
			.domain([0, maxXYZ])
			.range([height - padding[2], 0 + padding[0]])
	);

	const lineGenerator = line()
		.x((d) => xScale(d[0]))
		.y((d) => yScale(d[1]));
	const XPath = $derived(lineGenerator(spectrumXYZ.map(([x, y, z], idx) => [idx, x])));
	const YPath = $derived(lineGenerator(spectrumXYZ.map(([x, y, z], idx) => [idx, y])));
	const ZPath = $derived(lineGenerator(spectrumXYZ.map(([x, y, z], idx) => [idx, z])));
</script>

<svg height="80px" width="100%" bind:clientHeight={height} bind:clientWidth={width}>
	<path d={XPath} class="cmf" stroke="#DF2935" />
	<path d={YPath} class="cmf" stroke="#7BC950" />
	<path d={ZPath} class="cmf" stroke="#3772FF" />
</svg>

<style>
	.cmf {
		fill: none;
		stroke-width: 2;
	}
</style>
