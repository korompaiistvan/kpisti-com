<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SolidVizScene from './SolidVizScene.svelte';

	let solidOrPoints: 'points' | 'solid' = $state('points');
	let colorSpace: 'xyz' | 'lab' | 'oklab' = $state('xyz');
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
	</select>
</div>
<div class="canvas">
	<Canvas>
		<SolidVizScene {solidOrPoints} {colorSpace} />
	</Canvas>
</div>

<style>
	.canvas {
		height: 480px;
	}
</style>
