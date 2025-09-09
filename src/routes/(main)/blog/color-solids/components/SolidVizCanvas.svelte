<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SolidVizScene from '$lib/components/color-solids/SolidVizScene.svelte';
</script>

<div class="canvas">
	<Canvas>
		<SolidVizScene solidOrPoints="points" colorSpace="lms" gamut="visible-colors" />
	</Canvas>
</div>

<style>
	.canvas {
		height: 480px;
		overflow: hidden;
		border-radius: 8px;
	}
</style>
