<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SolidVizScene from './SolidVizScene.svelte';
</script>

<div class="canvas">
	<Canvas>
		<SolidVizScene />
	</Canvas>
</div>

<style>
	.canvas {
		height: 320px;
	}
</style>
