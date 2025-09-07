<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SolidVizScene from './SolidVizScene.svelte';

	let solidOrPoints: 'points' | 'solid' = $state('points');
	let colorSpace: 'xyz' | 'lab' | 'oklab' | 'lms' = $state('lms');
	let clampChroma: boolean = $state(false);
</script>

<div class="controls">
	<select bind:value={solidOrPoints}>
		<option value="points">Points</option>
		<option value="solid">Solid</option>
	</select>
	<select bind:value={colorSpace}>
		<option value="xyz">XYZ</option>
		<option value="lab">LAB</option>
		<option value="oklab">okLAB</option>
		<option value="lms">LMS</option>
	</select>
	<label>
		<input type="checkbox" bind:checked={clampChroma} />
		Clamp Chroma?
	</label>
</div>
<div class="canvas">
	<Canvas>
		<SolidVizScene {solidOrPoints} {colorSpace} gamut={clampChroma ? 'srgb' : 'visible-colors'} />
	</Canvas>
</div>

<style>
	.canvas {
		height: 480px;
	}
</style>
