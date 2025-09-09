<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SolidVizScene from '$lib/components/color-solids/SolidVizScene.svelte';
	import Title from '$lib/components/blog/Title.svelte';

	let solidOrPoints: 'points' | 'solid' = $state('solid');
	let colorSpace: 'xyz' | 'lab' | 'oklab' | 'lms' = $state('lms');
	let clampChroma: boolean = $state(false);
</script>

<Title title="Color Solids Explorer" />
<div class="controls">
	<div class="control">
		<label for="solidOrPoints"> Solid/Points </label>
		<select id="solidOrPoints" bind:value={solidOrPoints}>
			<option value="points">Points</option>
			<option value="solid">Solid</option>
		</select>
	</div>
	<div class="control">
		<label for="space">Color Space</label>
		<select id="space" bind:value={colorSpace}>
			<option value="lms">LMS</option>
			<option value="xyz">XYZ</option>
			<option value="lab">LAB</option>
			<option value="oklab">okLAB</option>
			<option value="lrgb">lRGB</option>
			<option value="srgb">sRGB</option>
		</select>
	</div>
	<div class="control">
		<label for="clamp"> Clamp Chroma? </label>
		<input id="clamp" type="checkbox" bind:checked={clampChroma} />
	</div>
</div>
<div class="canvas">
	<Canvas>
		<SolidVizScene {solidOrPoints} {colorSpace} gamut={clampChroma ? 'srgb' : 'visible-colors'} />
	</Canvas>
</div>

<style>
	.canvas {
		height: 60dvh;

		overflow: hidden;
		border-radius: 8px;
	}

	.controls {
		display: flex;
		column-gap: var(--bg-grid-size);
		row-gap: calc(0.5 * var(--bg-grid-size));
		margin-bottom: calc(0.5 * var(--bg-grid-size));
		flex-wrap: wrap;
	}

	.control {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
