<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { converter, formatHex } from 'culori';
	import { type SPD, VISIBLE_RANGE_LENGTH, visibleSpectrumXYZ } from './utils/color';

	const defaultSPD = new Uint8Array(VISIBLE_RANGE_LENGTH).fill(255);
	const { spd = defaultSPD }: { spd?: SPD } = $props();
	const visibleSpectrum = visibleSpectrumXYZ();

	let height = $state(0);
	const heightScale = $derived(scaleLinear().domain([0, 255]).range([0, height]));
	const idxScale = $derived(
		scaleLinear()
			.domain([0, visibleSpectrum.length - 1])
			.range([0, spd.length - 1])
	);

	const rgbConverter = converter('rgb');
	const spectrumColorRamp = visibleSpectrum
		.map((xyz) => rgbConverter({ mode: 'xyz65', x: xyz[0], y: xyz[1], z: xyz[2] }))
		.map((c) => formatHex(c));
</script>

<div class="spd" bind:clientHeight={height}>
	{#each spectrumColorRamp as color, idx}
		<div
			class="color"
			style:--color={color}
			style:height={`${heightScale(spd[Math.round(idxScale(idx))])}px`}
		></div>
	{/each}
</div>

<style>
	.spd {
		display: flex;
		height: 100%;
		align-items: end;
	}

	.color {
		background-color: var(--color);
		flex: 1;
	}
</style>
