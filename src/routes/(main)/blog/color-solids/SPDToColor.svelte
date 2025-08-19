<script lang="ts">
	import { formatHex } from 'culori';
	import SpdChart from './SPDChart.svelte';
	import { generateRandomSPD, XYZFromSPD } from './utils/color';

	let seed = $state(123);

	const spd = $derived(generateRandomSPD(20, seed));
	const [X, Y, Z] = $derived(XYZFromSPD(spd, false));
	const hex = $derived(formatHex({ mode: 'xyz65', x: X, y: Y, z: Z }));
</script>

<!-- TODO: add the ability for the user to change the intensities themselves -->
<div class="conversion-container">
	<div class="spd-container">
		<SpdChart {spd} />
	</div>
	<span class="center-text"> becomes </span>
	<div class="swatch" style:background-color={hex}></div>
</div>
<button onclick={() => (seed = Math.random() * 100)} class="new-color-button">
	New Random Color
</button>

<style>
	.conversion-container {
		height: 120px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.spd-container {
		height: 100%;
		flex: 1;
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
		float: right;
	}
</style>
