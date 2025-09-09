<script lang="ts">
	import { formatHex } from 'culori';
	import SpdChart from './SPDChart.svelte';
	import { convertXyz65ToLms, generateRandomSPD, XYZFromSPD } from '$lib/color-theory/color';

	const resolution = 30;
	const maxBubbleSize = 48;
	let spd = $state(generateRandomSPD(resolution, 123));

	const [X, Y, Z] = $derived(XYZFromSPD(spd, false));
	const hex = $derived(formatHex({ mode: 'xyz65', x: X, y: Y, z: Z }));
	const { l, m, s } = $derived(convertXyz65ToLms({ x: X, y: Y, z: Z }));

	function sliderChangeHandler(value: number, idx: number) {
		spd[idx] = value;
		spd = new Uint8Array(spd);
	}
</script>

<button
	onclick={() => (spd = generateRandomSPD(resolution, Math.random() * 100))}
	class="new-color-button"
>
	New Random Color
</button>
<div class="conversion-container">
	<div class="spd-container">
		<div class="spd">
			<SpdChart {spd} />
		</div>
		<div class="sliders">
			{#each spd as value, idx}
				<input
					type="range"
					class="spd-control"
					min="0"
					max="255"
					step="8"
					value={255 - value}
					oninput={(event) =>
						sliderChangeHandler((255 - +(event.target as HTMLInputElement).value) as number, idx)}
				/>
			{/each}
		</div>
	</div>
	<span class="center-text"> activates </span>
	<div class="activations">
		{#each [s, m, l] as component, idx}
			<div class="activation">
				<div
					class="activation-dot"
					style:background-color={['#026ad3', '#0ace33', '#fa0b3e'][idx]}
					style:--size={`${component * maxBubbleSize}px`}
				></div>
				<span class="label">{Math.round(component * 100 * 10) / 10}%</span>
			</div>
		{/each}
	</div>
	<span class="center-text"> becomes </span>
	<div class="swatch" style:background-color={hex}></div>
</div>

<style>
	.conversion-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		grid-area: center;
		margin-bottom: var(--bg-grid-size);
	}

	.sliders {
		display: flex;
		justify-content: space-between;
		grid-area: center;
		margin-inline: -12px;
	}

	.spd-container {
		width: 100%;
		display: grid;
		grid-template-areas: 'center';
	}

	.spd-container > * {
		grid-area: center;
	}

	.swatch {
		height: 80px;
		width: 80px;
		border-radius: 8px;
	}

	.center-text {
		font-size: small;
	}

	.new-color-button {
		border: 2px solid currentColor;
		border-radius: 4px;
		margin-top: 1rem;
		padding: 0.125rem 0.25rem;
		display: block;
		margin-left: auto;
		font-size: small;
	}

	.spd-control {
		-webkit-appearance: none;
		appearance: none;

		writing-mode: vertical-rl;
		width: 24px;
		margin: 0;
		margin-inline: -6px;
		background-color: transparent;

		cursor: pointer;
	}

	.spd-control::-webkit-slider-runnable-track {
		opacity: 1;
	}

	.spd-control::-moz-range-track {
		opacity: 1;
	}

	.spd-control::-moz-range-thumb {
		opacity: 1;
		height: 8px;
		width: 8px;
		border-radius: 50%;
		background-color: #fff;
		border: 1px solid #0c0c0c;
	}

	.spd-control::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;

		opacity: 1;
		height: 12px;
		width: 12px;
		border-radius: 50%;
		background-color: #fff;
		border: 2px solid #0c0c0c;
	}

	.activations {
		display: flex;
		width: 100%;
		justify-content: space-around;
		min-height: 48px;
	}

	.activation > .label {
		font-size: small;
	}

	.activation {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.activation-dot {
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
	}
</style>
